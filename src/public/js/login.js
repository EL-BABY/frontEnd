const logueese = () => {

    const correo = document.getElementById("correo");
    const contrasena = document.getElementById("contrasena");

    let option = {
        "method": "POST",
        headers: {
            "Content-type": "application/json",
        },
        "body": JSON.stringify({
            "correo":correo.value,
            "contrasena": contrasena.value
        })
    }
    let url = "http://localhost:20000/api/login";

    fetch(url, option)
    .then(res => res.json())
    .then(data => {
        document.cookie =`token=${data.token}`;
        if(data.token !==undefined){
            window.location.href="/dash";
        }else{
            alertify.error("Clave incorrecta");
        }
    })
    .catch(error => console.log(error.message))
};