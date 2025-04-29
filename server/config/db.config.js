// config/db.config.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,    // database name
    process.env.DB_USER,    // database user
    process.env.DB_PASSWORD, // database password
    {
        host: process.env.DB_HOST, // database host
        dialect: 'postgres',           // database dialect (mysql, postgres, etc.)
        port: process.env.DB_PORT,  // database port
        logging: false,             // disable logging; default: console.log
    }
);

export const DbConnection = async () => {  
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}