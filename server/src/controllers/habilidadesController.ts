import { Request, Response } from 'express';
import pool from "../../database";


class HabilidadesController {

    public async list(req: Request, res: Response){
        const habilidades = await pool.then((r: any) => r.query('select * from habilidades'));
        res.json(habilidades);
    }
    public async listPj(req: Request, res: Response){
        const { id } = req.params;
        const habilidades = await pool.then((r: any) => r.query('select * from habilidades h inner join habilidades_personaje hp on hp.id_habilidad=h.id where hp.id_personaje=? order by h.nombre', [id]));
        if(habilidades.length > 0){
            return res.json(habilidades);
        }
        res.status(404).json({text: 'El personaje no existe'});
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