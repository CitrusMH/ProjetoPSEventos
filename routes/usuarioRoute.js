const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');
const checkLogin = require('../middleware/checkLogin');

router.get('/login', UsuarioController.renderLogin);
router.post('/login', UsuarioController.login);
router.get('/', checkLogin, UsuarioController.getAll);
router.get('/novo', UsuarioController.renderNovo);
router.post('/', UsuarioController.create);
router.get('/:id', checkLogin, UsuarioController.renderEditar);
router.post('/salvar', checkLogin, UsuarioController.update);
router.get('/delete/:id', checkLogin, UsuarioController.delete);

module.exports = router;