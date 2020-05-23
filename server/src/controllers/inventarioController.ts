import {Request, Response} from "express";
import pool from "../../database";
import userCheck from "./userCheck";

class InventarioController {

    public async addObject(req: Request, res: Response) {
        var id = req.body.token;
        if(await userCheck.checkUser(id)){
            await pool.then((r: any) => r.query('INSERT INTO inventario set ?', [req.body]));
            return res.json({text: 'objeto insertado'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getInventario(req: Request, res: Response) {
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            const { id } = req.params;
            const inventario = await pool.then((r: any) => r.query('SELECT * FROM inventario where id_personaje=?',[id]));
            if(inventario.length > 0){
                res.json(inventario[0]);
            }
            res.status(404).json({text: 'El inventario no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const inventarioController = new InventarioController();
export default inventarioController;