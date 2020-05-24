import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class AlineamientosController {

    public async list(req: Request, res: Response){
        var id = req.body.token;
        if(await userCheck.checkUser(id)){
            delete req.body.token;
            const alineamientos = await pool.then((r: any) => r.query('SELECT * FROM alineamientos'));
            res.json(alineamientos);
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getOne(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const alineamiento = await pool.then((r:any) => r.query('SELECT * FROM alineamientos WHERE id=?', [id]));
            if(alineamiento.length > 0){
                return res.json(alineamiento[0]);
            }
            res.status(404).json({text: 'El alineamiento no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}
const alineamientosController = new AlineamientosController();
export default alineamientosController;