const EliminaRegistro = async (event) => {
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
        const deleteSuccess = await borrar(event);
  
        // Si la eliminación fue exitosa, mostrar mensaje de éxito
        if (deleteSuccess) {
          await Swal.fire({
            title: "¡listo!",
            text: "los datos han sido borrados",
            icon: "",
          });
  
          // Redirigir a la página de usuario
          window.location.href = "/usuario";
        } else {
          console.log("La eliminación no fue exitosa.");
        }
      }
    } catch (error) {
      console.error("Error al eliminar el registro", error);
    }
  };
  


  const borrar = async(event) => {
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
    const url = "https://backend-supplier.onrender.com/api/usuario";
    const option = {
        method: "DELETE",
        body: JSON.stringify({
            "idusuario": codigo,
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
            console.error("Error al eliminar el registro", error);
            throw error; // Propagar el error para que pueda ser manejado externamente
        });
};


// Para salir de la aplicacion

const salirUsuario = () =>{
    document.cookie = "token=",
    window.location.href="/salir"
}

const GuardarUsuario = () =>{
    const identificacion = document.getElementById('identificacion').value;
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const telefono = document.getElementById('telefono').value;
    var correoValido = validarCorreo();

    
    const url = "https://backend-supplier.onrender.com/api/usuario";
    // const option = {
    //     method : "POST",
    //     body:  JSON.stringify({
    //         "idusuario": codigo
    //     })
    // }

    // alert('Registro guardado');

    let token = "";
    const cookieToken = document.cookie;
    if (!correoValido) 
      return;
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
            "idusuario": null,
            identificacion,
            nombre,
            correo,
            contrasena,
            telefono,
        }),
        headers,
    }

    fetch(url, options)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        alert('Registro guardado' + data)
    })
    .catch(error =>{
        alert("Error al guardar registro" , error)
    })
};
const ModificarUsuario = () => {
  const idusuario = document.getElementById("idusuario").value;
  const identificacion = document.getElementById("identificacion").value;
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const telefono = document.getElementById("telefono").value;
  var correoValido = validarCorreo();

  const url = "https://backend-supplier.onrender.com/api/usuario";
  let token = "";
  const cookieToken = document.cookie;

  if (!correoValido) 
    return;
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
      idusuario,
      identificacion,
      nombre,
      correo,
      contrasena,
      telefono,
    }),
    headers,
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Registro modificado" + data);
    })
    .catch((error) => {
      alert("Error al modificar el registro", error);
    });
};
const CargarUsuario = (event) => {
  // console.log(event.target.parentElement.parentElement.children[1].innerHTML);
  // document.getElementById('idusuario').value = event.target.parentElement
  // .parentElement.children[1].innerHTML;
  document.getElementById("idusuario").value =
    event.target.parentElement.parentElement.children[0].innerHTML;
  document.getElementById("identificacion").value =
    event.target.parentElement.parentElement.children[1].innerHTML;
  document.getElementById("nombre").value =
    event.target.parentElement.parentElement.children[2].innerHTML;
  document.getElementById("correo").value =
    event.target.parentElement.parentElement.children[3].innerHTML;
  document.getElementById("contrasena").value =
    event.target.parentElement.parentElement.children[4].innerHTML;
  document.getElementById("telefono").value =
    event.target.parentElement.parentElement.children[5].innerHTML;
};
function buscarPorId() {
  var idusuario = document.getElementById('idInput').value;
  if (idusuario.trim() === '') {
      alert('Por favor, ingrese un ID de usuario.');
      return;
  }
  fetch(`https://backend-supplier.onrender.com/api/usuario/${idusuario}`)
      .then(response => response.json())
      .then(data => mostrarResultado(data))
      .catch(error => {
          console.error('Error al realizar la solicitud.', error);
          alert('Hubo un error al realizar la solicitud.');
      });
}

function mostrarResultado(usuario) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!usuario) {
        resultsContainer.innerHTML = 'No se encontraron resultados';
        return;
    }

    var resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.innerHTML = '<h3>' + usuario.nombre + '</h3><p>' + usuario.descripcion + '</p>';
    resultsContainer.appendChild(resultItem);
}

var modal = document.getElementById('chatModal');

// Obtener el botón que abre el modal
var btnAbrir = document.querySelector('button');

// Obtener el elemento de cierre (x) del modal
var spanCerrar = document.getElementsByClassName('close')[0];


var modal = document.getElementById('modal');

// Función para abrir el modal
function abrirChat() {
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    modal.style.display = 'none';
}

// Función para enviar un mensaje
function enviarMensaje() {
    var mensaje = document.getElementById('messageInput').value;
    if (mensaje.trim() === '') {
        alert('Por favor, ingresa un mensaje.');
        return;
    }

    agregarMensaje('Tú', mensaje);
    document.getElementById('messageInput').value = '';
}

