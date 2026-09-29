const u = JSON.parse(localStorage.getItem("usuariologueado") || "{}");
document.querySelector("#usuario-ingresado").textContent = u.nombre || "";
document.querySelector("#descripcion-ingresada").textContent = u.descripcion || "";
document.querySelector("#btn-cerrarsesion").addEventListener("click", () => {
  localStorage.removeItem("usuariologueado");
  document.querySelector("#modalExito").classList.add("mostrar");
  setTimeout(() => (window.location.href = "login.html"), 2000);
});