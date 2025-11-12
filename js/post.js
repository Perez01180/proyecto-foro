import { db, doc, getDoc, addDoc, updateDoc, arrayUnion } from "./firebaseConfig.js";

const menuBoton = document.getElementById("menu-boton");
const menu = document.querySelector(".menu");
//cuando hacemos click en el menu-boton le asignamos 
//una clase nueva al menu
function mostrarMenu() {
    menu.classList.toggle("show");
}

menuBoton.addEventListener("click", mostrarMenu);
//se captura el formulario con Id "form-login"
const formLogin = document.getElementById("form-login");
//se captura el input con id "input-usuario"
const inputUsuario = document.getElementById("input-usuario");
//se captura el input con id "input-password"
const inputPassword = document.getElementById("input-password");

//captura la url del navegador
const url = window.location.search
//recuperamos los parametros
const params = new URLSearchParams(url);
//se obtiene el parametro id del posteo
const id = params.get("id");

async function obtenerPost() {
    const posteoRef = doc(db, "posteos", id);
    const postData = await getDoc(posteoRef);
    const post = {
        id: postData.id, tema: postData.data().tema, mensaje: postData.data().mensaje, usuario: postData.data().usuario, comentarios: postData.data().comentarios
    }
    mostrarPost(post);
}
obtenerPost();

function mostrarPost(post) {
    const contenido = document.getElementById("posteos");
    contenido.innerHTML +=
        `<div class = "mensaje-principal">
        <h3> autor: ${post.usuario}  </h3>
        <h4> Tema: ${post.tema} </h4>
        <h5> Mensaje : ${post.mensaje} </h5>
        <input type ="text" id = "inputComentario" placeholder = "ingrese su comentario">
        <button id = "buttonComentario"> Enviar </button>
        
    </div>`;
    //comentar esto
    const divComentarios = document.getElementById("comentarios");

    for (let x = 0; x < post.comentarios.length; x++) {
        divComentarios.innerHTML += `
      <p> ${post.comentarios[x].usuario} dice : ${post.comentarios[x].comentario} </p>
      `
    }
    
    const buttonComentario = document.getElementById("buttonComentario");
    buttonComentario.addEventListener("click", insertarComentario);
}





function recuperarUsuario() {
    const usuarioJSON = localStorage.getItem("dataUsuario");
    const usuario = JSON.parse(usuarioJSON);
    return usuario;
}


// función para guardar comentarios
async function guardarComentario(id, comentarioNuevo) {
    const dataUsuario = recuperarUsuario();
    const postRef = doc(db, "posteos", id);
    await updateDoc(postRef, {comentarios : arrayUnion({usuario :  dataUsuario.usuario, comentario : comentarioNuevo})})
}

async function insertarComentario() {
    const inputComentario = document.getElementById("inputComentario");
    const comentarios = document.getElementById("comentarios");
    const comentario = inputComentario.value;
    const dataUsuario = recuperarUsuario();

    await guardarComentario(id, comentario);

    comentarios.innerHTML += `
    <p> ${dataUsuario.usuario} dice : ${comentario} </p>
   
  `;
}



