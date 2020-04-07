import { Router } from 'express';
import dotesController from '../controllers/dotesController';
class DotesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/', dotesController.list);
        this.router.get('/:id', dotesController.getOne);
    }
}
const dotesRoutes = new DotesRoutes();
export default dotesRoutes.router;