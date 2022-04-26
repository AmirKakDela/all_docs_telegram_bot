const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'all_documents', 'postgres', '123',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
)
