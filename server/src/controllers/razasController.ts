import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class RazasController {

    public async list(req: Request, res: Response){
        var id = req.body.token;
        if(await userCheck.checkUser(id)){
            delete req.body.token;
            const razas = await pool.then((r: any) => r.query('SELECT * FROM razas'));
            res.json(razas);
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }

    }

    public async getOne(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const raza = await pool.then((r:any) => r.query('SELECT * FROM razas WHERE id=?', [id]));
            if(raza.length > 0){
                return res.json(raza[0]);
            }
            res.status(404).json({text: 'La raza no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }

    }
}
const razasController = new RazasController();
export default razasController;