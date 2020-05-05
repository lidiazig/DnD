import {Request, Response} from "express";
import pool from "../../database";

class InventarioController {

    public async addObject(req: Request, res: Response) {
        await pool.then((r: any) => r.query('INSERT INTO inventario set ?', [req.body]));
        return res.json({text: 'objeto insertado'});
    }

    public async getInventario(req: Request, res: Response) {
        const inventario = await pool.then((r: any) => r.query('SELECT * FROM inventario'));
        res.json(inventario);
    }

}

const inventarioController = new InventarioController();
export default inventarioController;