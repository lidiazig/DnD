"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alineamientosController_1 = __importDefault(require("../controllers/alineamientosController"));
class AlineamientosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/alineamientos', alineamientosController_1.default.list);
        this.router.get('/alineamientos/:id', alineamientosController_1.default.getOne);
    }
}
const alineamientosRoutes = new AlineamientosRoutes();
exports.default = alineamientosRoutes.router;
