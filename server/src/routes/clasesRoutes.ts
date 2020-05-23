import { Router } from 'express';
import clasesController from '../controllers/clasesController';
class ClasesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/', clasesController.list);
        this.router.get('/:id', clasesController.getOne);
    }
}
const clasesRoutes = new ClasesRoutes();
export default clasesRoutes.router;