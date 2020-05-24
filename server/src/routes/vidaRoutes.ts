import { Router } from 'express';
import vidaController from '../controllers/vidaController';

class VidaRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/save', vidaController.saveVida);
        this.router.post('/get/:id', vidaController.getVida);
    }
}
const vidaRoutes = new VidaRoutes();
export default vidaRoutes.router;