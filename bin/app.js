"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const routes_1 = __importDefault(require("./routes/routes"));
//typeorm
(0, typeorm_1.createConnection)({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "galeria",
    entities: [__dirname + "/models/*.ts"],
    synchronize: true,
})
    .then((connection) => {
    // here you can start to work with your entities
})
    .catch((error) => console.log(error));
//express
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use(routes_1.default);
// je dois prendre se get vers le routes.ts plus tard
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({
        message: "Mugiwara",
    });
}));
app.listen(4000, () => {
    console.log("running");
});
