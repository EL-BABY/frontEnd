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