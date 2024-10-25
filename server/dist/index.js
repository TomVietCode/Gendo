"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const index_route_1 = __importDefault(require("./v1/routes/index.route"));
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, database_1.connectDb)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, index_route_1.default)(app);
app.listen(port, () => {
    console.log("App is listening on port " + process.env.PORT);
});
