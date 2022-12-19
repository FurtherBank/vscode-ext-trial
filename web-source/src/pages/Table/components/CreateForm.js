"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = require("react");
const CreateForm = (props) => {
    const { modalVisible, onCancel } = props;
    return (<antd_1.Modal destroyOnClose title="新建" width={420} visible={modalVisible} onCancel={() => onCancel()} footer={null}>
      {props.children}
    </antd_1.Modal>);
};
exports.default = CreateForm;
//# sourceMappingURL=CreateForm.js.map