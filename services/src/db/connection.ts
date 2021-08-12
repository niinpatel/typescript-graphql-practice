import { Sequelize } from "sequelize-typescript";

import accessEnv from "#root/helpers/accessEnv";
import models from "./models";

const DB_URL = accessEnv("DB_URL");

const sequelize = new Sequelize({
  dialect: "mysql",
  dialectOptions: {
    charset: "utf-8",
    multipleStatements: true,
  },
  logging: false,
  models,
});

export default sequelize;
