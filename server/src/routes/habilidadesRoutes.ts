import { Router } from 'express';
import habilidadesController from '../controllers/habilidadesController';
class HabilidadesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/', habilidadesController.list);
        this.router.get('/', habilidadesController.listPj);
        this.router.get('/:id', habilidadesController.getOne);
    }
}
const habilidadesRoutes = new HabilidadesRoutes();
export default habilidadesRoutes.router;