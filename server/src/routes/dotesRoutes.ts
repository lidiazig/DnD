import { Router } from 'express';
import dotesController from '../controllers/dotesController';
class DotesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/', dotesController.list);
        this.router.post('/save', dotesController.saveDotes);
        this.router.post('/personaje/:id', dotesController.dotesPj);
        this.router.post('/:id', dotesController.getOne);
    }
}
const dotesRoutes = new DotesRoutes();
export default dotesRoutes.router;