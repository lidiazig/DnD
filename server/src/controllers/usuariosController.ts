import { Request, Response } from 'express';
import pool from "../../database";


class UsuariosController {

    public async createUser(req: Request, res: Response){
        var crypto = require('crypto');
        var shasum = crypto.createHash('sha1');
        shasum.update(req.body.contrasena);
        console.log(req.body);
        console.log(req.body.email);
        console.log(req.body.contrasena);
        req.body.contrasena = shasum.digest('hex');
        await pool.then((r:any) => r.query('INSERT INTO usuarios set ?', [req.body]));
        res.json({message: 'usuario creado'});
    }

    public async getUser(req: Request, res: Response){
        var crypto = require('crypto');
        var shasum = crypto.createHash('sha1');
        shasum.update(req.body.contrasena);
        console.log(req.body);
        console.log(req.body.email);
        console.log(req.body.contrasena);
        req.body.contrasena = shasum.digest('hex');
        const usuario = await pool.then((r:any) => r.query('SELECT * FROM usuarios WHERE email=? and contrasena=?', [req.body.email, req.body.contrasena]));
        if(usuario.length > 0){
            return res.json({text: 'usuario válido'});
        }
        res.status(404).json({text: 'Email o contraseña incorrecta'});
    }

}
const usuariosController = new UsuariosController();
export default usuariosController;