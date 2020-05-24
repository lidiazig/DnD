import {Request, Response} from "express";
import pool from "../../database";
import userCheck from "./userCheck";

class SalvacionesController {

    public async saveSalvaciones(req: Request, res: Response) {
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const salvaciones = await pool.then((r: any) => r.query('INSERT INTO salvaciones set ?',[req.body]));

            if(salvaciones.affectedRows > 0){
                return res.json({text: 'salvaciones insertadas'});
            }

            res.status(404).json({text: 'No se han obtenido las salvaciones del pj'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getSalvaciones(req: Request, res: Response) {
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const salvaciones = await pool.then((r: any) => r.query('SELECT * FROM salvaciones where id_personaje=?',[id]));
            if(salvaciones.length > 0){
                res.json(salvaciones);
            }
            res.status(404).json({text: 'No se han obtenido las salvaciones del pj'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const salvacionesController = new SalvacionesController();
export default salvacionesController;