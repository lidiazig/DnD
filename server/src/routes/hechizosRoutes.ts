import { Router } from 'express';
import hechizosController from '../controllers/hechizosController';

class HechizosRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/:id', hechizosController.getOne);
        this.router.get('/clase/:id', hechizosController.getAllOneClass)
    }
}
const hechizosRoutes = new HechizosRoutes();
export default hechizosRoutes.router;