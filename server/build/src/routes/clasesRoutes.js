"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clasesController_1 = __importDefault(require("../controllers/clasesController"));
class ClasesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', clasesController_1.default.list);
        this.router.get('/:id', clasesController_1.default.getOne);
    }
}
const clasesRoutes = new ClasesRoutes();
exports.default = clasesRoutes.router;
