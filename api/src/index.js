"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var wallet_routes_1 = __importDefault(require("./routes/wallet.routes"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
require('dotenv').config();
var app = express_1["default"]();
var port = process.env.PORT || 8080;
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Origin',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me'
    });
    next();
});
app.use('/api', wallet_routes_1["default"]);
app.use(function (req, res) {
    res.status(404);
    res.send(JSON.stringify({ 'message': 'route not handler' }));
});
app.listen(port, function () {
    console.log('server started on port ' + port);
});
