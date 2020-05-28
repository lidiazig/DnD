import {Request, Response} from "express";
import pool from "../../database";
import userCheck from "./userCheck";

class ArmorClassController {

    public async saveArmorClass(req: Request, res: Response) {
        //  var token = req.body.token;
        // if(await userCheck.checkUser(token)){
        //     delete req.body.token;
        const armor = await pool.then((r: any) => r.query('INSERT INTO armor_class set ?', [req.body]));

        if (armor.affectedRows > 0) {
            return res.json({text: 'clase de armadura insertada'});
        }
        res.status(404).json({text: 'No se ha obtenido la clase de armadura del pj'});
        //   }else {
        //       res.status(401).json({text: 'Usuario no autorizado'});
        //   }
    }

    public async getArmorClass(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const armor = await pool.then((r: any) => r.query('SELECT * FROM armor_class where id_personaje=?', [id]));
            if (armor.length > 0) {
                return res.json(armor[0]);
            } else
                res.status(404).json({text: 'No se ha obtenido la clase de armadura del pj'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const armorClassController = new ArmorClassController();
export default armorClassController;