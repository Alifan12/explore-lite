import { Sequelize } from "sequelize";

const db = new Sequelize('explore_lite_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;