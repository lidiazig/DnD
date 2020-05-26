import {Request, Response} from "express";
import pool from "../../database";
import userCheck from "./userCheck";

class InventarioController {

    public async addObject(req: Request, res: Response) {
  //      var id = req.body.token;
   //     if(await userCheck.checkUser(id)){
   //         delete req.body.token;
        if(req.body.length>0)
        {

            let data: any[];
            data = [];
            for (let i = 0; i < req.body.length; i++) {
                console.log (Object.values(req.body[i]));
                console.log (Object.keys(req.body[i]));
                data.push(Object.values(req.body[i]));
            }



            const inventario = await pool.then((r: any) => r.query('INSERT INTO inventario (cantidad, id_personaje, nombre) values ? ', [data]));
            return res.json({text: 'objeto insertado'});
        }
        return res.json({text: 'objeto insertado'});

    }

    public async getInventario(req: Request, res: Response) {
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const inventario = await pool.then((r: any) => r.query('SELECT * FROM inventario where id_personaje=?',[id]));
            if(inventario.length > 0){
                res.json(inventario);
            }
            res.status(404).json({text: 'El inventario no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const inventarioController = new InventarioController();
export default inventarioController;