import app from "./src/server";

app.listen(app.get("port"), () =>{
    console.log(`bienvenidos al cielo hijos de puta puerto ${app.get('port')}`);
});