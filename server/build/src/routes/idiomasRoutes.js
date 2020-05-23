"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const idiomasController_1 = __importDefault(require("../controllers/idiomasController"));
class IdiomasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', idiomasController_1.default.list);
        this.router.post('/:id', idiomasController_1.default.getOne);
    }
}
const idiomasRoutes = new IdiomasRoutes();
exports.default = idiomasRoutes.router;
