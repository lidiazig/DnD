import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class DotesController {

    public async list(req: Request, res: Response){
        var id = req.body.token;
        if(await userCheck.checkUser(id)){
            const dotes = await pool.then((r: any) => r.query('SELECT * FROM dotes'));
            res.json(dotes);
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getOne(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            const { id } = req.params;
            const dote = await pool.then((r:any) => r.query('SELECT * FROM dotes WHERE id=?', [id]));
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