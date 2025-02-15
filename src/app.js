import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import envs from "./config/envs.config.js";
import passport from "passport";
import {initializePassport} from "./config/passport.config.js";
import cookieParser from "cookie-parser";


const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser())
app.use(
  session({
    secret: envs.SECRET_CODE, // palabra secreta
    resave: true, // Mantiene la session activa, si esta en false la session se cierra en un cierto tiempo
    saveUninitialized: true, // Guarda la session
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Rutas de la api
app.use("/api", routes);

const httpServer = app.listen(envs.PORT, () => {
  console.log(`Server on port ${envs.PORT}`);
});

// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});
