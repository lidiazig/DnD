import { Router } from 'express';
import salvacionesController from '../controllers/salvacionesController';

class SalvacionesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/save', salvacionesController.saveSalvaciones);
        this.router.post('/get/:id', salvacionesController.getSalvaciones);
    }
}
const salvacionesRoutes = new SalvacionesRoutes();
export default salvacionesRoutes.router;