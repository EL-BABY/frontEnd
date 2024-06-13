import { Router } from "express";

import RutaUsuario from "./routes.usuario";

import RutaDash from "./routes.dash";

import RutaProductos from "./routes.productos";

const ruta = Router();
ruta.use("/", RutaProductos)
ruta.use("/", RutaUsuario);
ruta.use("/", RutaDash);

export default ruta;

