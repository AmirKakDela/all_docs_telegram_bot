const sequelize = require('./db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING, notNull: true},
    ordersCount: {type: DataTypes.INTEGER, defaultValue: 0, notNull: true}
})

module.exports = User;
