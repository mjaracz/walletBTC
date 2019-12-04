"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var amqp_connection_manager_1 = __importDefault(require("amqp-connection-manager"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var connection = amqp_connection_manager_1["default"].connect([process.env.amqp_URL]);
exports["default"] = connection;
