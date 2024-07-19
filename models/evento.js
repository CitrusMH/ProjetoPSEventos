const Sequelize = require('sequelize');
const connection = require('../database/database');
const Artista = require('./artista');
const Organizador = require('./organizador');
const Categoria = require('./categoria');

const Evento = connection.define('eventos', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

Evento.belongsTo(Artista);
Evento.belongsTo(Organizador);
Evento.belongsTo(Categoria);

//Evento.sync({force: true});

module.exports = Evento;
