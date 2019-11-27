"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("./connect"));
const findUser = (collectionName, username) => {
    return new Promise((resolve, reject) => {
        connect_1.default()
            .then(client => {
            const collection = client.db('test').collection(collectionName);
            const userIsExi = collection.findOne({ username: username }).hasNext();
            const user = userIsExi ? collection.findOne({ username: username }) : null;
            if (user)
                resolve(user);
        })
            .catch(err => reject(err));
    });
};
exports.default = findUser;
//# sourceMappingURL=findUser.js.map