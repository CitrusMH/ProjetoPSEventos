const express = require('express');
const router = express.Router();

const OrganizadorController = require('../controllers/OrganizadorController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, OrganizadorController.getAll);
router.get('/novo', checkLogin, OrganizadorController.renderNovo);
router.post('/', checkLogin, OrganizadorController.create);
router.get('/:id', checkLogin, OrganizadorController.renderEditar);
router.post('/salvar', checkLogin, OrganizadorController.update);
router.get('/delete/:id', checkLogin, OrganizadorController.delete);

module.exports = router;
