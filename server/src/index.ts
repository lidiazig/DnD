import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import alineamientosRoutes from './routes/alineamientosRoutes';
import clasesRoutes from './routes/clasesRoutes';
import dotesRoutes from './routes/dotesRoutes';
import habilidadesRoutes from './routes/habilidadesRoutes';
import idiomasRoutes from './routes/idiomasRoutes';
import razasRoutes from './routes/razasRoutes';
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
        this.app.use('/api/idiomas',idiomasRoutes);
        this.app.use('/api/razas',razasRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port')), () => {
            console.log('Server on port', this.app.get('port'));
        }
    }
}
const server = new Server();
server.start();