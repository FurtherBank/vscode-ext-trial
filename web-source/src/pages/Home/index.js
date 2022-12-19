"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Guide_1 = require("@/components/Guide");
const format_1 = require("@/utils/format");
const pro_components_1 = require("@ant-design/pro-components");
const max_1 = require("@umijs/max");
const index_less_1 = require("./index.less");
const HomePage = () => {
    const { name } = (0, max_1.useModel)('global');
    return (<pro_components_1.PageContainer ghost>
      <div className={index_less_1.default.container}>
        <Guide_1.default name={(0, format_1.trim)(name)}/>
      </div>
    </pro_components_1.PageContainer>);
};
exports.default = HomePage;
//# sourceMappingURL=index.js.map