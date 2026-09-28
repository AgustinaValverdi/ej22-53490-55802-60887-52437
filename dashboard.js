const NombreUsuario = document.querySelector("#usuario-ingresado")
const DescripcionUsuario= document.querySelector("#descripcion-ingresada")
const UsuarioCambio=localStorage.getItem("usuariologueado")
const UsuarioIngresado= JSON.parse(UsuarioCambio)
const eventoBoton= document.querySelector("#btn-cerrarsesion")
NombreUsuario.textContent= UsuarioIngresado.nombre
DescripcionUsuario.textContent=UsuarioIngresado.descripcion

const cerrarSesion= ()=>{
    localStorage.removeItem("usuariologueado")
    const modal = document.querySelector("#modalExito")

    modal.classList.add("mostrar")

    setTimeout (()=>{
        window.location.href= "login.html"
    },2000)
}
eventoBoton.addEventListener("click",cerrarSesion)