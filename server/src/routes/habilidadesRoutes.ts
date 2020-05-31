import { Router } from 'express';
import habilidadesController from '../controllers/habilidadesController';
class HabilidadesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/save', habilidadesController.saveHabilidades);
        this.router.post('/personaje/:id', habilidadesController.listPj);
        this.router.post('/:id', habilidadesController.getOne);
    }
}
const habilidadesRoutes = new HabilidadesRoutes();
export default habilidadesRoutes.router;