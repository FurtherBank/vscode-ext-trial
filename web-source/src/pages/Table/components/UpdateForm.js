"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pro_components_1 = require("@ant-design/pro-components");
const antd_1 = require("antd");
const react_1 = require("react");
const UpdateForm = (props) => (<pro_components_1.StepsForm stepsProps={{
        size: 'small',
    }} stepsFormRender={(dom, submitter) => {
        return (<antd_1.Modal width={640} bodyStyle={{ padding: '32px 40px 48px' }} destroyOnClose title="规则配置" visible={props.updateModalVisible} footer={submitter} onCancel={() => props.onCancel()}>
          {dom}
        </antd_1.Modal>);
    }} onFinish={props.onSubmit}>
    <pro_components_1.StepsForm.StepForm initialValues={{
        name: props.values.name,
        nickName: props.values.nickName,
    }} title="基本信息">
      <pro_components_1.ProFormText width="md" name="name" label="规则名称" rules={[{ required: true, message: '请输入规则名称！' }]}/>
      <pro_components_1.ProFormTextArea name="desc" width="md" label="规则描述" placeholder="请输入至少五个字符" rules={[
        { required: true, message: '请输入至少五个字符的规则描述！', min: 5 },
    ]}/>
    </pro_components_1.StepsForm.StepForm>
    <pro_components_1.StepsForm.StepForm initialValues={{
        target: '0',
        template: '0',
    }} title="配置规则属性">
      <pro_components_1.ProFormSelect width="md" name="target" label="监控对象" valueEnum={{
        0: '表一',
        1: '表二',
    }}/>
      <pro_components_1.ProFormSelect width="md" name="template" label="规则模板" valueEnum={{
        0: '规则模板一',
        1: '规则模板二',
    }}/>
      <pro_components_1.ProFormRadio.Group name="type" width="md" label="规则类型" options={[
        {
            value: '0',
            label: '强',
        },
        {
            value: '1',
            label: '弱',
        },
    ]}/>
    </pro_components_1.StepsForm.StepForm>
    <pro_components_1.StepsForm.StepForm initialValues={{
        type: '1',
        frequency: 'month',
    }} title="设定调度周期">
      <pro_components_1.ProFormDateTimePicker name="time" label="开始时间" rules={[{ required: true, message: '请选择开始时间！' }]}/>
      <pro_components_1.ProFormSelect name="frequency" label="监控对象" width="xs" valueEnum={{
        month: '月',
        week: '周',
    }}/>
    </pro_components_1.StepsForm.StepForm>
  </pro_components_1.StepsForm>);
exports.default = UpdateForm;
//# sourceMappingURL=UpdateForm.js.map