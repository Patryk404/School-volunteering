const Sequelize = require('sequelize');

const sequlize = require('../util/database');

const Admin = sequlize.define('admin',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Admin;