import { Router } from 'express';
import usuariosController from '../controllers/usuariosController';
class UsuariosRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/', usuariosController.createUser);
        this.router.post('/login', usuariosController.getUser);
    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;