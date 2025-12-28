const API = "https://shakdows.app.n8n.cloud/webhook/alquiler-admin?action=resumen";

async function main() {
  const estado = document.getElementById("estado");
  const out = document.getElementById("out");

  try {
    const res = await fetch(API, { method: "GET" });

    // Leer como texto primero (debug real)
    const text = await res.text();
    estado.textContent = `HTTP ${res.status} ${res.statusText}`;

    if (!text) {
      out.textContent = "(Respuesta vacía desde n8n. No hay JSON para parsear.)";
      return;
    }

    // Intentar parsear JSON
    try {
      const data = JSON.parse(text);
      out.textContent = JSON.stringify(data, null, 2);
    } catch {
      out.textContent =
        "NO ES JSON. Respuesta recibida (primeros 800 chars):\n\n" +
        text.slice(0, 800);
    }
  } catch (e) {
    estado.textContent = "Error de red / CORS";
    out.textContent = e.message;
  }
}

main();
