  const btnHamburguesa = document.getElementById('btnHamburguesa');
        const btnCerrar = document.getElementById('btnCerrar');
        const menuLateral = document.getElementById('menuLateral');
        const fondoOscuro = document.getElementById('fondoOscuro');

        btnHamburguesa.addEventListener('click', () => {
            menuLateral.classList.add('activo');
            fondoOscuro.classList.add('activo');
        });

        const cerrarMenu = () => {
            menuLateral.classList.remove('activo');
            fondoOscuro.classList.remove('activo');
        };

        btnCerrar.addEventListener('click', cerrarMenu);
        fondoOscuro.addEventListener('click', cerrarMenu);