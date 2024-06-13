const EliminaProducto = async (event) => {
    try {
      // Mostrar un cuadro de diálogo de confirmación
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡los datos se borraran permanentemente!",
        icon: "",
        showCancelButton: true,
        confirmButtonColor: "#800080",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡confirmar!",
      });
  
      // Si el usuario confirma la eliminación
      if (result.isConfirmed) {
        // Llama a la función borrar y espera a que se complete
        const deleteSuccess = await borrarProducto(event);
  
        // Si la eliminación fue exitosa, mostrar mensaje de éxito
        if (deleteSuccess) {
          await Swal.fire({
            title: "¡listo!",
            text: "los productos han sido borrados",
            icon: "",
          });
  
          // Redirigir a la página de usuario
          window.location.href = "/productos";
        } else {
          console.log("La eliminación no fue exitosa.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar el registro", error);
    }
  };
  


  const borrarProducto = async(event) => {
    let codigo = event.target.parentElement
        .parentElement.children[0].innerHTML;
    let token = "";
    const cookieToken = document.cookie;

    if (cookieToken) {
        const cookie = cookieToken.split(";");
        cookie.forEach((cookie) => {
            const [nombre, valor] = cookie.split("=");
            if (nombre.trim() === "token") {
                token = valor;
            }
        });
    } else {
        alert("Debe loguearse nuevamente");
        return;
    }
    if (token == "") {
        alert("Debe loguearse nuevamente");
        return;
    }
    const headers = {
        "x-access-token": token,
        "content-type": "application/json",
    };
    const url = "https://backend-supplier.onrender.com/api/productos";
    const option = {
        method: "DELETE",
        body: JSON.stringify({
            "idproductos": codigo,
        }),
        headers,
    };
    return fetch(url, option)
        .then((res) => res.json())
        .then((data) => {
            if (data.respuesta) {
                return true;
            } else {
                return false;
            }
        })
        .catch((error) => {
            console.error("Error al eliminar el producto", error);
            throw error; // Propagar el error para que pueda ser manejado externamente
        });
};

const GuardarProductos = () =>{
    const productos = document.getElementById('productos').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    

    const url = "https://backend-supplier.onrender.com/api/productos";
    // const option = {
    //     method : "POST",
    //     body:  JSON.stringify({
    //         "idusuario": codigo
    //     })
    // }

    // alert('Registro guardado');

    let token = "";
    const cookieToken = document.cookie;

    if(cookieToken){
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie =>{
            const [nombre, valor] = cookie.split('=');
            if(nombre.trim() === 'token'){
                token = valor;
            }
        });
    }else{
        alert("Debe loguearse nuevamente");
        return
    }
    if(token==""){
        alert("Debe loguearse nuevamente");
        return
    }

    const headers ={
        'x-access-token':token,
        'Content-type': 'application/json'
    };

    const options = {
        method: "POST",
        body : JSON.stringify({
            "idproductos": null,
            productos,
            descripcion,
            precio,
        }),
        headers,
    }

    fetch(url, options)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        alert('Producto guardado' + data)
    })
    .catch(error =>{
        alert("Error al guardar el producto" , error)
    })
}
const ModificarProductos = () => {
    const idproductos = document.getElementById('idproductos').value;
    const productos = document.getElementById('productos').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    
  
    const url = "https://backend-supplier.onrender.com/api/productos";
    // const option = {
    //     method : "POST",
    //     body:  JSON.stringify({
    //         "idusuario": codigo
    //     })
    // }
  
    // alert('Registro guardado');
  
    let token = "";
    const cookieToken = document.cookie;
  
    if (cookieToken) {
      const cookies = cookieToken.split(";");
      cookies.forEach((cookie) => {
        const [nombre, valor] = cookie.split("=");
        if (nombre.trim() === "token") {
          token = valor;
        }
      });
    } else {
      alert("Debe loguearse nuevamente");
      return;
    }
    if (token == "") {
      alert("Debe loguearse nuevamente");
      return;
    }
  
    const headers = {
      "x-access-token": token,
      "Content-type": "application/json",
    };
  
    const options = {
      method: "PUT",
      body: JSON.stringify({
        idproductos,
        productos,
        descripcion,
        precio,
      }),
      headers,
    };
  
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Producto modificado" + data);
      })
      .catch((error) => {
        alert("Error al modificar el Producto", error);
      });
  }
  const CargarProductos = (event) => {
    // console.log(event.target.parentElement.parentElement.children[1].innerHTML);
    // document.getElementById('idusuario').value = event.target.parentElement
    // .parentElement.children[1].innerHTML;
    document.getElementById("idproductos").value =
      event.target.parentElement.parentElement.children[0].innerHTML;
    document.getElementById("productos").value =
      event.target.parentElement.parentElement.children[1].innerHTML;
    document.getElementById("descripcion").value =
      event.target.parentElement.parentElement.children[2].innerHTML;
    document.getElementById("precio").value =
      event.target.parentElement.parentElement.children[3].innerHTML;
  };