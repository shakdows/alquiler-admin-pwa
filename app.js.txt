// API de n8n (producción)
const API_BASE = "https://shakdows.app.n8n.cloud/webhook/alquiler-admin";

async function main() {
  const estado = document.getElementById("estado");
  const out = document.getElementById("out");

  try {
    const url = `${API_BASE}?action=resumen`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();

    estado.textContent = "OK (respuesta del backend)";
    out.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    estado.textContent = "Error cargando datos";
    out.textContent = e.message;
  }
}

main();
