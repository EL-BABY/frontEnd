import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();


export const ListarProductos = (req, res) =>{

    const url = process.env.URL_BACK + "/productos";

    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(data=>{
        res.render("views.productos.registro.ejs",
        {
            "titulo":"Productos",
            "datos":data
        });
    })
    .catch(error=>console.error(error))
};
// export const registrarUsuario = (req, res)=>{

// }

export const registrarProductos =(req, res) =>{
    res.render("views.productos.ejs", {"datos":"madrid"});
}



//validando
export const validarToken = (token) =>{
    let respuesta = "";
    const secret = process.env.JWT_SECRET;
    if(!token){
        return "";
    }
    
    jwt.verify(token, secret, (error, decodedToken) => {
        if(error) {
            //Error al verificar el token
            console.log('Error al verificar el token: ', error);
            return ""
        }else{
            // token verificado correctamente, puedes acceder
            console.log('Token decodificado:', decodedToken)
            respuesta=decodedToken;
        }
    })
    return respuesta;
}