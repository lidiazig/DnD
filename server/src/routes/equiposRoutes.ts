import { Router } from 'express';
import equipoController from '../controllers/equipoController';
class EquiposRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/save', equipoController.saveEquipo);
        this.router.post('/personaje/:id', equipoController.equipoPj);
        this.router.post('/arma/:id', equipoController.getArma);
        this.router.post('/armadura/:id', equipoController.getArmadura);
    }
}
const equiposRoutes = new EquiposRoutes();
export default equiposRoutes.router;