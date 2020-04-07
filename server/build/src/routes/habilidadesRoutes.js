"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habilidadesController_1 = __importDefault(require("../controllers/habilidadesController"));
class HabilidadesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/habilidades', habilidadesController_1.default.list);
        this.router.get('/habilidades/:id', habilidadesController_1.default.getOne);
    }
}
const habilidadesRoutes = new HabilidadesRoutes();
exports.default = habilidadesRoutes.router;
