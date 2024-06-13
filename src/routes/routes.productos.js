import { Router } from "express";
import { ListarProductos, registrarProductos } from "../controllers/controller.productos";


const RutaProductos = Router();

RutaProductos.get("/productos", ListarProductos );
RutaProductos.get("/registro", registrarProductos );

export default RutaProductos;