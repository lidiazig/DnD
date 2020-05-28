import { Router } from 'express';
import armorClassController from '../controllers/armorClassController';

class ArmorClassRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/save', armorClassController.saveArmorClass);
        this.router.post('/get/:id', armorClassController.getArmorClass);
    }
}
const armorClassRoutes = new ArmorClassRoutes();
export default armorClassRoutes.router;