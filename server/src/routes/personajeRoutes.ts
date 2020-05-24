import { Router } from 'express';
import personajeController from '../controllers/personajeController';

class PersonajeRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.post('/', personajeController.savePersonaje);
        this.router.post('/:id', personajeController.getPersonaje);
        this.router.post('/delete/:id', personajeController.deletePersonaje);
    }
}
const personajeRoutes = new PersonajeRoutes();
export default personajeRoutes.router;