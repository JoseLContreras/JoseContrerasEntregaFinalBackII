import dotenv from "dotenv";
const enviroment = "DEV";

dotenv.config({
  path: enviroment === "PRODUCTION" ? "./.env.prod" : "./.env.dev" });

/* console.log("Port:", process.env.PORT);
console.log("Mongo URL:", process.env.MONGO_URL);
console.log("Secret Code:", process.env.SECRET_CODE);
console.log("JWT Secret Code:", process.env.JWT_SECRET_CODE); */

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_CODE: process.env.SECRET_CODE,
  JWT_SECRET_CODE: process.env.JWT_SECRET_CODE
};
