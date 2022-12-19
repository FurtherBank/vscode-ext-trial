"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const demo_1 = require("@/services/demo");
const pro_components_1 = require("@ant-design/pro-components");
const antd_1 = require("antd");
const react_1 = require("react");
const CreateForm_1 = require("./components/CreateForm");
const UpdateForm_1 = require("./components/UpdateForm");
const { addUser, queryUserList, deleteUser, modifyUser } = demo_1.default.UserController;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields) => {
    const hide = antd_1.message.loading('正在添加');
    try {
        await addUser({ ...fields });
        hide();
        antd_1.message.success('添加成功');
        return true;
    }
    catch (error) {
        hide();
        antd_1.message.error('添加失败请重试！');
        return false;
    }
};
/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields) => {
    const hide = antd_1.message.loading('正在配置');
    try {
        await modifyUser({
            userId: fields.id || '',
        }, {
            name: fields.name || '',
            nickName: fields.nickName || '',
            email: fields.email || '',
        });
        hide();
        antd_1.message.success('配置成功');
        return true;
    }
    catch (error) {
        hide();
        antd_1.message.error('配置失败请重试！');
        return false;
    }
};
/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
    const hide = antd_1.message.loading('正在删除');
    if (!selectedRows)
        return true;
    try {
        await deleteUser({
            userId: selectedRows.find((row) => row.id)?.id || '',
        });
        hide();
        antd_1.message.success('删除成功，即将刷新');
        return true;
    }
    catch (error) {
        hide();
        antd_1.message.error('删除失败，请重试');
        return false;
    }
};
const TableList = () => {
    const [createModalVisible, handleModalVisible] = (0, react_1.useState)(false);
    const [updateModalVisible, handleUpdateModalVisible] = (0, react_1.useState)(false);
    const [stepFormValues, setStepFormValues] = (0, react_1.useState)({});
    const actionRef = (0, react_1.useRef)();
    const [row, setRow] = (0, react_1.useState)();
    const [selectedRowsState, setSelectedRows] = (0, react_1.useState)([]);
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            tip: '名称是唯一的 key',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '名称为必填项',
                    },
                ],
            },
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            valueType: 'text',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            hideInForm: true,
            valueEnum: {
                0: { text: '男', status: 'MALE' },
                1: { text: '女', status: 'FEMALE' },
            },
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (<>
          <a onClick={() => {
                    handleUpdateModalVisible(true);
                    setStepFormValues(record);
                }}>
            配置
          </a>
          <antd_1.Divider type="vertical"/>
          <a href="">订阅警报</a>
        </>),
        },
    ];
    return (<pro_components_1.PageContainer header={{
            title: 'CRUD 示例',
        }}>
      <pro_components_1.ProTable headerTitle="查询表格" actionRef={actionRef} rowKey="id" search={{
            labelWidth: 120,
        }} toolBarRender={() => [
            <antd_1.Button key="1" type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </antd_1.Button>,
        ]} request={async (params, sorter, filter) => {
            const { data, success } = await queryUserList({
                ...params,
                // FIXME: remove @ts-ignore
                // @ts-ignore
                sorter,
                filter,
            });
            return {
                data: data?.list || [],
                success,
            };
        }} columns={columns} rowSelection={{
            onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}/>
      {selectedRowsState?.length > 0 && (<pro_components_1.FooterToolbar extra={<div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项&nbsp;&nbsp;
            </div>}>
          <antd_1.Button onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
            }}>
            批量删除
          </antd_1.Button>
          <antd_1.Button type="primary">批量审批</antd_1.Button>
        </pro_components_1.FooterToolbar>)}
      <CreateForm_1.default onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <pro_components_1.ProTable onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
                handleModalVisible(false);
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            }
        }} rowKey="id" type="form" columns={columns}/>
      </CreateForm_1.default>
      {stepFormValues && Object.keys(stepFormValues).length ? (<UpdateForm_1.default onSubmit={async (value) => {
                const success = await handleUpdate(value);
                if (success) {
                    handleUpdateModalVisible(false);
                    setStepFormValues({});
                    if (actionRef.current) {
                        actionRef.current.reload();
                    }
                }
            }} onCancel={() => {
                handleUpdateModalVisible(false);
                setStepFormValues({});
            }} updateModalVisible={updateModalVisible} values={stepFormValues}/>) : null}

      <antd_1.Drawer width={600} visible={!!row} onClose={() => {
            setRow(undefined);
        }} closable={false}>
        {row?.name && (<pro_components_1.ProDescriptions column={2} title={row?.name} request={async () => ({
                data: row || {},
            })} params={{
                id: row?.name,
            }} columns={columns}/>)}
      </antd_1.Drawer>
    </pro_components_1.PageContainer>);
};
exports.default = TableList;
//# sourceMappingURL=index.js.map