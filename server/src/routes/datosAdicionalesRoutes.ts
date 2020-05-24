import { Router } from 'express';
import datosAdicionalesController from '../controllers/datosAdicionalesController';

class DatosAdicionalesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/save', datosAdicionalesController.saveDatos);
        this.router.post('/get/:id', datosAdicionalesController.getDatos);
    }
}
const datosAdicionalesRoutes = new DatosAdicionalesRoutes();
export default datosAdicionalesRoutes.router;