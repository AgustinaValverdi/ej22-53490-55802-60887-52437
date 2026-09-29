
const DB = {
    leer(k, def) { try { return JSON.parse(localStorage.getItem(k)) || def; } catch { return def; } },
    guardar(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};
const guid = () => crypto.randomUUID();
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => "&#" + c.charCodeAt(0) + ";");
if (!localStorage.getItem("esp")) {
    const esp = [
        ["Cardiología", "Estudio y tratamiento de trastornos del corazón y del sistema circulatorio."],
        ["Neurología", "Diagnóstico y tratamiento de todas las categorías de afecciones cerebrales."],
        ["Dermatología", "Atención integral de enfermedades de la piel, uñas y cabello."],
        ["Pediatría", "Cuidado médico de lactantes, niños y adolescentes."]
    ].map(([nombre], i) => ({ id: guid(), nombre, descripcion: "", activa: i !== 2, deleted: false }));
    DB.guardar("esp", esp);
    DB.guardar("doc", [
        ["Dr. Alejandro Rivera", "MED-4920", 0, "Activo"], ["Dra. Elena Martínez", "MED-2104", 3, "De Licencia"],
        ["Dr. Marcos Torres", "MED-8831", 1, "Activo"], ["Dra. Lucía Soria", "MED-1192", 2, "Activo"],
        ["Dr. Andrés Juárez", "MED-3345", 0, "Activo"], ["Dr. Eduardo López", "MED-7710", 3, "De Licencia"]
    ].map(([nombre, licencia, e, estado]) => ({ id: guid(), nombre, licencia, especialidadId: esp[e].id, estado, deleted: false })));
}
const nombreEsp = id => (DB.leer("esp", []).find(e => e.id === id) || {}).nombre || "-";
const filaDoctor = x => `<div class="fila-tabla"><div><strong>${esc(x.nombre)}</strong><br><small>ID: ${esc(x.licencia)}</small>
</div><div><span class="etiqueta etiqueta-azul">${esc(nombreEsp(x.especialidadId))}</span></div><div><span class="etiqueta ${x.estado === "Activo" ? "etiqueta-verde" : "etiqueta-rojo"}">${esc(x.estado)}</span></div><div class="alinear-der acciones">`;