import { Router } from 'express';
import idiomasController from '../controllers/idiomasController';
class IdiomasRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/', idiomasController.list);
        this.router.post('/:id', idiomasController.getOne);
    }
}
const idiomasRoutes = new IdiomasRoutes();
export default idiomasRoutes.router;