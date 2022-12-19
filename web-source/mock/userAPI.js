"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
    { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];
exports.default = {
    'GET /api/v1/queryUserList': (req, res) => {
        res.json({
            success: true,
            data: { list: users },
            errorCode: 0,
        });
    },
    'PUT /api/v1/user/': (req, res) => {
        res.json({
            success: true,
            errorCode: 0,
        });
    },
};
//# sourceMappingURL=userAPI.js.map