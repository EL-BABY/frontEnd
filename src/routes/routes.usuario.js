import { Router } from "express";
import { ayudaUsuario, inicioUsuario, ListarUsuario, registrarUsuario, salirUsuario } from "../controllers/controller.usuario";
// import { generar } from "../controllers/controller.informes.js";

const RutaUsuario = Router();

RutaUsuario.get("/ayuda", ayudaUsuario);
RutaUsuario.get("/inicio", inicioUsuario);
RutaUsuario.get("/usuario", ListarUsuario );
RutaUsuario.get("/registrar", registrarUsuario );
RutaUsuario.get("/salir", salirUsuario);
// RutaUsuario.get("/reporte", generar);

export default RutaUsuario;


