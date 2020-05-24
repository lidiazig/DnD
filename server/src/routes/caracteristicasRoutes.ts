import { Router } from 'express';
import caracteristicasController from '../controllers/caracteristicasController';

class CaracteristicasRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/save', caracteristicasController.saveCaracteristicas);
        this.router.post('/get/:id', caracteristicasController.getCaracteristicas);
    }
}
const caracteristicasRoutes = new CaracteristicasRoutes();
export default caracteristicasRoutes.router;