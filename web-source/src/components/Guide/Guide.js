"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = require("react");
const Guide_less_1 = require("./Guide.less");
// 脚手架示例组件
const Guide = (props) => {
    const { name } = props;
    return (<antd_1.Layout>
      <antd_1.Row>
        <antd_1.Typography.Title level={3} className={Guide_less_1.default.title}>
          欢迎使用 <strong>{name}</strong> ！
        </antd_1.Typography.Title>
      </antd_1.Row>
    </antd_1.Layout>);
};
exports.default = Guide;
//# sourceMappingURL=Guide.js.map