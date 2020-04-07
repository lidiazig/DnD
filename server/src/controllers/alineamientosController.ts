import { Request, Response } from 'express';
import pool from "../../database";


class AlineamientosController {

    public async list(req: Request, res: Response){
        const alineamientos = await pool.then((r: any) => r.query('SELECT * FROM alineamientos'));
        res.json(alineamientos);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const alineamiento = await pool.then((r:any) => r.query('SELECT * FROM alineamientos WHERE id=?', [id]));
        if(alineamiento.length > 0){
            return res.json(alineamiento[0]);
        }
        res.status(404).json({text: 'El alineamiento no existe'});
    }
}
const alineamientosController = new AlineamientosController();
export default alineamientosController;