import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();


export const ListarUsuario = (req, res) =>{
    const url = "http:/localhost:20000/api/usuario";
    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(data=>{
        res.render("views.usuario.ejs",
        {
            "titulo":"Travels Wings",
             "data":data
        });
    })
    .catch(error=>console.error(error))
};

