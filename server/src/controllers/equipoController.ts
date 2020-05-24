import { Request, Response } from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class EquipoController {

    public async saveEquipo(req: Request, res: Response) {
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const equipo = await pool.then((r: any) => r.query('INSERT INTO equipo set ?',[req.body]));

            if(equipo.affectedRows > 0){
                return res.json({text: 'equipo insertado'});
            }

            res.status(404).json({text: 'No se ha obtenido el equipo del pj'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async equipoPj(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const equipo = await pool.then((r: any) => r.query('SELECT id_objeto, tipo_objeto, nombre from equipo where id_personaje=?', [id]));
            if (equipo.length > 0) {
                return res.json(equipo);
            }
            res.status(404).json({text: 'El equipo no existe'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getArma(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const equipo = await pool.then((r:any) => r.query('SELECT nombre, bonus_arma, dano, critico,' +
                'alcance, tipo_dano, municion, propiedades from equipo WHERE id_objeto=?', [id]));
            if(equipo.length > 0){
                return res.json(equipo[0]);
            }
            res.status(404).json({text: 'El equipo no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getArmadura(req: Request, res: Response){
        var token = req.body.token;
        if(await userCheck.checkUser(token)){
            delete req.body.token;
            const { id } = req.params;
            const equipo = await pool.then((r:any) => r.query('SELECT nombre, tipo_armadura, bonus_armadura,' +
                'max_destreza, penalty, fallo_conjuro, velocidad, peso, propiedades from equipo WHERE id_objeto=?', [id]));
            if(equipo.length > 0){
                return res.json(equipo[0]);
            }
            res.status(404).json({text: 'El equipo no existe'});
        }else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}
const equipoController = new EquipoController();
export default equipoController;