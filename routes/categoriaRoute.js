const express = require('express');
const router = express.Router();

const CategoriaController = require('../controllers/CategoriaController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, CategoriaController.getAll);
router.get('/novo', checkLogin, CategoriaController.renderNovo);
router.post('/', checkLogin, CategoriaController.create);
router.get('/:id', checkLogin, CategoriaController.renderEditar);
router.post('/salvar', checkLogin, CategoriaController.update);
router.get('/delete/:id', checkLogin, CategoriaController.delete);

module.exports = router;
