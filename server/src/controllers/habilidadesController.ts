import { Request, Response } from 'express';
import pool from "../../database";


class HabilidadesController {

    public async list(req: Request, res: Response){
        const habilidades = await pool.then((r: any) => r.query('SELECT * FROM habilidades'));
        res.json(habilidades);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const habilidad = await pool.then((r:any) => r.query('SELECT * FROM habilidades WHERE id=?', [id]));
        if(habilidad.length > 0){
            return res.json(habilidad[0]);
        }
        res.status(404).json({text: 'La habilidad no existe'});
    }
}
const habilidadesController = new HabilidadesController();
export default habilidadesController;