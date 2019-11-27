"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stories_routes_1 = __importDefault(require("./stories/stories.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const login_routes_1 = __importDefault(require("./login/login.routes"));
const app = express_1.default();
dotenv_1.default.config();
const port = process.env.PORT || 8080;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Origin',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me'
    });
    next();
});
app.use('/api', stories_routes_1.default);
app.use('/api', login_routes_1.default);
app.use((req, res) => {
    res.send(JSON.stringify({ 'message': 'route not handler' }));
    res.status(404);
});
app.listen(port, () => {
    console.log('server started on port ' + port);
});
//# sourceMappingURL=index.js.map