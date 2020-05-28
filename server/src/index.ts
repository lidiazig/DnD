import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import alineamientosRoutes from './routes/alineamientosRoutes';
import clasesRoutes from './routes/clasesRoutes';
import dotesRoutes from './routes/dotesRoutes';
import habilidadesRoutes from './routes/habilidadesRoutes';
import razasRoutes from './routes/razasRoutes';
import hechizosRoutes from './routes/hechizosRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import inventarioRoutes from './routes/inventarioRoutes';
import personajeRoutes from './routes/personajeRoutes';
import caracteristicasRoutes from './routes/caracteristicasRoutes';
import datosAdicionalesRoutes from './routes/datosAdicionalesRoutes';
import equiposRoutes from './routes/equiposRoutes';
import salvacionesRoutes from './routes/salvacionesRoutes';
import vidaRoutes from './routes/vidaRoutes';
import armorClassRoutes from './routes/armorClassRoutes';
import morgan from 'morgan';
import cors from 'cors';

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());//Para que pueda leer los json el server
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/alineamientos',alineamientosRoutes);
        this.app.use('/api/clases',clasesRoutes);
        this.app.use('/api/dotes',dotesRoutes);
        this.app.use('/api/habilidades',habilidadesRoutes);
        this.app.use('/api/razas',razasRoutes);
        this.app.use('/api/hechizos',hechizosRoutes);
        this.app.use('/api/usuarios',usuariosRoutes);
        this.app.use('/api/inventario',inventarioRoutes);
        this.app.use('/api/personaje',personajeRoutes);
        this.app.use('/api/caracteristicas',caracteristicasRoutes);
        this.app.use('/api/datos',datosAdicionalesRoutes);
        this.app.use('/api/equipo',equiposRoutes);
        this.app.use('/api/salvaciones',salvacionesRoutes);
        this.app.use('/api/vida',vidaRoutes);
        this.app.use('/api/armor',armorClassRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port')), () => {
            console.log('Server on port', this.app.get('port'));
        }
    }
}
const server = new Server();
server.start();