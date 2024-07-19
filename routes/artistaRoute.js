const express = require('express');
const router = express.Router();

const ArtistaController = require('../controllers/ArtistaController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, ArtistaController.getAll);
router.get('/novo', checkLogin, ArtistaController.renderNovo);
router.post('/', checkLogin, ArtistaController.create);
router.get('/:id', checkLogin, ArtistaController.renderEditar);
router.post('/salvar', checkLogin, ArtistaController.update);
router.get('/delete/:id', checkLogin, ArtistaController.delete);

module.exports = router;
