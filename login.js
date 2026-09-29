const admin = localStorage.getItem("admin");
if (admin === null) {
    const usuarioadmin = [{
        id: "admin",
        password: "12345678",
        nombre: "admin1",
        descripcion: "admin principal"
    }];
    localStorage.setItem("admin", JSON.stringify(usuarioadmin))
}
const EventoBoton = document.querySelector("#boton-admin")
const contraseña = document.querySelector("#contraseña")
const usuario = document.querySelector("#usuario");
const EventoBotoncontraseña = document.querySelector("#boton-contraseña")
const iniciar = (e) => {
    e.preventDefault();
    const usuarioingresado = usuario.value.trim();
    const contraseñaingresada = contraseña.value;
    const usuarioerror = document.querySelector("#error-us")
    const contraseñaerror = document.querySelector("#error-cos")
    const validacionerror = document.querySelector("#error-val")
    usuarioerror.textContent = "",
        contraseñaerror.textContent = "";
    validacionerror.textContent = "";
    let banderaformulario = true;
    if (usuarioingresado === "") {
        usuarioerror.textContent = "el id usuario es obligatorio"
        banderaformulario = false
    }
    errorescontraseña = []
    if (contraseñaingresada === "") {
        errorescontraseña.push("la contraseña es obligatoria")
        banderaformulario = false
    }
    else if (contraseñaingresada.length < 8) {
        errorescontraseña.push("la contraseña debe tener al menos 8 caracteres")
        banderaformulario = false
    }
    contraseñaerror.innerHTML = errorescontraseña.map(error => `<div> ${error} </div>`).join("")
    if (!banderaformulario) {
        return;
    }
    const admins = JSON.parse(localStorage.getItem("admin"))
    const adminEncontrado = admins.find(admin =>
        admin.id === usuarioingresado && admin.password === contraseñaingresada
    )
    if (adminEncontrado) {
        localStorage.setItem("usuariologueado", JSON.stringify(adminEncontrado))
        const modal = document.querySelector("#modalExito");
        const tituloBienvenida = document.querySelector("#mensajeBienvenida");

        tituloBienvenida.textContent = `¡Bienvenido, ${adminEncontrado.nombre}!`;
        modal.classList.add("mostrar");
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 2000)
    } else {
        validacionerror.textContent = "el usuario o la contraseña es incorrecta"
    }
}
const mostrarcontraseña = () => {

    if (contraseña.type === "password") {
        contraseña.type = "text"
    } else {
        contraseña.type = "password"
    }
}
EventoBoton.addEventListener("click", iniciar)
EventoBotoncontraseña.addEventListener("click", mostrarcontraseña)




