const PS = 4, $ = s => document.querySelector(s);
const KEY = "esp";
const st = { pag: 1, q: "", edit: null };

const CAMPOS = [
    { n: "nombre", l: "Nombre de la Especialidad", ph: "Ej: Cardiología Intervencionista", min: 3, max: 100 },
    { n: "descripcion", l: "Descripción", t: "area", ph: "Detalle el alcance de la especialidad...", min: 10, max: 100 },
    { n: "activa", l: "Estado inicial", t: "select" }
];
const COLS = ["Nombre de la Especialidad", "Descripción", "Estado"];
const datos = () => DB.leer(KEY, []).filter(x => !x.deleted);
const fila = x =>
    `<div class="fila-tabla"><div><strong>${esc(x.nombre)}</strong></div><div>${esc(x.descripcion)}</div><div><span class="etiqueta ${x.activa ? "etiqueta-verde" : "etiqueta-gris"}">${x.activa ? "Activo" : "Inactivo"}</span></div><div class="alinear-der acciones">`;

function lista() {
    const f = datos().filter(x => x.nombre.toLowerCase().includes(st.q.toLowerCase()));
    const max = Math.max(1, Math.ceil(f.length / PS)); st.pag = Math.min(st.pag, max);
    const pag = f.slice((st.pag - 1) * PS, st.pag * PS);
    $("#encabezado").innerHTML = COLS.map(c => `<div>${c}</div>`).join("") + '<div class="alinear-der">Acciones</div>';
    $("#filas").innerHTML = pag.map(x => fila(x) +
        `<button data-e="${x.id}" title="Editar"><i class="fa-solid fa-pen"></i></button><button data-d="${x.id}" class="peligro" title="Eliminar"><i class="fa-regular fa-trash-can"></i></button></div></div>`).join("")
        || '<div class="fila-tabla"><div>Sin resultados</div></div>';
    $("#resumen").textContent = `Mostrando ${pag.length} de ${f.length} registrados`;
    $("#paginas").innerHTML = Array.from({ length: max }, (_, i) => `<button class="${i + 1 === st.pag ? "sel" : ""}" data-p="${i + 1}">${i + 1}</button>`).join("");
}

function abrirForm(id) {
    st.edit = id; const x = id ? DB.leer(KEY, []).find(o => o.id === id) : {};
    $("#form-titulo").textContent = (id ? "Editar " : "Registrar Nueva ") + "Especialidad";
    $("#campos").innerHTML = CAMPOS.map(c => {
        const v = x[c.n] ?? ""; let i;
        if (c.t === "select") i = `<select name="${c.n}"><option value="1">Activo - Disponible para programación</option><option value="0" ${x.activa === false ? "selected" : ""}>Inactivo</option></select>`;
        else if (c.t === "area") i = `<textarea name="${c.n}" rows="5" placeholder="${c.ph}">${esc(v)}</textarea>`;
        else i = `<input name="${c.n}" placeholder="${c.ph}" value="${esc(v)}">`;
        return `<div class="campo"><label>${c.l}</label>${i}<span class="error" data-err="${c.n}"></span></div>`;
    }).join("");
    $("#vista-lista").hidden = true; $("#vista-form").hidden = false;
}

const cerrarForm = () => { $("#vista-form").hidden = true; $("#vista-lista").hidden = false; lista(); };

$("#form").addEventListener("submit", e => {
    e.preventDefault(); let ok = true; const v = {};
    CAMPOS.forEach(c => {
        v[c.n] = e.target.elements[c.n].value.trim(); let m = "";
        if (c.t !== "select" && v[c.n].length < c.min) m = v[c.n] ? `Mínimo ${c.min} caracteres` : "Campo obligatorio";
        else if (c.t !== "select" && v[c.n].length > c.max) m = `Máximo ${c.max} caracteres`;
        document.querySelector(`[data-err="${c.n}"]`).textContent = m; if (m) ok = false;
    });
    if (!ok) return;
    if (datos().some(o => o.id !== st.edit && o.nombre.toLowerCase() === v.nombre.toLowerCase())) {
        document.querySelector('[data-err="nombre"]').textContent = "Ya existe una especialidad con ese nombre";
        return;
    }
    v.activa = v.activa === "1";
    const todos = DB.leer(KEY, []);
    if (st.edit) Object.assign(todos.find(o => o.id === st.edit), v);
    else todos.push({ id: guid(), ...v, deleted: false });
    DB.guardar(KEY, todos); cerrarForm();
});

$("#btn-cancelar").onclick = cerrarForm; $("#btn-nuevo").onclick = () => abrirForm();
$("#buscar").oninput = e => { st.q = e.target.value; st.pag = 1; lista(); };
document.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.p) { st.pag = +b.dataset.p; lista(); }
    if (b.dataset.e) abrirForm(b.dataset.e);
    if (b.dataset.d && confirm("¿Eliminar este registro?")) {
        const t = DB.leer(KEY, []); t.find(o => o.id === b.dataset.d).deleted = true; DB.guardar(KEY, t); lista();
    }
});
lista(); if (new URLSearchParams(location.search).get("nuevo")) abrirForm();
