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


const docs = () => DB.leer("doc", []).filter(x => !x.deleted);
const espActivas = DB.leer("esp", []).filter(x => !x.deleted && x.activa).length;
const valores = document.querySelectorAll(".tarjeta-stat .valor");
valores[0].textContent = docs().filter(d => d.estado === "Activo").length;
valores[1].textContent = espActivas;
valores[2].textContent = 48;
const render = () => {
  const q = document.querySelector(".caja-buscador input").value.toLowerCase();
  const lista = docs().filter(d => d.nombre.toLowerCase().includes(q));
  document.querySelectorAll(".contenedor-tabla .fila-tabla:not(.encabezado-tabla)").forEach(f => f.remove());
  document.querySelector(".contenedor-tabla").insertAdjacentHTML("beforeend",
    lista.slice(0, 3).map(d => filaDoctor(d) + "</div></div>").join("") || '<div class="fila-tabla"><div>Sin resultados</div></div>');
};
document.querySelector(".caja-buscador input").addEventListener("input", render);
const [bDoc, bEsp] = document.querySelectorAll(".botones-accion .boton");
bDoc.onclick = () => (location.href = "doctores.html?nuevo=1");
bEsp.onclick = () => (location.href = "especialidades.html?nuevo=1");
render();