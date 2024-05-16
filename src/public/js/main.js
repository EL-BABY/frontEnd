const EliminaRegistro = (event) =>{
    // let codigo = document.getElementById("Elimina")
    // .parentElement. parentElement.children[3];
    let codigo = event.target.parentElement
    .parentElement.children[0].innerHTML;

    const url = "http://localhost:20000/api/usuario";
    const option = {
        method : "DELETE",
        body:  JSON.stringify({
            "idusuario": codigo
        })
    }
    fetch(url, option)
    .then(res=>res.json())
    .then(data=>alert(data))
    .catch(error=>alert(error))
}

// Para salir de la aplicacion

const salirUsuario = () =>{
    console.log("aja");
    document.cookie = "token=";
    window.location.href="/salir"
}

const GuardarUsuario = () =>{
    const identificacion = document.getElementById('identificacion').value;
    const nombres = document.getElementById('nombres').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const contrasena = document.getElementById('contrasena').value;

    
    const url = "http://localhost:20000/api/usuario";
    const option = {
        method : "POST",
        body:  JSON.stringify({
            "idusuario": codigo
        })
    }

    alert('Registro guardado');
}