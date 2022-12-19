"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pro_components_1 = require("@ant-design/pro-components");
const max_1 = require("@umijs/max");
const antd_1 = require("antd");
const AccessPage = () => {
    const access = (0, max_1.useAccess)();
    return (<pro_components_1.PageContainer ghost header={{
            title: '权限示例',
        }}>
      <max_1.Access accessible={access.canSeeAdmin}>
        <antd_1.Button>只有 Admin 可以看到这个按钮</antd_1.Button>
      </max_1.Access>
    </pro_components_1.PageContainer>);
};
exports.default = AccessPage;
//# sourceMappingURL=index.js.map