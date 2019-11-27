"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("./connect"));
const findAll = (collectionName) => {
    return new Promise((resolve, rejects) => {
        connect_1.default()
            .then(client => {
            client
                .db('test')
                .collection(collectionName)
                .find({})
                .toArray()
                .then((res) => {
                resolve(res);
            })
                .catch(err => {
                rejects(err);
                console.warn('[mongodb] Collection Error: ' + err);
            });
        })
            .catch(err => {
            rejects(err);
            console.warn('[mongodb] Connection Error: ' + err);
        });
    });
};
exports.default = findAll;
//# sourceMappingURL=findAll.js.map