import {db, getDocs, collection } from "./firebaseConfig.js"; 

        const menuBoton = document.getElementById("menu-boton");
        const menu = document.querySelector(".menu");
        //cuando hacemos click en el menu-boton le asignamos 
        //una clase nueva al menu
        function mostrarMenu(){
         menu.classList.toggle("show");
        }
        
        menuBoton.addEventListener("click", mostrarMenu);
        //se captura el formulario con Id "form-login"
        const formLogin = document.getElementById("form-login");
        //se captura el input con id "input-usuario"
        const inputUsuario = document.getElementById("input-usuario");
        //se captura el input con id "input-password"
        const inputPassword = document.getElementById("input-password");

        //funcion para que el usuario pueda iniciar sesion
        async function iniciarSesion(event){
          //evita que se recargue la pagina
          event.preventDefault();
          //capturamos el valor de "inputUsuario"
          const usuario = inputUsuario.value;
          //capturamos el valor de "inputPassword"
          const password = inputPassword.value;
          //pasamos el usuario y el password para obtener el usuario registrado
          const dataUsuario = await obtenerUsuariosRegistrados(usuario, password);

          //si el usuario existe
          if (dataUsuario){
            //Se comparan las contraseñas
            if (dataUsuario.password == password){
              //guardamos la data del usuario en el localStorage
              localStorage.setItem("dataUsuario", JSON.stringify(dataUsuario));
              alert("Logeado correctamente");
              //mandamos al usuario a la pagina principal 
              window.location.replace("../index.html");
              console.log(window.location.href)
            } else{
              alert("Contraseña incorrecta");
            }
          } else{
            alert("Usuario no encontrado");
          }
        }

        //funcion asincrona para recuperar los usuarios de la DB
        async function obtenerUsuariosRegistrados(usuario, password){
          //guardamos una referencia a la coleccion de usuarios
          const usuariosRef = collection(db, "usuarios");
          //esperamos y guardamos los usuarios
          const dataDB = await getDocs(usuariosRef);
          //formateamos la data recibida de la DB
          const registrados = dataDB.docs.map(function (dataUsuario){
            return {id : dataUsuario.id, usuario : dataUsuario.data().usuario, password : dataUsuario.data().password }
          })
          
          //buscamos si el usuario esta registrado
          const usuarioLogueado = registrados.find(function(data){
            //Si encontramos el usuario retornamos sus datos
            if (data.usuario == usuario){
              return data;
            }
          })
          return usuarioLogueado;
        }
        //añadimos para detectar el envio del formulario
        formLogin.addEventListener("submit", iniciarSesion );