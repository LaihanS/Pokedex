const Sequelize = require("sequelize");

const sequelize = require("./conexión");

const tipos = sequelize.define("tipos",{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    URL: {
        type: Sequelize.STRING,
        allowNull: false,
    },


});

module.exports = tipos;