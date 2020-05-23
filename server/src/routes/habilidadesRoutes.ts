import { Router } from 'express';
import habilidadesController from '../controllers/habilidadesController';
class HabilidadesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/', habilidadesController.list);
        this.router.post('/', habilidadesController.listPj);
        this.router.post('/:id', habilidadesController.getOne);
    }
}
const habilidadesRoutes = new HabilidadesRoutes();
export default habilidadesRoutes.router;