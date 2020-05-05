import { Request, Response } from 'express';
import pool from "../../database";


class HechizosController {

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const hechizo = await pool.then((r:any) => r.query('SELECT * FROM hechizos WHERE id=?', [id]));
        if(hechizo.length > 0){
            return res.json(hechizo[0]);
        }
        res.status(404).json({text: 'El hechizo no existe'});
    }
    public async getAllOneClass(req: Request, res: Response){
        const { id } = req.params;
        const hechizos = await pool.then((r:any) => r.query('select h.id as id, h.nombre as nombre, hc.nivel as nivel from hechizos h inner join hechizos_clase hc on hc.id_hechizo=h.id where hc.id_clase=? order by hc.nivel, h.nombre',[id]));
        if(hechizos.length > 0){
            return res.json(hechizos);
        }
        res.status(404).json({text: 'No hay hechizos para la clase seleccionada'});
    }
}
const hechizosController = new HechizosController();
export default hechizosController;