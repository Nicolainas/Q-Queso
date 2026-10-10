/* q'Queso · Lógica del carrito (no hace falta tocar este archivo) */
(function () {
  "use strict";

  const CLAVE = "qqueso-carrito";
  const PASO_KG = 0.25; // se vende de a 250 g

  const $ = (id) => document.getElementById(id);
  const moneda = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const numero = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const porId = new Map(PRODUCTOS.map((p) => [p.id, p]));
  let carrito = cargar();
  let filtro = "Todos";

  /* ---------- Persistencia (el pedido sobrevive a recargar la página) ---------- */
  function cargar() {
    try {
      const guardado = JSON.parse(localStorage.getItem(CLAVE)) || {};
      const limpio = {};
      for (const id in guardado) {
        if (porId.has(id) && porId.get(id).disponible !== false && guardado[id] > 0) limpio[id] = guardado[id];
      }
      return limpio;
    } catch (e) { return {}; }
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(carrito)); } catch (e) { /* modo privado */ }
  }

  /* ---------- Formato ---------- */
  const paso = (p) => (p.unidad === "kg" ? PASO_KG : 1);

  function textoCantidad(p, cant) {
    if (p.unidad === "kg") {
      return cant < 1 ? `${Math.round(cant * 1000)} g` : `${numero.format(cant)} kg`;
    }
    return cant === 1 ? "1 unidad" : `${cant} unidades`;
  }
  const textoPrecio = (p) => `${moneda.format(p.precio)} / ${p.unidad === "kg" ? "kg" : "unidad"}`;
  const subtotal = (p, cant) => p.precio * cant;

  /* ---------- Cambios ---------- */
  function cambiar(id, delta) {
    const p = porId.get(id);
    if (!p || p.disponible === false) return;
    const nueva = Math.max(0, (carrito[id] || 0) + delta * paso(p));
    if (nueva === 0) delete carrito[id]; else carrito[id] = nueva;
    guardar();
    renderTodo();
  }

  /* ---------- Render: filtros y catálogo ---------- */
  function renderFiltros() {
    const cats = ["Todos", ...new Set(PRODUCTOS.map((p) => p.categoria))];
    $("filtros").innerHTML = cats.map((c) =>
      `<button type="button" class="filtro" data-cat="${esc(c)}" aria-pressed="${c === filtro}">${esc(c)}</button>`
    ).join("");
  }

  function renderCatalogo() {
    const visibles = PRODUCTOS.filter((p) => filtro === "Todos" || p.categoria === filtro);
    if (!visibles.length) {
      $("lista").innerHTML = `<p class="vacio">No hay productos en esta categoría por ahora.</p>`;
      return;
    }
    $("lista").innerHTML = visibles.map((p) => {
      const cant = carrito[p.id] || 0;
      const agotado = p.disponible === false;
      let control;
      if (agotado) {
        control = `<span class="agotado">Sin stock</span>`;
      } else if (cant === 0) {
        control = `<button type="button" class="agregar" data-id="${esc(p.id)}" data-delta="1">Agregar</button>`;
      } else {
        control = `
          <div class="cantidad" role="group" aria-label="Cantidad de ${esc(p.nombre)}">
            <button type="button" data-id="${esc(p.id)}" data-delta="-1" aria-label="Quitar">−</button>
            <span>${esc(textoCantidad(p, cant))}</span>
            <button type="button" data-id="${esc(p.id)}" data-delta="1" aria-label="Agregar más">+</button>
          </div>`;
      }
      return `
        <article class="producto-item${agotado ? " es-agotado" : ""}">
          <div class="info">
            <h3>${esc(p.nombre)}</h3>
            ${p.descripcion ? `<p>${esc(p.descripcion)}</p>` : ""}
            <span class="precio">${esc(textoPrecio(p))}</span>
          </div>
          <div class="accion">${control}</div>
        </article>`;
    }).join("");
  }

  /* ---------- Render: carrito ---------- */
  function totales() {
    let total = 0, cantidad = 0;
    for (const id in carrito) { total += subtotal(porId.get(id), carrito[id]); cantidad++; }
    return { total, cantidad };
  }

  function renderCarrito() {
    const ids = Object.keys(carrito);
    const { total, cantidad } = totales();

    $("items").innerHTML = ids.length
      ? ids.map((id) => {
          const p = porId.get(id), c = carrito[id];
          return `
            <div class="linea">
              <div>
                <strong>${esc(p.nombre)}</strong>
                <span>${esc(textoCantidad(p, c))}</span>
              </div>
              <div class="linea-der">
                <span>${moneda.format(subtotal(p, c))}</span>
                <button type="button" class="quitar" data-id="${esc(id)}" data-quitar="1" aria-label="Quitar ${esc(p.nombre)}">×</button>
              </div>
            </div>`;
        }).join("")
      : `<p class="vacio">Todavía no agregaste nada.</p>`;

    $("total").textContent = moneda.format(total);
    $("total-fila").hidden = !ids.length;
    $("datos").hidden = !ids.length;

    // Barra inferior (celular)
    $("barra").hidden = !ids.length;
    $("barra-cant").textContent = cantidad === 1 ? "1 producto" : `${cantidad} productos`;
    $("barra-total").textContent = moneda.format(total);
  }

  function renderTodo() { renderCatalogo(); renderCarrito(); }

  /* ---------- Mensaje de WhatsApp ---------- */
  function armarMensaje() {
    const nombre = $("nombre").value.trim();
    const nota = $("nota").value.trim();
    const { total } = totales();

    const lineas = Object.keys(carrito).map((id) => {
      const p = porId.get(id), c = carrito[id];
      return `• ${p.nombre}: ${textoCantidad(p, c)} (${moneda.format(subtotal(p, c))})`;
    });

    const partes = [
      `Hola ${CONFIG.negocio}! Quiero hacer este pedido:`,
      "",
      ...lineas,
      "",
      `Total estimado: ${moneda.format(total)}`,
    ];
    if (nombre) partes.push(`Nombre: ${nombre}`);
    if (nota) partes.push(`Aclaraciones: ${nota}`);
    return partes.join("\n");
  }

  function enviar() {
    if (!Object.keys(carrito).length) return;
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(armarMensaje())}`;
    window.open(url, "_blank", "noopener");
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;

    if (b.dataset.cat) {
      filtro = b.dataset.cat;
      renderFiltros();
      renderCatalogo();
    } else if (b.dataset.quitar) {
      delete carrito[b.dataset.id];
      guardar();
      renderTodo();
    } else if (b.dataset.delta) {
      cambiar(b.dataset.id, Number(b.dataset.delta));
    }
  });

  $("enviar").addEventListener("click", enviar);
  $("vaciar").addEventListener("click", () => {
    if (confirm("¿Vaciar todo el pedido?")) { carrito = {}; guardar(); renderTodo(); }
  });

  renderFiltros();
  renderTodo();
})();
