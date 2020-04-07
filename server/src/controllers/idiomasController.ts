import { Request, Response } from 'express';
import pool from "../../database";


class IdiomasController {

    public async list(req: Request, res: Response){
        const idiomas = await pool.then((r: any) => r.query('SELECT * FROM idiomas'));
        res.json(idiomas);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const idioma = await pool.then((r:any) => r.query('SELECT * FROM idiomas WHERE id=?', [id]));
        if(idioma.length > 0){
            return res.json(idioma[0]);
        }
        res.status(404).json({text: 'El idioma no existe'});
    }
}
const idiomasController = new IdiomasController();
export default idiomasController;