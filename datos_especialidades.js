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
    ].map(([nombre, descripcion], i) => ({ id: guid(), nombre, descripcion, activa: i !== 2, deleted: false }));
    DB.guardar("esp", esp);
}