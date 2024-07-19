const express = require('express');
const router = express.Router();

const EventoController = require('../controllers/EventoController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, EventoController.getAll);
router.get('/novo', checkLogin, EventoController.renderNovo);
router.post('/', checkLogin, EventoController.create);
router.get('/:id', checkLogin, EventoController.renderEditar);
router.post('/salvar', checkLogin, EventoController.update);
router.get('/delete/:id', checkLogin, EventoController.delete);

module.exports = router;
