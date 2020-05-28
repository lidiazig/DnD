import {Request, Response} from "express";
import pool from "../../database";
import userCheck from "./userCheck";

class DatosAdicionalesController {

    public async saveDatos(req: Request, res: Response) {
        //  var token = req.body.token;
        //  if(await userCheck.checkUser(token)){
        //     delete req.body.token;
        const datos = await pool.then((r: any) => r.query('INSERT INTO datos_adicionales set ?', [req.body]));

        if (datos.affectedRows > 0) {
            return res.json({text: 'datos insertados'});
        }

        res.status(404).json({text: 'No se han obtenido los datos adicionales del pj'});
        // }else {
        //       res.status(401).json({text: 'Usuario no autorizado'});
        //   }
    }

    public async getDatos(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const datos = await pool.then((r: any) => r.query('SELECT * FROM datos_adicionales where id_personaje=?', [id]));
            if (datos.length > 0) {
                return res.json(datos[0]);
            } else
                res.status(404).json({text: 'No se han obtenido los datos adicionales del pj'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const datosAdicionalesController = new DatosAdicionalesController();
export default datosAdicionalesController;