import { Request, Response } from 'express';
import pool from "../../database";


class RazasController {

    public async list(req: Request, res: Response){
        const razas = await pool.then((r: any) => r.query('SELECT * FROM razas'));
        res.json(razas);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const raza = await pool.then((r:any) => r.query('SELECT * FROM razas WHERE id=?', [id]));
        if(raza.length > 0){
            return res.json(raza[0]);
        }
        res.status(404).json({text: 'La raza no existe'});
    }
}
const razasController = new RazasController();
export default razasController;