import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class IdiomasController {

    public async list(req: Request, res: Response){
        var id = req.body.token;
        if(await userCheck.checkUser(id)){
            const idiomas = await pool.then((r: any) => r.query('SELECT * FROM idiomas'));
            res.json(idiomas);
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }

    }

    public async getOne(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            const { id } = req.params;
            const idioma = await pool.then((r:any) => r.query('SELECT * FROM idiomas WHERE id=?', [id]));
            if(idioma.length > 0){
                return res.json(idioma[0]);
            }
            res.status(404).json({text: 'El idioma no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }

    }
}
const idiomasController = new IdiomasController();
export default idiomasController;