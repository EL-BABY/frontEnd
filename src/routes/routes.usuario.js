import { Router } from "express";
import { ListarUsuario, registrarUsuario, salirUsuario } from "../controllers/controller.usuario";


const RutaUsuario = Router();

RutaUsuario.get("/usuario", ListarUsuario );
RutaUsuario.get("/registrar", registrarUsuario );
RutaUsuario.get("/salir", salirUsuario);

export default RutaUsuario;


