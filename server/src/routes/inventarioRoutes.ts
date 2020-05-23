import { Router } from 'express';
import inventarioController from '../controllers/inventarioController';
class InventarioRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/', inventarioController.addObject);
        this.router.post('/id', inventarioController.getInventario);
    }
}
const inventarioRoutes = new InventarioRoutes();
export default inventarioRoutes.router;