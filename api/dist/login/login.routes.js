"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const findUser_1 = __importDefault(require("../mongodb/findUser"));
const restless_1 = require("@restless/restless");
const route = express_1.Router();
route.post('/login', restless_1.asyncHandler(restless_1.sanitize({
    body: restless_1.asObject({
        username: restless_1.asString,
        password: restless_1.asString
    })
}), (data) => {
    const { username, password } = data.body;
    console.warn(username, password);
    const user = findUser_1.default('users', 'example')
        .then(user => user)
        .catch(err => console.warn(err));
    return restless_1.responseOf(user);
}));
exports.default = route;
//# sourceMappingURL=login.routes.js.map