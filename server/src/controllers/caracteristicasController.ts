import {Request, Response} from "express";
import pool from "../../database";
import userCheck from "./userCheck";

class CaracteristicasController {

    public async saveCaracteristicas(req: Request, res: Response) {
        //  var token = req.body.token;
        // if(await userCheck.checkUser(token)){
        //     delete req.body.token;
        const caracteristicas = await pool.then((r: any) => r.query('INSERT INTO caracteristicas set ?', [req.body]));

        if (caracteristicas.affectedRows > 0) {
            return res.json({text: 'caracteristicas insertadas'});
        }
        res.status(404).json({text: 'No se han obtenido las caracteristicas del pj'});
        //   }else {
        //       res.status(401).json({text: 'Usuario no autorizado'});
        //   }
    }

    public async getCaracteristicas(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const caracteristicas = await pool.then((r: any) => r.query('SELECT * FROM caracteristicas where id_personaje=?', [id]));
            if (caracteristicas.length > 0) {
                return res.json(caracteristicas[0]);
            } else
                res.status(404).json({text: 'No se han obtenido las caracteristicas del pj'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const caracteristicasController = new CaracteristicasController();
export default caracteristicasController;