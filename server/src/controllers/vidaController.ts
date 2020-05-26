import {Request, Response} from "express";
import pool from "../../database";
import userCheck from "./userCheck";

class VidaController {

    public async saveVida(req: Request, res: Response) {
     //   var token = req.body.token;
     //   if(await userCheck.checkUser(token)){
     //       delete req.body.token;
            const vida = await pool.then((r: any) => r.query('INSERT INTO vida set ?',[req.body]));

            if(vida.affectedRows > 0){
                return res.json({text: 'vida insertada'});
            }

            res.status(404).json({text: 'No se ha obtenido la vida del pj'});
    //    }else {
    //        res.status(401).json({text: 'Usuario no autorizado'});
     //   }
    }

    public async getVida(req: Request, res: Response) {
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const vida = await pool.then((r: any) => r.query('SELECT * FROM vida where id_personaje=?',[id]));
            if(vida.length > 0){
                res.json(vida[0]);
            }
            res.status(404).json({text: 'No se ha obtenido la vida del pj'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const vidaController = new VidaController();
export default vidaController;