import { Router } from 'express';
import razasController from '../controllers/razasController';
class RazasRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/', razasController.list);
        this.router.get('/:id', razasController.getOne);
    }
}
const razasRoutes = new RazasRoutes();
export default razasRoutes.router;