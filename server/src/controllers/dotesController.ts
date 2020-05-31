import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class DotesController {

    public async saveDotes(req: Request, res: Response) {
        //      var id = req.body.token;
        //     if(await userCheck.checkUser(id)){
        //         delete req.body.token;
        if (req.body.length > 0) {

            let data: any[];
            data = [];
            for (let i = 0; i < req.body.length; i++) {
             //   console.log(Object.values(req.body[i]));
              //  console.log(Object.keys(req.body[i]));
                delete req.body[i].descripcion;
                delete req.body[i].nombre;
                delete req.body[i].prerrequisito;
                data.push(Object.values(req.body[i]));
            }


            const dotes = await pool.then((r: any) => r.query('INSERT INTO dotes_personaje (id_dote, id_personaje, notas) values ? ', [data]));
            return res.json({text: 'dotes insertadas'});
        }
        return res.json({text: 'dotes insertadas'});
    }

    public async list(req: Request, res: Response){
        var id = req.body.token;
        if(await userCheck.checkUser(id)){
            delete req.body.token;
            const dotes = await pool.then((r: any) => r.query('SELECT * FROM dotes'));
            res.json(dotes);
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async dotesPj(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const dote = await pool.then((r: any) => r.query('SELECT d.*, dp.id_personaje, dp.notas FROM dotes d INNER JOIN dotes_personaje dp on dp.id_dote=d.id WHERE id_personaje=?', [id]));
            console.log(dote);
            if (dote.length > 0) {
                return res.json(dote);
            }
            res.status(404).json({text: 'La dote no existe'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getOne(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const dote = await pool.then((r:any) => r.query('SELECT * FROM dotes WHERE id=?', [id]));
            if(dote.length > 0){
                return res.json(dote[0]);
            }
            res.status(404).json({text: 'La dote no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}
const dotesController = new DotesController();
export default dotesController;