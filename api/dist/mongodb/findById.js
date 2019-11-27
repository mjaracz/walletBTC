"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("./connect"));
const findById = (collectionName, id) => {
    return new Promise((response, rejects) => {
        connect_1.default()
            .then(client => {
            const cursor = client.db('test').collection(collectionName).find({ id: id });
            cursor.hasNext().then(isDocuments => {
                if (isDocuments)
                    cursor
                        .toArray()
                        .then(arr => {
                        response(arr);
                    })
                        .catch(err => {
                        rejects(err);
                        console.warn('[mongodb] Collection Error ' + err);
                    });
                else
                    throw new Error('ID without rang');
            })
                .catch(err => {
                rejects(err);
                console.warn('[mongodb] Documents ' + err);
            });
        });
    });
};
exports.default = findById;
//# sourceMappingURL=findById.js.map