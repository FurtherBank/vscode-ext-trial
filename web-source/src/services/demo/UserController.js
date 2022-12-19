"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.modifyUser = exports.getUserDetail = exports.addUser = exports.queryUserList = void 0;
/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
const max_1 = require("@umijs/max");
/** 此处后端没有提供注释 GET /api/v1/queryUserList */
async function queryUserList(params, options) {
    return (0, max_1.request)('/api/v1/queryUserList', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
exports.queryUserList = queryUserList;
/** 此处后端没有提供注释 POST /api/v1/user */
async function addUser(body, options) {
    return (0, max_1.request)('/api/v1/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}
exports.addUser = addUser;
/** 此处后端没有提供注释 GET /api/v1/user/${param0} */
async function getUserDetail(params, options) {
    const { userId: param0 } = params;
    return (0, max_1.request)(`/api/v1/user/${param0}`, {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
}
exports.getUserDetail = getUserDetail;
/** 此处后端没有提供注释 PUT /api/v1/user/${param0} */
async function modifyUser(params, body, options) {
    const { userId: param0 } = params;
    return (0, max_1.request)(`/api/v1/user/${param0}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        params: { ...params },
        data: body,
        ...(options || {}),
    });
}
exports.modifyUser = modifyUser;
/** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
async function deleteUser(params, options) {
    const { userId: param0 } = params;
    return (0, max_1.request)(`/api/v1/user/${param0}`, {
        method: 'DELETE',
        params: { ...params },
        ...(options || {}),
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=UserController.js.map