"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotesController_1 = __importDefault(require("../controllers/dotesController"));
class DotesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/dotes', dotesController_1.default.list);
        this.router.get('/dotes/:id', dotesController_1.default.getOne);
    }
}
const dotesRoutes = new DotesRoutes();
exports.default = dotesRoutes.router;
