"use strict";
// 运行时配置
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = exports.getInitialState = void 0;
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
async function getInitialState() {
    return { name: '@umijs/max' };
}
exports.getInitialState = getInitialState;
const layout = () => {
    return {
        logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
        menu: {
            locale: false,
        },
    };
};
exports.layout = layout;
//# sourceMappingURL=app.js.map