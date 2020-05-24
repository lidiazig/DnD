import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class DotesController {

    public async list(req: Request, res: Response){
        var id = req.body.token;
        if(await userCheck.checkUser(id)){
            delete req.body.token;
            const dotes = await pool.then((r: any) => r.query('SELECT * FROM dotes'));
            res.json(dotes);
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async dotesPj(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const dote = await pool.then((r: any) => r.query('SELECT id,nombre FROM dotes WHERE id=any(select id_dote from dotes_personaje where id_personaje=?)', [id]));
            if (dote.length > 0) {
                return res.json(dote[0]);
            }
            res.status(404).json({text: 'La dote no existe'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getOne(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const dote = await pool.then((r:any) => r.query('SELECT d.*, dp.notas FROM dotes d INNER JOIN dotes_personaje dp WHERE d.id=?', [id]));
            if(dote.length > 0){
                return res.json(dote[0]);
            }
            res.status(404).json({text: 'La dote no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}
const dotesController = new DotesController();
export default dotesController;