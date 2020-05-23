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
class DotesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.body.token;
            if (yield userCheck_1.default.checkUser(id)) {
                const dotes = yield database_1.default.then((r) => r.query('SELECT * FROM dotes'));
                res.json(dotes);
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
                const { id } = req.params;
                const dote = yield database_1.default.then((r) => r.query('SELECT * FROM dotes WHERE id=?', [id]));
                if (dote.length > 0) {
                    return res.json(dote[0]);
                }
                res.status(404).json({ text: 'La dote no existe' });
            }
            else {
                res.status(401).json({ text: 'Usuario no autorizado' });
            }
        });
    }
}
const dotesController = new DotesController();
exports.default = dotesController;
