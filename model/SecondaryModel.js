const { Sequelize,DataTypes } = require("sequelize");
require("dotenv").config(); 

const CONFIG = {
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DIALECT: process.env.DB_DIALECT || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432, 
};

const sequelize = new Sequelize(
    CONFIG.DB_NAME,
    CONFIG.DB_USERNAME,
    CONFIG.DB_PASSWORD,
    {
      host: CONFIG.DB_HOST,
      dialect: CONFIG.DB_DIALECT,
      port: CONFIG.DB_PORT,
      logging: false,
      dialectOptions: CONFIG.DB_USE_SSL
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {}, // If not using SSL, leave it empty
    }
  );

// // Function to authenticate and sync the database
// const initializeDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection to PostgreSQL database successful");

//     await sequelize.sync({ alter: true }); // Ensures database schema is up-to-date without altering
//     console.log("Database synchronized successfully");
//   } catch (error) {
//     console.error("Unable to connect to the PostgreSQL database:", error);
//     throw error;
//   }
// };

// // Initialize the database
// initializeDatabase();

// // Export the Sequelize instance
// module.exports = sequelize;





// Define the Secondary Table model
const SecondaryTable = sequelize.define('SecondaryTable', {
    primaryTableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tables: {
        type: DataTypes.JSONB,  
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
