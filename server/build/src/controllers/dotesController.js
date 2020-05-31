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
    saveDotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //      var id = req.body.token;
            //     if(await userCheck.checkUser(id)){
            //         delete req.body.token;
            if (req.body.length > 0) {
                let data;
                data = [];
                for (let i = 0; i < req.body.length; i++) {
                    //   console.log(Object.values(req.body[i]));
                    //  console.log(Object.keys(req.body[i]));
                    delete req.body[i].descripcion;
                    delete req.body[i].nombre;
                    delete req.body[i].prerrequisito;
                    data.push(Object.values(req.body[i]));
                }
                const dotes = yield database_1.default.then((r) => r.query('INSERT INTO dotes_personaje (id_dote, id_personaje, notas) values ? ', [data]));
                return res.json({ text: 'dotes insertadas' });
            }
            return res.json({ text: 'dotes insertadas' });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.body.token;
            if (yield userCheck_1.default.checkUser(id)) {
                delete req.body.token;
                const dotes = yield database_1.default.then((r) => r.query('SELECT * FROM dotes'));
                res.json(dotes);
            }
            else {
                res.status(401).json({ text: 'Usuario no autorizado' });
            }
        });
    }
    dotesPj(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var token = req.body.token;
            if (yield userCheck_1.default.checkUser(token)) {
                delete req.body.token;
                const { id } = req.params;
                const dote = yield database_1.default.then((r) => r.query('SELECT d.*, dp.id_personaje, dp.notas FROM dotes d INNER JOIN dotes_personaje dp on dp.id_dote=d.id WHERE id_personaje=?', [id]));
                console.log(dote);
                if (dote.length > 0) {
                    return res.json(dote);
                }
                res.status(404).json({ text: 'La dote no existe' });
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
