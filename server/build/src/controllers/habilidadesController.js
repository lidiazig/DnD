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
    saveHabilidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //      var id = req.body.token;
            //     if(await userCheck.checkUser(id)){
            //         delete req.body.token;
            if (req.body.length > 0) {
                let data;
                data = [];
                for (let i = 0; i < req.body.length; i++) {
                    //   console.log(Object.values(req.body[i]));
                    //   console.log(Object.keys(req.body[i]));
                    delete req.body[i].caracteristica;
                    delete req.body[i].nombre;
                    delete req.body[i].penalizacion;
                    delete req.body[i].solo_entrenamiento;
                    data.push(Object.values(req.body[i]));
                }
                const habilidades = yield database_1.default.then((r) => r.query('INSERT INTO habilidades_personaje (id_habilidad, id_personaje, mod_varios, penalizador, rangos) values ? ', [data]));
                return res.json({ text: 'habilidades insertadas' });
            }
            return res.json({ text: 'habilidades insertadas' });
        });
    }
    /*
        public async list(req: Request, res: Response){
            var id = req.body.token;
            if(await userCheck.checkUser(id)){
                delete req.body.token;
                const habilidades = await pool.then((r: any) => r.query('select * from habilidades'));
                res.json(habilidades);
            }else {
                res.status(401).json({text: 'Usuario no autorizado'});
            }
    
        }
    
     */
    listPj(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var token = req.body.token;
            if (yield userCheck_1.default.checkUser(token)) {
                delete req.body.token;
                const { id } = req.params;
                const habilidades = yield database_1.default.then((r) => r.query('select * from habilidades h inner join habilidades_personaje hp on hp.id_habilidad=h.id where hp.id_personaje=? order by h.nombre', [id]));
                if (habilidades.length > 0) {
                    return res.json(habilidades);
                }
                else {
                    const habilidades = yield database_1.default.then((r) => r.query('select * from habilidades'));
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
