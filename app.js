const API = "https://shakdows.app.n8n.cloud/webhook/alquiler-admin?action=resumen";

async function main() {
  const estado = document.getElementById("estado");
  const out = document.getElementById("out");

  try {
    const res = await fetch(API, { method: "GET" });

    // 👇 AQUÍ VA LO QUE PREGUNTAS
    const text = await res.text();
    estado.textContent = `HTTP ${res.status} ${res.statusText}`;

    // si la respuesta está vacía
    if (!text) {
      out.textContent = "(Respuesta vacía desde n8n)";
      return;
    }

    // intentar parsear JSON
    try {
      const data = JSON.parse(text);
      out.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      out.textContent =
        "NO ES JSON. Respuesta recibida:\n\n" + text.slice(0, 500);
    }

  } catch (e) {
    estado.textContent = "Error de red / CORS";
    out.textContent = e.message;
  }
}

main();
