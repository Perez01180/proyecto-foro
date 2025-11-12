import { db, getDocs, collection, addDoc } from "./firebaseConfig.js";
const menuBoton = document.getElementById("menu-boton");
const menu = document.querySelector(".menu");
//cuando hacemos click en el menu-boton le asignamos 
//una clase nueva al menu
function mostrarMenu() {
    menu.classList.toggle("show");
}

menuBoton.addEventListener("click", mostrarMenu);
//capturamos el formulario y lo guardamos en una variable "formPost"
const formPost = document.getElementById("form-post");
//capturamos una etiqueta "div" para insertar los post
const postsContainer = document.getElementById("posts");
//obtenermos la data del usuario almacenada en el localStorage
const usuarioJSON = localStorage.getItem("dataUsuario");
//parseamos de JSON a array
const dataUsuario = JSON.parse(usuarioJSON);

async function obtenerPosteos() {
    const posteosRef = collection(db, "posteos");
    const posteosData = await getDocs(posteosRef);
    const posteos = posteosData.docs.map(function (posteoDB) {
        return { id: posteoDB.id, tema: posteoDB.data().tema, mensaje: posteoDB.data().mensaje, usuario: posteoDB.data().usuario, comentarios: posteoDB.data().comentarios }
    })
    return posteos;
}

async function inicializarPosteos(){
    const posteos = await obtenerPosteos();
    //Si existe un valor adentro de posteos
    if (posteos) {
        // iteramos segun el largo del array
        for (let x = 0; x < posteos.length; x++) {
            //por cada posteo insertamos un post
            insertarPost(posteos[x].id, posteos[x].tema, posteos[x].mensaje, posteos[x].usuario);
        }
    }
}
inicializarPosteos();
//insertamos post en el HTML
function insertarPost(id, temaInput, mensajeInput, usuario) {
    postsContainer.innerHTML += `
        <a href=${"/pages/post.html?id=" + id} class = "post">
          <p> autor : ${usuario}</p>
          <p> tema : ${temaInput}</p>
          <p> ${mensajeInput}</p>
        </a>
      `
}

async function guardarPost(temaInput, mensajeInput, usuario) {

    const posteosRef = collection(db, "posteos");
    const response = await  addDoc(posteosRef, {
        tema: temaInput, mensaje: mensajeInput, usuario: usuario, comentarios: [] 
    })
    return response.id;
}

//funcion para capturar el tema y el mensaje
async function enviar(event) {
    //evitamos que se recargue la pagina "preventDefault"
    event.preventDefault();
    //Capturamos el valor del tema
    const temaInput = event.target["tema-input"].value;
    //Capturamos el valor del mensaje
    const mensajeInput = event.target["mensaje-input"].value;
    if (dataUsuario == null ){
        alert("Por favor inicie sesión para crear un post.")
        window.location.replace("/pages/login.html");
        return;
    }
    //mandamos los valores del formulario a la funbcion "guardarPost"
    const id = await guardarPost(temaInput, mensajeInput, dataUsuario.usuario);
    
    //mandamos los valores del formulario a la funcion "insertarPost"
    insertarPost(id, temaInput, mensajeInput, dataUsuario.usuario);
}

//Creamos un evento para capturar el formulario
formPost.addEventListener("submit", enviar);



const buttonBuscar = document.getElementById("buttonBuscar");
const inputBusqueda = document.getElementById("inputBusqueda");

async function buscar(){
    const temaBusqueda = inputBusqueda.value;
    const posteos = await obtenerPosteos();
    const resultados = posteos.filter(function (post){
        return post.tema.toLowerCase().includes(temaBusqueda.toLowerCase())
    })

    postsContainer.innerHTML = "";
    for (let x = 0; x < resultados.length; x++) {
            //por cada posteo insertamos un post
            insertarPost(resultados[x].id, resultados[x].tema, resultados[x].mensaje, resultados[x].usuario);
        }
}
buttonBuscar.addEventListener("click", buscar);