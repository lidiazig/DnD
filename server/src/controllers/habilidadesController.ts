import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class HabilidadesController {

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
    public async listPj(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const habilidades = await pool.then((r: any) => r.query('select * from habilidades h inner join habilidades_personaje hp on hp.id_habilidad=h.id where hp.id_personaje=? order by h.nombre', [id]));
            if(habilidades.length > 0){
                return res.json(habilidades);
            }
            res.status(404).json({text: 'El personaje no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }

    }

    public async getOne(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            const { id } = req.params;
            const habilidad = await pool.then((r:any) => r.query('SELECT * FROM habilidades WHERE id=?', [id]));
            if(habilidad.length > 0){
                return res.json(habilidad[0]);
            }
            res.status(404).json({text: 'La habilidad no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }

    }
}
const habilidadesController = new HabilidadesController();
export default habilidadesController;