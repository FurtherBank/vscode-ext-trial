import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { EditorMessage } from './App';
import reportWebVitals from './reportWebVitals';
import { VscodeManager } from './vscode/vscodeManager';

VscodeManager.init();

function listener(event: MessageEvent<EditorMessage>) {
  // 通过处理机制来处理
  const { data } = event
  let initialJson: any = null
  console.log(`收到激活信息：`, event);
  if (typeof event === 'object') {
    const { msgType, content } = data
    if (msgType === 'data') {
      try {
        const json = JSON.parse(content);
        initialJson = json
      } catch (error) {
        
      }
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <React.StrictMode>
      <App initialJson={initialJson}/>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

  window.removeEventListener('message', listener);
}

// 等监听到 data 信息再挂载组件，只执行一次
window.addEventListener('message', listener);
