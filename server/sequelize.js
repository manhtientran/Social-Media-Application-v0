import { Sequelize } from "sequelize";
import config from "./config/config.js";

const sequelize = new Sequelize(config.postgresUri);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((error) => {
    console.log("Unable to connect to the database ", error);
  });

export default sequelize;
