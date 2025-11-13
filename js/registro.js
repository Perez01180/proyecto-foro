  import {db, addDoc, collection} from "./firebaseConfig.js";

  const menuBoton = document.getElementById("menu-boton");
          const menu = document.querySelector(".menu");
           //cuando hacemos click en el menu-boton le asignamos 
            //una clase nueva al menu
          function mostrarMenu(){
            menu.classList.toggle("show");
        }
        
        menuBoton.addEventListener("click", mostrarMenu);
        //capturamos el formulario en una variable
        const formRegistro = document.getElementById("form-registro");
        //se captura el input que contiene el nombre del usuario
        const inputUsuario = document.getElementById("input-usuario");
        //se captura el input que contiene el password
        const inputPassword= document.getElementById("input-password");


        function registrar (event){
          //evitamos que se recargue la pagina
          event.preventDefault();
          //capturamos el valor del "input-usuario"
          const usuario = inputUsuario.value;
          //capturamos el valor del "input-password"
          const password = inputPassword.value;


          guardarUsuario({usuario, password});
        }
        //funcion asincrona para guardar datos en la db
        async function guardarUsuario(dataUsuario){
          //guardamos una referencia a la coleccion de usuarios
          const usuariosRef = collection(db, "usuarios");
          //esperamos hasta que se añada un usuario nuevo
          await addDoc(usuariosRef, dataUsuario);
          alert("registrado correctamente, por favor inicie sesión.");
          window.location.replace("login.html");
        }

        //añadimos un evento para detectar el envio del formulario
        formRegistro.addEventListener("submit", registrar );