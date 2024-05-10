import { Router } from "express";
import { ListarUsuario } from "../controller/controller.usuario";


const RutaUsuario = Router();

RutaUsuario.get("/usuario", ListarUsuario );

export default RutaUsuario;


