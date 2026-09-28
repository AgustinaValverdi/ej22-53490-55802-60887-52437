
const usuarioLogueado = localStorage.getItem("usuariologueado")
if(window.location.pathname.includes("login.html") && usuarioLogueado){
window.location.href= "dashboard.html"
}
if(!usuarioLogueado && window.location.pathname.includes("dashboard.html")){
    window.location.href="login.html"
}