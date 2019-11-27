"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_connection_manager_1 = __importDefault(require("amqp-connection-manager"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = amqp_connection_manager_1.default.connect([process.env.amqp_URL]);
exports.default = connection;
//# sourceMappingURL=connect.js.map