const API = "https://shakdows.app.n8n.cloud/webhook/alquiler-admin?action=resumen";

async function main() {
  const estado = document.getElementById("estado");
  const out = document.getElementById("out");

  try {
    const res = await fetch(API, { method: "GET" });

    const text = await res.text(); // leer como TEXTO primero
    const head = (text || "").slice(0, 400);

    estado.textContent = `HTTP ${res.status} ${res.statusText}`;

    // intenta parsear JSON solo si hay texto
    if (!text) {
      out.textContent = "(Respuesta vacía. n8n está devolviendo 0 bytes.)";
      return;
    }

    try {
      const data = JSON.parse(text);
      out.textContent = JSON.stringify(data, null, 2);
    } catch {
      out.textContent = "NO ES JSON. Primeros 400 chars:\n\n" + head;
    }
  } catch (e) {
    estado.textContent = "Fallo de red / CORS";
    out.textContent = e.message;
  }
}

main();
