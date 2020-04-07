import { Request, Response } from 'express';
import pool from "../../database";


class DotesController {

    public async list(req: Request, res: Response){
        const dotes = await pool.then((r: any) => r.query('SELECT * FROM dotes'));
        res.json(dotes);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const dote = await pool.then((r:any) => r.query('SELECT * FROM dotes WHERE id=?', [id]));
        if(dote.length > 0){
            return res.json(dote[0]);
        }
        res.status(404).json({text: 'La dote no existe'});
    }
}
const dotesController = new DotesController();
export default dotesController;