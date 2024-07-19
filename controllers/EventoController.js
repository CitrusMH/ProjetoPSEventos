const Evento = require('../models/evento');
const Artista = require('../models/artista');
const Organizador = require('../models/organizador');
const Categoria = require('../models/categoria');

exports.getAll = async (req, res, next) => {
    try {
        const eventos = await Evento.findAll({
            order: [['nome', 'ASC']],
            include: [{ model: Artista }, { model: Organizador }, { model: Categoria }]
        });
        console.log(eventos);
        res.render('evento/index', { eventos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.renderNovo = async (req, res, next) => {
    try {
        const artistas = await Artista.findAll({ order: [['nome', 'ASC']] });
        const organizadores = await Organizador.findAll({ order: [['nome', 'ASC']] });
        const categorias = await Categoria.findAll({ order: [['tipo', 'ASC']] });
        res.render('evento/novo', { artistas, organizadores, categorias });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res, next) => {
    const { nome, data, artistaId, organizadorId, categoriaId } = req.body;

    try {
        const evento = await Evento.findOne({ where: { nome } });

        if (!evento) {
            await Evento.create({
                nome: nome,
                data: data,
                artistaId: artistaId,
                organizadorId: organizadorId,
                categoriaId: categoriaId
            });
            res.redirect('/eventos');
        } else {
            res.redirect('/eventos');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.renderEditar = async (req, res, next) => {
    const id = req.params.id;

    try {
        const evento = await Evento.findByPk(id);
        const artistas = await Artista.findAll({ order: [['nome', 'ASC']] });
        const organizadores = await Organizador.findAll({ order: [['nome', 'ASC']] });
        const categorias = await Categoria.findAll({ order: [['tipo', 'ASC']] });
        
        res.render('evento/editar', { evento,
             artistas: artistas, 
             organizadores: organizadores, 
             categorias: categorias
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res, next) => {
    const { id, nome, data, artistaId, organizadorId, categoriaId } = req.body;

    try {
        await Evento.update({
            nome: nome,
            data: data,
            artistaId: artistaId,
            organizadorId: organizadorId,
            categoriaId: categoriaId
        }, { where: { id: id } });
        res.redirect('/eventos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Evento.destroy({ where: { id } });
        res.redirect('/eventos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
