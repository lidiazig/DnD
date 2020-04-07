import { Router } from 'express';
import alineamientosController from '../controllers/alineamientosController';
class AlineamientosRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/alineamientos', alineamientosController.list);
        this.router.get('/alineamientos/:id', alineamientosController.getOne);
    }
}
const alineamientosRoutes = new AlineamientosRoutes();
export default alineamientosRoutes.router;