import { Router } from 'express';
import razasController from '../controllers/razasController';
class RazasRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/', razasController.list);
        this.router.post('/:id', razasController.getOne);
    }
}
const razasRoutes = new RazasRoutes();
export default razasRoutes.router;