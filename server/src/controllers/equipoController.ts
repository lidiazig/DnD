import {Request, Response} from 'express';
import pool from "../../database";
import userCheck from "./userCheck";


class EquipoController {

    public async saveEquipo(req: Request, res: Response) {
        //  var token = req.body.token;
        //   if(await userCheck.checkUser(token)){
        //     delete req.body.token;
        if (req.body.length > 0) {

            let dataArma: any[];
            dataArma = [];

            let dataArmadura: any[];
            dataArmadura = [];

            for (let i = 0; i < req.body.length; i++) {
                delete req.body[i].id_objeto;
                console.log(Object.values(req.body[i]));
                console.log(Object.keys(req.body[i]));
                if (req.body[i].tipo_objeto == 0)
                    dataArma.push(Object.values(req.body[i]));
                else
                    dataArmadura.push(Object.values(req.body[i]));
            }
            console.log(dataArmadura);

            const arma = await pool.then((r: any) => r.query('INSERT INTO equipo (bonus_arma, critico, dano, municion, alcance, tipo_dano, id_personaje, nombre, propiedades,tipo_objeto) values ?', [dataArma]));
            const armadura = await pool.then((r: any) => r.query('INSERT INTO equipo (bonus_armadura, max_destreza, penalty, peso, fallo_conjuro, tipo_armadura, velocidad, id_personaje, nombre, propiedades, tipo_objeto) values ?', [dataArmadura]));
            return res.json({text: 'equipo insertado'});
        }
        return res.json({text: 'equipo insertado'});

        //   }else {
        //       res.status(401).json({text: 'Usuario no autorizado'});
        //   }
    }

    public async equipoPj(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const equipo = await pool.then((r: any) => r.query('SELECT id_objeto, tipo_objeto, nombre, propiedades from equipo where id_personaje=?', [id]));
            if (equipo.length > 0) {
                return res.json(equipo);
            }
            res.status(404).json({text: 'El equipo no existe'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getArma(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const equipo = await pool.then((r: any) => r.query('SELECT nombre, bonus_arma, dano, critico,' +
                'alcance, tipo_dano, municion, propiedades from equipo WHERE id_objeto=?', [id]));
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            res.status(404).json({text: 'El equipo no existe'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getArmadura(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const equipo = await pool.then((r: any) => r.query('SELECT nombre, tipo_armadura, bonus_armadura,' +
                'max_destreza, penalty, fallo_conjuro, velocidad, peso, propiedades from equipo WHERE id_objeto=?', [id]));
            if (equipo.length > 0) {
                return res.json(equipo[0]);
            }
            res.status(404).json({text: 'El equipo no existe'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const equipoController = new EquipoController();
export default equipoController;