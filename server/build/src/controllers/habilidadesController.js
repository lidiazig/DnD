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
class HabilidadesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.body.token;
            if (yield userCheck_1.default.checkUser(id)) {
                const habilidades = yield database_1.default.then((r) => r.query('select * from habilidades'));
                res.json(habilidades);
            }
            else {
                res.status(401).json({ text: 'Usuario no autorizado' });
            }
        });
    }
    listPj(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var token = req.body.token;
            if (yield userCheck_1.default.checkUser(token)) {
                const { id } = req.params;
                const habilidades = yield database_1.default.then((r) => r.query('select * from habilidades h inner join habilidades_personaje hp on hp.id_habilidad=h.id where hp.id_personaje=? order by h.nombre', [id]));
                if (habilidades.length > 0) {
                    return res.json(habilidades);
                }
                res.status(404).json({ text: 'El personaje no existe' });
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
                const habilidad = yield database_1.default.then((r) => r.query('SELECT * FROM habilidades WHERE id=?', [id]));
                if (habilidad.length > 0) {
                    return res.json(habilidad[0]);
                }
                res.status(404).json({ text: 'La habilidad no existe' });
            }
            else {
                res.status(401).json({ text: 'Usuario no autorizado' });
            }
        });
    }
}
const habilidadesController = new HabilidadesController();
exports.default = habilidadesController;
