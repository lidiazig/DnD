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
const database_1 = __importDefault(require("../../database"));
const userCheck_1 = __importDefault(require("./userCheck"));
class RazasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.body.token;
            if (yield userCheck_1.default.checkUser(id)) {
                delete req.body.token;
                const razas = yield database_1.default.then((r) => r.query('SELECT * FROM razas'));
                res.json(razas);
            }
            else {
                res.status(401).json({ text: 'Usuario no autorizado' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var token = req.body.token;
            if (yield userCheck_1.default.checkUser(token)) {
                delete req.body.token;
                const { id } = req.params;
                const raza = yield database_1.default.then((r) => r.query('SELECT * FROM razas WHERE id=?', [id]));
                if (raza.length > 0) {
                    return res.json(raza[0]);
                }
                res.status(404).json({ text: 'La raza no existe' });
            }
            else {
                res.status(401).json({ text: 'Usuario no autorizado' });
            }
        });
    }
}
const razasController = new RazasController();
exports.default = razasController;
