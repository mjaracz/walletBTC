"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendMessageToQueue_1 = __importDefault(require("../rabbitMQ/sendMessageToQueue"));
const findById_1 = __importDefault(require("../mongodb/findById"));
const findAll_1 = __importDefault(require("../mongodb/findAll"));
const restless_1 = require("@restless/restless");
const deleteOne_1 = __importDefault(require("../mongodb/deleteOne"));
const express_1 = require("express");
const route = express_1.Router();
route.get('/stories/all', (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield findAll_1.default('documents')
        .then(data => res.json(data))
        .catch(err => {
        res.statusMessage = "Internal Server Error";
        res.sendStatus(500);
    });
}));
route.get('/story/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield findById_1.default('documents', Number(req.params.id))
        .then(data => res.json(data))
        .catch(err => {
        res.statusMessage = 'ID without Rang';
        res.sendStatus(400);
    });
}));
route.post('/story/new', restless_1.asyncHandler(restless_1.sanitize({
    body: restless_1.asObject({
        id: restless_1.asNumber,
        username: restless_1.asString,
        title: restless_1.asString,
        body: restless_1.asString
    })
}), reqData => {
    sendMessageToQueue_1.default('new.json.stories', reqData);
    return restless_1.responseOf(reqData);
}));
route.put('/story/update/:id', restless_1.asyncHandler(restless_1.sanitize({
    id: restless_1.asNumber,
    body: restless_1.asObject({
        username: restless_1.asString,
        title: restless_1.asString,
        body: restless_1.asString
    })
}), reqData => {
    sendMessageToQueue_1.default('update.json.stories', reqData);
    return restless_1.responseOf(reqData);
}));
route.delete(`/story/delete/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield deleteOne_1.default('documents', Number(req.params.id))
        .then(data => res.json(data))
        .catch(err => {
        res.statusMessage = "Internal Server Error";
        res.sendStatus(500);
    });
}));
exports.default = route;
//# sourceMappingURL=stories.routes.js.map