const logueese = () => {

    const correo = document.getElementById("correo");
    const contrasena = document.getElementById("contrasena");

    let option = {
        "method": "POST",
        headers: {
            "Content-type": "application/json"
        },
        "body": JSON.stringify({
            "correo":correo.value,
            "contrasena": contrasena.value
        })
    }
    let url = "https://backend-supplier.onrender.com/api/login";

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
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});