"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const alineamientosRoutes_1 = __importDefault(require("./routes/alineamientosRoutes"));
const clasesRoutes_1 = __importDefault(require("./routes/clasesRoutes"));
const dotesRoutes_1 = __importDefault(require("./routes/dotesRoutes"));
const habilidadesRoutes_1 = __importDefault(require("./routes/habilidadesRoutes"));
const idiomasRoutes_1 = __importDefault(require("./routes/idiomasRoutes"));
const razasRoutes_1 = __importDefault(require("./routes/razasRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json()); //Para que pueda leer los json el server
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/alineamientos', alineamientosRoutes_1.default);
        this.app.use('/api/clases', clasesRoutes_1.default);
        this.app.use('/api/dotes', dotesRoutes_1.default);
        this.app.use('/api/habilidades', habilidadesRoutes_1.default);
        this.app.use('/api/idiomas', idiomasRoutes_1.default);
        this.app.use('/api/razas', razasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port')), () => {
            console.log('Server on port', this.app.get('port'));
        };
    }
}
const server = new Server();
server.start();
