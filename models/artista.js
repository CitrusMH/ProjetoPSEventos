const Sequelize = require('sequelize');
const connection = require('../database/database');

const Artista = connection.define('artistas', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estilo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Artista.sync({force: true});

module.exports = Artista;
