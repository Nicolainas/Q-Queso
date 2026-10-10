const CONFIG = {

  whatsapp: "5493404437353",
  negocio: "q'Queso",

  // Cartel que aparece al elegir una categoría SE PUEDE BORRAR
  avisos: {
    "Fiambres": "Los fiambres por kg se venden solo enteros o por mitad. El total es estimado y lo confirmamos al preparar tu pedido.",
  },
};

/* 
Instrucciones por si lo usa papa

cada producto:
   id           → único y no se cambia,es unico
   nombre       → lo que ve el cliente
   marca        → la marca. Si no tiene, borrá el campo
   categoria    → "Quesos", "Fiambres", "Lácteos", "Pastas", "Snacks" SE PUEDE CREAR OTRA PQ LO PROGRAMÉ
   precio       → número, sin signo y sin puntos (ej: 12500)
   unidad       → "kg" (se vende por peso de a 250 g) o "unidad"
   nuevo        → se pone true para mostrar la etiqueta "Nuevo" 
   disponible   → se pone false para mostrarlo como "Sin stock", para poner para vender solo dejás true
*/

const PRODUCTOS = [
  // ---- los quesos ----
  { id: "queso-cremoso-carassai", nombre: "Queso cremoso", marca: "Carassai", categoria: "Quesos", precio: 8100, unidad: "kg", disponible: true },
  { id: "queso-cremoso-ricolact", nombre: "Queso cremoso", marca: "Ricolact", categoria: "Quesos", precio: 8400, unidad: "kg", disponible: true },
  { id: "queso-cremoso-la-paulina", nombre: "Queso cremoso", marca: "La Paulina", categoria: "Quesos", precio: 10500, unidad: "kg", disponible: true },
  { id: "queso-cremoso-arroyo-cabral", nombre: "Queso cremoso", marca: "Arroyo Cabral", categoria: "Quesos", precio: 10600, unidad: "kg", disponible: true },
  { id: "queso-port-salut-ricolact", nombre: "Queso Port Salut", marca: "Ricolact", categoria: "Quesos", precio: 10400, unidad: "kg", disponible: true },
  { id: "queso-barra-tybo-ricolact", nombre: "Queso barra Tybo", marca: "Ricolact", categoria: "Quesos", precio: 11100, unidad: "kg", disponible: true },
  { id: "queso-barra-pategras-sandwich-arroyo-cabral", nombre: "Queso barra Pategras Sandwich", marca: "Arroyo Cabral", categoria: "Quesos", precio: 14100, unidad: "kg", disponible: true },
  { id: "queso-pategras-ricolact", nombre: "Queso Pategras", marca: "Ricolact", categoria: "Quesos", precio: 18600, unidad: "kg", disponible: true },
  { id: "queso-fontina-ricolact", nombre: "Queso Fontina", marca: "Ricolact", categoria: "Quesos", precio: 19300, unidad: "kg", disponible: true },
  { id: "queso-gouda-ricolact", nombre: "Queso Gouda", marca: "Ricolact", categoria: "Quesos", precio: 18600, unidad: "kg", disponible: true },
  { id: "queso-gruyerito-ricolact", nombre: "Queso Gruyerito", marca: "Ricolact", categoria: "Quesos", precio: 21400, unidad: "kg", disponible: true },
  { id: "quesito-de-campo-x-500-g-ricolact", nombre: "Quesito de campo x 500 g", marca: "Ricolact", categoria: "Quesos", precio: 9000, unidad: "unidad", disponible: true },
  { id: "queso-mini-pepato-x-500-g-ricolact", nombre: "Queso mini Pepato x 500 g", marca: "Ricolact", categoria: "Quesos", precio: 9500, unidad: "unidad", disponible: true },
  { id: "queso-mini-pepato-ahumado-x-500-g-ricolact", nombre: "Queso mini Pepato ahumado x 500 g", marca: "Ricolact", categoria: "Quesos", precio: 9500, unidad: "unidad", disponible: true },
  { id: "queso-al-pesto-1-2-horma-x-1-5-kg-ricolact", nombre: "Queso al pesto 1/2 horma x 1,5 kg", marca: "Ricolact", categoria: "Quesos", precio: 18800, unidad: "unidad", disponible: true },
  { id: "queso-saborizado-x-350-g-al-pesto", nombre: "Queso saborizado x 350 g · Al pesto", categoria: "Quesos", precio: 8500, unidad: "unidad", disponible: true },
  { id: "queso-saborizado-x-350-g-albahaca", nombre: "Queso saborizado x 350 g · Albahaca", categoria: "Quesos", precio: 8500, unidad: "unidad", disponible: true },
  { id: "queso-saborizado-x-350-g-aji", nombre: "Queso saborizado x 350 g · Ají", categoria: "Quesos", precio: 8500, unidad: "unidad", disponible: true },
  { id: "queso-saborizado-x-350-g-oregano", nombre: "Queso saborizado x 350 g · Orégano", categoria: "Quesos", precio: 8500, unidad: "unidad", disponible: true },
  { id: "queso-saborizado-x-350-g-provenzal", nombre: "Queso saborizado x 350 g · Provenzal", categoria: "Quesos", precio: 8500, unidad: "unidad", disponible: true },
  { id: "queso-saborizado-x-350-g-cebolla", nombre: "Queso saborizado x 350 g · Cebolla", categoria: "Quesos", precio: 8500, unidad: "unidad", disponible: true },
  { id: "queso-saborizado-x-350-g-ahumado", nombre: "Queso saborizado x 350 g · Ahumado", categoria: "Quesos", precio: 8500, unidad: "unidad", disponible: true },
  { id: "queso-saborizado-x-350-g-cheddar", nombre: "Queso saborizado x 350 g · Cheddar", categoria: "Quesos", precio: 8500, unidad: "unidad", disponible: true },
  { id: "provoleta-individual-x-200-g-ricolact", nombre: "Provoleta individual x 200 g", marca: "Ricolact", categoria: "Quesos", precio: 3800, unidad: "unidad", disponible: true },
  { id: "queso-azul-alloa", nombre: "Queso azul", marca: "Alloa", categoria: "Quesos", precio: 20500, unidad: "kg", disponible: true },
  { id: "queso-sardo-fresco-don-osvaldo", nombre: "Queso sardo fresco", marca: "Don Osvaldo", categoria: "Quesos", precio: 13500, unidad: "kg", disponible: true },
  { id: "queso-sardo-estacionado-arroyo-cabral", nombre: "Queso sardo estacionado", marca: "Arroyo Cabral", categoria: "Quesos", precio: 31800, unidad: "kg", disponible: true },
  { id: "queso-romanito-arroyo-cabral", nombre: "Queso romanito", marca: "Arroyo Cabral", categoria: "Quesos", precio: 31800, unidad: "kg", disponible: true },
  { id: "queso-reggianito-ricolact", nombre: "Queso reggianito", marca: "Ricolact", categoria: "Quesos", precio: 22200, unidad: "kg", disponible: true },
  { id: "queso-reggianito-arroyo-cabral", nombre: "Queso reggianito", marca: "Arroyo Cabral", categoria: "Quesos", precio: 34400, unidad: "kg", disponible: true },

  // ---- fiambres ----
  { id: "bondiola-tacural", nombre: "Bondiola", marca: "Tacural", categoria: "Fiambres", precio: 31100, unidad: "kg", disponible: true },
  { id: "bondiola-seca-las-acacias", nombre: "Bondiola seca", marca: "Las Acacias", categoria: "Fiambres", precio: 22000, unidad: "kg", disponible: true },
  { id: "jamon-crudo-mitad-tacural", nombre: "Jamón crudo (mitad)", marca: "Tacural", categoria: "Fiambres", precio: 31100, unidad: "kg", disponible: true },
  { id: "jamon-cocido-la-casona", nombre: "Jamón cocido", marca: "La Casona", categoria: "Fiambres", precio: 16700, unidad: "kg", disponible: true },
  { id: "jamon-cocido-san-roman", nombre: "Jamón cocido", marca: "San Román", categoria: "Fiambres", precio: 11800, unidad: "kg", disponible: true },
  { id: "jamon-cocido-natural-tacural", nombre: "Jamón cocido natural", marca: "Tacural", categoria: "Fiambres", precio: 19900, unidad: "kg", disponible: true },
  { id: "paleta-cocida-la-casona", nombre: "Paleta cocida", marca: "La Casona", categoria: "Fiambres", precio: 12000, unidad: "kg", disponible: true },
  { id: "paleta-cocida-tacural", nombre: "Paleta cocida", marca: "Tacural", categoria: "Fiambres", precio: 11600, unidad: "kg", disponible: true },
  { id: "paleta-cocida-san-roman", nombre: "Paleta cocida", marca: "San Román", categoria: "Fiambres", precio: 9600, unidad: "kg", disponible: true },
  { id: "mortadela-tipo-bologna-la-casona", nombre: "Mortadela tipo Bologna", marca: "La Casona", categoria: "Fiambres", precio: 8900, unidad: "kg", disponible: true },
  { id: "mortadela-cilindro-la-residencia", nombre: "Mortadela cilindro", marca: "La Residencia", categoria: "Fiambres", precio: 7100, unidad: "kg", disponible: true },
  { id: "mortadela-tipo-bologna-familiar-x-300-g-la-casona", nombre: "Mortadela tipo Bologna familiar x 300 g", marca: "La Casona", categoria: "Fiambres", precio: 4700, unidad: "unidad", disponible: true },
  { id: "panceta-arrollada-tacural", nombre: "Panceta arrollada", marca: "Tacural", categoria: "Fiambres", precio: 38500, unidad: "kg", disponible: true },
  { id: "panceta-salada-tacural", nombre: "Panceta salada", marca: "Tacural", categoria: "Fiambres", precio: 27500, unidad: "kg", disponible: true },
  { id: "panceta-ahumada-tacural", nombre: "Panceta ahumada", marca: "Tacural", categoria: "Fiambres", precio: 27500, unidad: "kg", disponible: true },
  { id: "lomo-a-las-finas-hierbas-tacural", nombre: "Lomo a las finas hierbas", marca: "Tacural", categoria: "Fiambres", precio: 23000, unidad: "kg", disponible: true },
  { id: "salame-milan-la-casona", nombre: "Salame Milán", marca: "La Casona", categoria: "Fiambres", precio: 20800, unidad: "kg", disponible: true },
  { id: "salchichon-primavera-familiar-x-300-g-la-casona", nombre: "Salchichón primavera familiar x 300 g", marca: "La Casona", categoria: "Fiambres", precio: 5000, unidad: "unidad", disponible: true },
  { id: "salchicha-cocida-sin-piel-x-6-la-casona", nombre: "Salchicha cocida sin piel x 6", marca: "La Casona", categoria: "Fiambres", precio: 1350, unidad: "unidad", disponible: true },

  // ---- los lácteos ----
  { id: "manteca-x-200-g-ricolact", nombre: "Manteca x 200 g", marca: "Ricolact", categoria: "Lácteos", precio: 2900, unidad: "unidad", disponible: true },
  { id: "crema-x-350-g-brescia-lat", nombre: "Crema x 350 g", marca: "Brescia-Lat", categoria: "Lácteos", precio: 4123, unidad: "unidad", disponible: true },
  { id: "crema-de-leche-pouch-x-3-l-ricolact", nombre: "Crema de leche pouch x 3 L", marca: "Ricolact", categoria: "Lácteos", precio: 26200, unidad: "unidad", disponible: true },
  { id: "queso-untable-x-190-g-tybo", nombre: "Queso untable x 190 g · Tybo", categoria: "Lácteos", precio: 2300, unidad: "unidad", disponible: true },
  { id: "queso-untable-x-190-g-azul", nombre: "Queso untable x 190 g · Azul", categoria: "Lácteos", precio: 2300, unidad: "unidad", disponible: true },
  { id: "queso-untable-x-190-g-salame", nombre: "Queso untable x 190 g · Salame", categoria: "Lácteos", precio: 2300, unidad: "unidad", disponible: true },
  { id: "queso-untable-x-190-g-jamon", nombre: "Queso untable x 190 g · Jamón", categoria: "Lácteos", precio: 2300, unidad: "unidad", disponible: true },
  { id: "queso-untable-x-190-g-gruyere", nombre: "Queso untable x 190 g · Gruyere", categoria: "Lácteos", precio: 2300, unidad: "unidad", disponible: true },
  { id: "dulce-de-leche-familiar-x-500-g-estilo-real", nombre: "Dulce de leche familiar x 500 g", marca: "Estilo Real", categoria: "Lácteos", precio: 3100, unidad: "unidad", disponible: true },
  { id: "dulce-de-leche-familiar-x-1-kg-estilo-real", nombre: "Dulce de leche familiar x 1 kg", marca: "Estilo Real", categoria: "Lácteos", precio: 5900, unidad: "unidad", disponible: true },
  { id: "dulce-de-leche-repostero-x-1-kg-estilo-real", nombre: "Dulce de leche repostero x 1 kg", marca: "Estilo Real", categoria: "Lácteos", precio: 6300, unidad: "unidad", disponible: true },

  // ---- pastas ----
  { id: "tapas-p-empanadas-criollas-x-12-orali", nombre: "Tapas p/ empanadas criollas x 12", marca: "Oralí", categoria: "Pastas", precio: 2100, unidad: "unidad", disponible: true },
  { id: "tapas-p-empanadas-hojaldre-x-12-orali", nombre: "Tapas p/ empanadas hojaldre x 12", marca: "Oralí", categoria: "Pastas", precio: 2100, unidad: "unidad", disponible: true },
  { id: "tapas-p-empanadas-para-freir-x-12-orali", nombre: "Tapas p/ empanadas para freír x 12", marca: "Oralí", categoria: "Pastas", precio: 2100, unidad: "unidad", disponible: true },
  { id: "tapas-p-pascualina-criolla-x-2-orali", nombre: "Tapas p/ pascualina criolla x 2", marca: "Oralí", categoria: "Pastas", precio: 2950, unidad: "unidad", disponible: true },
  { id: "tapas-p-pascualina-hojaldre-x-2-orali", nombre: "Tapas p/ pascualina hojaldre x 2", marca: "Oralí", categoria: "Pastas", precio: 2950, unidad: "unidad", disponible: true },
  { id: "fetuccine-fino-x-500-g-orali", nombre: "Fetuccine fino x 500 g", marca: "Oralí", categoria: "Pastas", precio: 3350, unidad: "unidad", disponible: true },
  { id: "fetuccine-medio-x-500-g-orali", nombre: "Fetuccine medio x 500 g", marca: "Oralí", categoria: "Pastas", precio: 3350, unidad: "unidad", disponible: true },
  { id: "fetuccine-ancho-x-500-g-orali", nombre: "Fetuccine ancho x 500 g", marca: "Oralí", categoria: "Pastas", precio: 3350, unidad: "unidad", disponible: true },
  { id: "noquis-de-trigo-x-500-g-orali", nombre: "Ñoquis de trigo x 500 g", marca: "Oralí", categoria: "Pastas", precio: 3600, unidad: "unidad", disponible: true },
  { id: "tortillas-de-trigo-x-6-orali", nombre: "Tortillas de trigo x 6", marca: "Oralí", categoria: "Pastas", precio: 2400, unidad: "unidad", disponible: true },
  { id: "ravioles-x-500-g-pollo-orali", nombre: "Ravioles x 500 g · Pollo", marca: "Oralí", categoria: "Pastas", precio: 2900, unidad: "unidad", disponible: true },
  { id: "ravioles-x-500-g-ricota-orali", nombre: "Ravioles x 500 g · Ricota", marca: "Oralí", categoria: "Pastas", precio: 2900, unidad: "unidad", disponible: true },
  { id: "ravioles-x-500-g-espinaca-orali", nombre: "Ravioles x 500 g · Espinaca", marca: "Oralí", categoria: "Pastas", precio: 2900, unidad: "unidad", disponible: true },
  { id: "ravioles-x-500-g-carne-y-espinaca-orali", nombre: "Ravioles x 500 g · Carne y espinaca", marca: "Oralí", categoria: "Pastas", precio: 2900, unidad: "unidad", disponible: true },
  { id: "ravioles-x-500-g-4-quesos-orali", nombre: "Ravioles x 500 g · 4 quesos", marca: "Oralí", categoria: "Pastas", precio: 2900, unidad: "unidad", disponible: true },
  { id: "capellettis-carne-y-espinaca-x-500-g-orali", nombre: "Capellettis carne y espinaca x 500 g", marca: "Oralí", categoria: "Pastas", precio: 4450, unidad: "unidad", disponible: true },
  { id: "sorrentinos-4-quesos-x-500-g-orali", nombre: "Sorrentinos 4 quesos x 500 g", marca: "Oralí", categoria: "Pastas", precio: 4100, unidad: "unidad", nuevo: true, disponible: true },
  { id: "sorrentinos-ricota-y-espinaca-x-500-g-orali", nombre: "Sorrentinos ricota y espinaca x 500 g", marca: "Oralí", categoria: "Pastas", precio: 4100, unidad: "unidad", nuevo: true, disponible: true },
  { id: "sorrentinos-calabaza-y-mozzarella-x-500-g-orali", nombre: "Sorrentinos calabaza y mozzarella x 500 g", marca: "Oralí", categoria: "Pastas", precio: 5700, unidad: "unidad", nuevo: true, disponible: true },
  { id: "tapas-p-empanadas-x-12-sin-tacc-orali", nombre: "Tapas p/ empanadas x 12 (sin TACC)", marca: "Oralí", categoria: "Pastas", precio: 3800, unidad: "unidad", disponible: true },
  { id: "tapas-p-pascualina-x-2-sin-tacc-orali", nombre: "Tapas p/ pascualina x 2 (sin TACC)", marca: "Oralí", categoria: "Pastas", precio: 4500, unidad: "unidad", disponible: true },

  // ---- snacks ----
  { id: "papas-fritas-corte-espanol-x-63-g-good-show", nombre: "Papas fritas corte español x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-fritas-sabor-huevo-frito-x-63-g-good-show", nombre: "Papas fritas sabor huevo frito x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-fritas-sabor-pimienta-negra-y-sal-marina-x-63-g-good-show", nombre: "Papas fritas sabor pimienta negra y sal marina x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-fritas-sabor-crema-y-cebolla-x-63-g-good-show", nombre: "Papas fritas sabor crema y cebolla x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-fritas-sabor-ketchup-x-63-g-good-show", nombre: "Papas fritas sabor ketchup x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-fritas-sabor-jamon-serrano-x-63-g-good-show", nombre: "Papas fritas sabor jamón serrano x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-fritas-sabor-cheddar-x-63-g-good-show", nombre: "Papas fritas sabor cheddar x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-fritas-rusticas-x-93-g-good-show", nombre: "Papas fritas rústicas x 93 g", marca: "Good Show", categoria: "Snacks", precio: 2800, unidad: "unidad", disponible: true },
  { id: "papas-fritas-sin-sal-x-93-g-good-show", nombre: "Papas fritas sin sal x 93 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-fritas-corte-americano-x-63-g-good-show", nombre: "Papas fritas corte americano x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "papas-pay-x-60-g-good-show", nombre: "Papas pay x 60 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "conitos-sabor-queso-x-63-g-good-show", nombre: "Conitos sabor queso x 63 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "chizitos-sabor-queso-x-65-g-good-show", nombre: "Chizitos sabor queso x 65 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "rolls-sabor-queso-x-120-g-good-show", nombre: "Rolls sabor queso x 120 g", marca: "Good Show", categoria: "Snacks", precio: 2800, unidad: "unidad", disponible: true },
  { id: "palitos-salados-x-93-g-good-show", nombre: "Palitos salados x 93 g", marca: "Good Show", categoria: "Snacks", precio: 2000, unidad: "unidad", disponible: true },
  { id: "mani-repelado-salado-x-140-g-good-show", nombre: "Maní repelado salado x 140 g", marca: "Good Show", categoria: "Snacks", precio: 2800, unidad: "unidad", disponible: true },
];
