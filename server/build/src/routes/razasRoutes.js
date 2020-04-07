"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const razasController_1 = __importDefault(require("../controllers/razasController"));
class RazasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/razas', razasController_1.default.list);
        this.router.get('/razas/:id', razasController_1.default.getOne);
    }
}
const razasRoutes = new RazasRoutes();
exports.default = razasRoutes.router;
