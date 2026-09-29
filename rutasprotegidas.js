const usuarioLogueado = localStorage.getItem("usuariologueado");
const enLogin = window.location.pathname.includes("login.html");
if (enLogin && usuarioLogueado) window.location.href = "dashboard.html";
if (!enLogin && !usuarioLogueado) window.location.href = "login.html";