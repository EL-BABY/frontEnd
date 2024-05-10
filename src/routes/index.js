import { Router } from "express";

import RutaUsuario from "./routes.usuario";

const ruta = Router();
ruta.use("/", RutaUsuario);

export default ruta;

