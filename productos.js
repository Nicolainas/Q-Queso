const CONFIG = {
  // Número de WhatsApp: código de país + área + número, sin "+" ni espacios.
  // Argentina celular: 549 + área sin 0 + número sin 15. Ej: 5493415551234
  whatsapp: "5493404437353",
  negocio: "q'Queso",
};

/* cada producto:
   id           → para identificar el producto
   nombre       → lo que ve el cliente
   precio       → número, sin signo ni puntos (ej: 12500)
   modo de compra  → podemos poner por unidad o por kilo
   descripcion  → opcional
   disponible   →  poner true/false
*/

const PRODUCTOS = [
  // ---- quesos ----
  { id: "queso-cremoso",  nombre: "Queso cremoso",   categoria: "Quesos", precio: 9800,  unidad: "kg", descripcion: "Suave y fundente, ideal para pizzas y tostados.", disponible: true },
  { id: "queso-sardo",    nombre: "Queso sardo",     categoria: "Quesos", precio: 13500, unidad: "kg", descripcion: "Semiduro, de sabor intenso.", disponible: true },
  { id: "queso-provolone",nombre: "Provolone",       categoria: "Quesos", precio: 14200, unidad: "kg", descripcion: "Para la parrilla o la tabla.", disponible: true },

  // ---- embutidos ----
  { id: "salame-milan",   nombre: "Salame tipo Milán", categoria: "Embutidos", precio: 16000, unidad: "kg", descripcion: "Picado fino, curado natural.", disponible: true },
  { id: "longaniza",      nombre: "Longaniza",       categoria: "Embutidos", precio: 15000, unidad: "kg", descripcion: "Seca, ideal para picadas.", disponible: true },

  // ---- los fiambres ----
  { id: "jamon-cocido",   nombre: "Jamón cocido",    categoria: "Fiambres", precio: 12000, unidad: "kg", descripcion: "Fileteado al momento.", disponible: true },
  { id: "bondiola",       nombre: "Bondiola",        categoria: "Fiambres", precio: 17500, unidad: "kg", descripcion: "Curada, en fetas finas.", disponible: false },
  { id: "picada-chica",   nombre: "Picada para 4",   categoria: "Fiambres", precio: 18000, unidad: "unidad", descripcion: "Selección de quesos y fiambres.", disponible: true },

  { id: "tapa-empanada",   nombre: "Tapas De Empanadas",   categoria: "Masas", precio: 18000, unidad: "unidad", descripcion: "Tapa para tus deliciosas empanadas.", disponible: true },
  { id: "tapa-tarta",   nombre: "Tapa para Tarta",   categoria: "Masas", precio: 18000, unidad: "unidad", descripcion: "Rica y de la mejor calidad.", disponible: true },
  ];
