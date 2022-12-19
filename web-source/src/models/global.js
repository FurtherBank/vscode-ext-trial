"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 全局共享数据示例
const constants_1 = require("@/constants");
const react_1 = require("react");
const useUser = () => {
    const [name, setName] = (0, react_1.useState)(constants_1.DEFAULT_NAME);
    return {
        name,
        setName,
    };
};
exports.default = useUser;
//# sourceMappingURL=global.js.map