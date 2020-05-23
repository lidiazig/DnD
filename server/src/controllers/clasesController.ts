import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class ClasesController {

    public async list(req: Request, res: Response){
        var id = req.body.token;
        if(await userCheck.checkUser(id)){
            const clases = await pool.then((r: any) => r.query('SELECT * FROM clases'));
            res.json(clases);
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }

    }

    public async getOne(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            const { id } = req.params;
            const clase = await pool.then((r:any) => r.query('SELECT * FROM clases WHERE id=?', [id]));
            if(clase.length > 0){
                return res.json(clase[0]);
            }
            res.status(404).json({text: 'La clase no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}
const clasesController = new ClasesController();
export default clasesController;