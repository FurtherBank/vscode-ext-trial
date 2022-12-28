import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.compact.css';
import JsonSchemaEditor from 'json-schemaeditor-antd';
import { useInterval, useThrottleEffect, useThrottleFn } from 'ahooks';
import { Alert, Button, PageHeader } from 'antd';
import { VscodeManager } from './vscode/vscodeManager';
import { FileSyncOutlined } from '@ant-design/icons';

interface AppProps {
  initialJson?: any;
}

export interface EditorMessage {
  msgType: string,
  content: any
}

function App(props: AppProps) {
  const initialState = useMemo(() => {
    let state = VscodeManager.vscode.getState();
    if (state === undefined && props.initialJson !== undefined) {
      console.log('使用 initialJson:', props.initialJson);
      
      state = {
        data: props.initialJson,
      };
    }
    return Object.assign(
      {
        data: null,
        schema: {},
      },
      state
    );
  }, []);

  const dataStringRef = useRef(JSON.stringify(initialState.data));
  const [dataJson, setDataJson] = useState<any>(initialState.data);
  const [schema, setSchema] = useState(initialState.schema);
  const [jsonChanged, setJsonChanged] = useState(false);
  const [isError, setIsError] = useState(false);

  // 如果用 ref 包住 datastring，可以避免来回挂载
  useEffect(() => {
    const handler = (e: MessageEvent<EditorMessage>) => {
      const { content, msgType } = e.data;
      const state = VscodeManager.vscode.getState();
      switch (msgType) {
        case 'data':
          if (content !== dataStringRef.current) {
            dataStringRef.current = content;
            setJsonChanged(false);
            console.log('检测到外部 json 变化，重新解析……');
            try {
              const json = JSON.parse(content);
              setDataJson(json);
              setIsError(false);
              VscodeManager.vscode.setState({
                schema: state.schema,
                data: json,
              });
            } catch (error) {
              setDataJson(null);
              setIsError(true);
              VscodeManager.vscode.setState({
                schema: state.schema,
                data: null,
              });
            }
          }

          break;
        case 'schema':
          // 不需要做检验
          setSchema(content);
          VscodeManager.vscode.setState({
            schema: schema,
            data: state.data,
          });
          break;
        default:
          break;
      }
    };
    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    };
  });

  const handleChange = useCallback(
    (value: any) => {
      console.log('来自于 editor 的变化');

      setDataJson(value);
      setJsonChanged(true);
    },
    [setDataJson]
  );

  // 0.6s 一次向上同步
  useInterval(() => {
    if (jsonChanged) {
      const newString = JSON.stringify(dataJson, null, 2);

      dataStringRef.current = newString;
      setJsonChanged(false);

      VscodeManager.vscode.postMessage(newString);

      console.log('已同步变化', new Date(), newString);
    }
  }, 600);

  const syncSchemaHandler = useCallback(() => {
    VscodeManager.vscode.postMessage({
      msgType: 'sync',
    });
  }, []);

  return (
    <div>
      <PageHeader
        title="JSON Editor"
        className="site-page-header"
        subTitle="By FurtherBank"
        extra={[
          <Button key="1" type="primary" icon={<FileSyncOutlined />} onClick={syncSchemaHandler}>
            同步 schema
          </Button>,
        ]}
      ></PageHeader>
      {isError ? <Alert message={'文件无法解析为 json，请通过默认编辑器修改后再试。'} /> : null}
      <JsonSchemaEditor data={dataJson} schema={schema} onChange={handleChange} />
    </div>
  );
}

export default App;
