const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.USERNAME}`, `${process.env.PASSWORD}`, {
    host: `${process.env.HOST}`,
    dialect: `${process.env.DIALECT}`,  
});

// Define the Secondary Table model
const SecondaryTable = sequelize.define('SecondaryTable', {
    primaryTableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tables: {
        type: DataTypes.JSONB,  // Storing tables in JSON format (works for PostgreSQL, MySQL, SQLite)
        allowNull: false,
    },
});


sequelize.sync()
    .then(() => {
        console.log('SecondaryTable model has been synced');
    })
    .catch(error => {
        console.error('Failed to sync model:', error);
    });

module.exports = { SecondaryTable };
