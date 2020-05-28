import {Request, Response} from "express";
import pool from "../../database";
import userCheck from "./userCheck";

class PersonajeController {

    public async savePersonaje(req: Request, res: Response) {
        // var id = req.body.token;
        //  if (await userCheck.checkUser(id)) {
        //       delete req.body.token;
        delete req.body.idUsuario;
        const response=await pool.then((r: any) => r.query('INSERT INTO personajes set ?', [req.body]));
        return res.json(response.insertId);
        //    } else {
        //      res.status(401).json({text: 'Usuario no autorizado'});
        //   }
    }

    public async getPersonaje(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            delete req.body.token;
            const {id} = req.params;
            const personaje = await pool.then((r: any) => r.query('SELECT * FROM personajes where id=?', [id]));

            if (personaje.length > 0) {
                return res.json(personaje[0]);
            }

            res.status(404).json({text: 'El personaje no existe'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async getPersonajesUser(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            const personajes = await pool.then((r: any) => r.query('SELECT p.id, p.nombre, c.clase FROM personajes p inner join clases c where p.id_usuario=? and c.id = p.id_clase', [token]));

            if (personajes.length > 0) {
                return res.json(personajes);
            }

            res.status(404).json({text: 'El usuario no tiene personajes'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }

    public async deletePersonaje(req: Request, res: Response) {
        var token = req.body.token;
        if (await userCheck.checkUser(token)) {
            const {id} = req.params;
            console.log(id);
            const personaje = await pool.then((r: any) => r.query('DELETE FROM personajes where id=? and id_usuario=?', [id, token]));

            console.log(personaje);
            if (personaje.affectedRows > 0)
                return res.json({text: 'personaje eliminado'});

            res.status(404).json({text: 'El personaje no existe'});
        } else {
            res.status(401).json({text: 'Usuario no autorizado'});
        }
    }
}

const personajeController = new PersonajeController();
export default personajeController;