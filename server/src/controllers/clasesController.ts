import { Request, Response } from 'express';
import pool from "../../database";


class ClasesController {

    public async list(req: Request, res: Response){
        const clases = await pool.then((r: any) => r.query('SELECT * FROM clases'));
        res.json(clases);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const clase = await pool.then((r:any) => r.query('SELECT * FROM clases WHERE id=?', [id]));
        if(clase.length > 0){
            return res.json(clase[0]);
        }
        res.status(404).json({text: 'La clase no existe'});
    }
}
const clasesController = new ClasesController();
export default clasesController;