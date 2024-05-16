import { Router } from "express";
import { ListarUsuario } from "../controllers/controller.usuario";


const RutaUsuario = Router();

RutaUsuario.get("/usuario", ListarUsuario );

export default RutaUsuario;


