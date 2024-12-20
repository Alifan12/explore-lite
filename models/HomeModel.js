import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Home = db.define('homes', {
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
}, {
    freezeTableName:true
});

export default Home;

// Untuk generate table jika tidak ada pada db
(async()=>{
    await db.sync();
})();