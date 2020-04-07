"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.send('API is in /api/cpas');
    }
}
exports.indexController = new IndexController();
