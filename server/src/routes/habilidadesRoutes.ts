import { Router } from 'express';
import habilidadesController from '../controllers/habilidadesController';
class HabilidadesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/habilidades', habilidadesController.list);
        this.router.get('/habilidades/:id', habilidadesController.getOne);
    }
}
const habilidadesRoutes = new HabilidadesRoutes();
export default habilidadesRoutes.router;