// Función para agregar un mensaje al modal
function agregarMensaje(usuario, mensaje) {
    var chatMessages = document.getElementById('chat-messages');
    var mensajeElement = document.createElement('div');
    mensajeElement.classList.add('message');
    mensajeElement.innerHTML = '<strong>' + usuario + ':</strong> ' + mensaje;
    chatMessages.appendChild(mensajeElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al fondo
}

function validarCorreo() {
  var correoInput = document.getElementById('correo');
  var correo = correoInput.value;

  // Expresión regular para validar el formato de correo electrónico
  var expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!expresionRegularCorreo.test(correo)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      correoInput.focus(); // Enfocar nuevamente el campo de correo electrónico
      return false; // Devuelve false si el correo no es válido
  }

  return true; // Devuelve true si el correo es válido
}
document.addEventListener('DOMContentLoaded', function() {
  const estrellas = document.querySelectorAll('.estrella');
  const respuesta = document.getElementById('respuesta');

  estrellas.forEach(function(estrella) {
    estrella.addEventListener('mouseover', function() {
      marcarEstrellas(Number(estrella.dataset.valor));
    });

    estrella.addEventListener('mouseleave', function() {
      resetearEstrellas();
    });

    estrella.addEventListener('click', function() {
      respuesta.textContent = `¡Has calificado con ${this.dataset.valor} estrellas!`;
      // Aquí podrías enviar la calificación al servidor si lo necesitas
    });
  });

  function marcarEstrellas(valor) {
    estrellas.forEach(function(estrella) {
      if (Number(estrella.dataset.valor) <= valor) {
        estrella.classList.add('hover');
      } else {
        estrella.classList.remove('hover');
      }
    });
  }

  function resetearEstrellas() {
    estrellas.forEach(function(estrella) {
      estrella.classList.remove('hover');
    });
  }
});

function mostrarPolitica() {
  if (usuario.estaLogueado) {
    // Mostrar el apartado de política y privacidad
    document.getElementById("politica").style.display = "block";
  } else {
    // Ocultar el apartado de política y privacidad
    document.getElementById("politica").style.display = "none";
  }
}
window.onload = function() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}
  function cerrarModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  // Muestra la ventana emergente
}

// Función para cerrar la ventana emergente al hacer clic en el botón de cerrar
  // document.getElementById("close")=onclick=function () {
  var modal = document.getElementById("modal");
  // modal.style.display = "none"; // Oculta la ventana emergente
// };

// const Reporte = (event) => {
//   // Obtener datos del usuario
//   const idUsuario = event.target.parentElement.parentElement.children[0].textContent.trim();
//   const identificacion = event.target.parentElement.parentElement.children[1].textContent.trim();
//   const nombre = event.target.parentElement.parentElement.children[2].textContent.trim();
//   const correo = event.target.parentElement.parentElement.children[3].textContent.trim();
//   const contraseña = event.target.parentElement.parentElement.children[4].textContent.trim();
//   const telefono = event.target.parentElement.parentElement.children[5].textContent.trim();

//   // Crear el contenido del reporte con estilo
//   const contenidoReporte = `
//     <h1>Reporte de Usuario</h1>
//     <p>En nuestro sistema, gestionamos los productos de manera eficiente y segura. A continuación, se presenta la información detallada del usuario:</p>
//     <hr>
//     <h2>Información del Usuario</h2>
//     <ul>
//       <li><strong>ID de Usuario:</strong> ${idUsuario}</li>
//       <li><strong>Identificación:</strong> ${identificacion}</li>
//       <li><strong>Nombre:</strong> ${nombre}</li>
//       <li><strong>Correo:</strong> ${correo}</li>
//       <li><strong>Contraseña:</strong> ${contraseña}</li>
//       <li><strong>Teléfono:</strong> ${telefono}</li>
//     </ul>
//   `;

//   // Crear el documento HTML para el reporte
//   const reporteHTML = `
//     <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>Reporte de Usuario</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             padding: 20px;
//           }
//           h1, h2 {
//             color: #333;
//           }
//           hr {
//             border: 1px solid #ccc;
//           }
//           ul {
//             list-style-type: none;
//             padding: 0;
//           }
//           li {
//             margin-bottom: 10px;
//           }
//         </style>
//       </head>
//       <body>
//         ${contenidoReporte}
//       </body>
//     </html>
//   `;

//   // Crear un objeto URL con el documento HTML
//   const blob = new Blob([reporteHTML], { type: 'text/html' });
//   const url = URL.createObjectURL(blob);

//   // Abrir el reporte en una nueva ventana
//   window.open(url);
// };

