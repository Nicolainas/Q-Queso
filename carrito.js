/* q'Queso · Lógica del carrito (no hace falta tocar este archivo) */
(function () {
  "use strict";

  const CLAVE = "qqueso-carrito";
  const PASO_KG = 0.25; // se vende de a 250 g
  const TODAS = "Todas";

  const $ = (id) => document.getElementById(id);
  const moneda = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const numero = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Para buscar sin importar mayúsculas ni tildes
  const norm = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const porId = new Map(PRODUCTOS.map((p) => [p.id, p]));
  const marcaDe = (p) => p.marca || "Otras";

  let carrito = cargar();
  let filtro = "Todos";     // categoría
  let marcaSel = TODAS;     // marca
  let busqueda = "";

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
  const nombreCompleto = (p) => (p.marca ? `${p.nombre} (${p.marca})` : p.nombre);

  /* ---------- Cambios ---------- */
  function cambiar(id, delta) {
    const p = porId.get(id);
    if (!p || p.disponible === false) return;
    const nueva = Math.max(0, (carrito[id] || 0) + delta * paso(p));
    if (nueva === 0) delete carrito[id]; else carrito[id] = nueva;
    guardar();
    renderTodo();
  }

  /* ---------- Filtros ---------- */
  function renderFiltros() {
    const cats = ["Todos", ...new Set(PRODUCTOS.map((p) => p.categoria))];
    $("filtros").innerHTML = cats.map((c) =>
      `<button type="button" class="filtro" data-cat="${esc(c)}" aria-pressed="${c === filtro}">${esc(c)}</button>`
    ).join("");
  }

  // El selector de marcas muestra solo las marcas de la categoría elegida
  function renderMarcas() {
    const delaCat = PRODUCTOS.filter((p) => filtro === "Todos" || p.categoria === filtro);
    const cuenta = new Map();
    delaCat.forEach((p) => cuenta.set(marcaDe(p), (cuenta.get(marcaDe(p)) || 0) + 1));
    const marcas = [...cuenta.keys()].sort((a, b) => a.localeCompare(b, "es"));

    if (marcaSel !== TODAS && !cuenta.has(marcaSel)) marcaSel = TODAS;

    $("marca").innerHTML =
      `<option value="${TODAS}">Todas las marcas (${marcas.length})</option>` +
      marcas.map((m) =>
        `<option value="${esc(m)}"${m === marcaSel ? " selected" : ""}>${esc(m)} (${cuenta.get(m)})</option>`
      ).join("");
    $("marca").value = marcaSel;
  }

  function visibles() {
    const q = norm(busqueda.trim());
    return PRODUCTOS.filter((p) =>
      (filtro === "Todos" || p.categoria === filtro) &&
      (marcaSel === TODAS || marcaDe(p) === marcaSel) &&
      (!q || norm([p.nombre, p.marca, p.descripcion, p.categoria].join(" ")).includes(q))
    );
  }

  /* ---------- Render: catálogo ---------- */
  function itemHTML(p, mostrarMarca) {
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
          ${mostrarMarca && p.marca ? `<span class="marca-tag">${esc(p.marca)}</span>` : ""}
          <h3>${esc(p.nombre)}${p.nuevo ? '<span class="nuevo">Nuevo</span>' : ""}</h3>
          ${p.descripcion ? `<p>${esc(p.descripcion)}</p>` : ""}
          <span class="precio">${esc(textoPrecio(p))}</span>
        </div>
        <div class="accion">${control}</div>
      </article>`;
  }

  function renderCatalogo() {
    const lista = visibles();
    const aviso = (CONFIG.avisos || {})[filtro] || "";
    $("aviso-cat").textContent = aviso;
    $("aviso-cat").hidden = !aviso;
    $("resultados").textContent = lista.length === 1 ? "1 producto" : `${lista.length} productos`;

    if (!lista.length) {
      $("lista").innerHTML = `
        <p class="vacio">No encontramos productos con esos filtros.</p>
        <button type="button" class="limpiar" data-limpiar="1">Limpiar filtros</button>`;
      return;
    }

    // Con una marca elegida: lista simple (cada producto muestra su marca arriba). Si no, se agrupa para leer más fácil:
    //   - categoría puntual → por marca (orden alfabético)
    //   - todas las categorías → por categoría
    if (marcaSel !== TODAS) {
      $("lista").innerHTML = lista.map((p) => itemHTML(p, true)).join("");
      return;
    }

    const porMarca = filtro !== "Todos";
    const grupos = new Map();
    lista.forEach((p) => {
      const k = porMarca ? marcaDe(p) : p.categoria;
      if (!grupos.has(k)) grupos.set(k, []);
      grupos.get(k).push(p);
    });
    let claves = [...grupos.keys()];
    if (porMarca) claves.sort((a, b) => a.localeCompare(b, "es"));

    $("lista").innerHTML = claves.map((k) => `
      <h2 class="grupo">${esc(k)}<small>${grupos.get(k).length}</small></h2>
      ${grupos.get(k).map((p) => itemHTML(p, !porMarca)).join("")}
    `).join("");
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
                <span>${p.marca ? esc(p.marca) + " · " : ""}${esc(textoCantidad(p, c))}</span>
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
      return `• ${nombreCompleto(p)}: ${textoCantidad(p, c)} (${moneda.format(subtotal(p, c))})`;
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
  function limpiarFiltros() {
    filtro = "Todos"; marcaSel = TODAS; busqueda = "";
    $("buscar").value = "";
    renderFiltros(); renderMarcas(); renderCatalogo();
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;

    if (b.dataset.cat) {
      filtro = b.dataset.cat;
      renderFiltros(); renderMarcas(); renderCatalogo();
    } else if (b.dataset.limpiar) {
      limpiarFiltros();
    } else if (b.dataset.quitar) {
      delete carrito[b.dataset.id];
      guardar();
      renderTodo();
    } else if (b.dataset.delta) {
      cambiar(b.dataset.id, Number(b.dataset.delta));
    }
  });

  $("marca").addEventListener("change", (e) => { marcaSel = e.target.value; renderCatalogo(); });
  $("buscar").addEventListener("input", (e) => { busqueda = e.target.value; renderCatalogo(); });

  $("enviar").addEventListener("click", enviar);
  $("vaciar").addEventListener("click", () => {
    if (confirm("¿Vaciar todo el pedido?")) { carrito = {}; guardar(); renderTodo(); }
  });

  renderFiltros();
  renderMarcas();
  renderTodo();
})();
