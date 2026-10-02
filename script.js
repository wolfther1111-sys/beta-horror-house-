let btnComenzar;
let btnReiniciar;
let btnReintentar;

let inicio;
let juego;
let victoria;
let derrota;

let vidaTexto;
let bateriaTexto;

let ubicacion;
let texto;
let mensaje;

let inventarioTexto;
let fantasma;

let botonesAccion;

let vida = 100;
let bateria = 100;
let llaveEncontrada = false;
let velaEncontrada = false;
let puertaRevisada = false;
let juegoActivo = false;
let acciones = 0;
let fantasmaVisible = false;

/* =========================
INICIALIZAR JUEGO
========================= */

function inicializarJuego() {

```
btnComenzar = document.getElementById("btnComenzar");
btnReiniciar = document.getElementById("btnReiniciar");
btnReintentar = document.getElementById("btnReintentar");

inicio = document.getElementById("inicio");
juego = document.getElementById("juego");
victoria = document.getElementById("victoria");
derrota = document.getElementById("derrota");

vidaTexto = document.getElementById("vida");
bateriaTexto = document.getElementById("bateria");

ubicacion = document.getElementById("ubicacion");
texto = document.getElementById("texto");
mensaje = document.getElementById("mensaje");

inventarioTexto = document.getElementById("inventarioTexto");
fantasma = document.getElementById("fantasma");

if (
    !btnComenzar ||
    !btnReiniciar ||
    !btnReintentar ||
    !inicio ||
    !juego ||
    !victoria ||
    !derrota ||
    !vidaTexto ||
    !bateriaTexto ||
    !ubicacion ||
    !texto ||
    !mensaje ||
    !inventarioTexto ||
    !fantasma
) {
    console.error("No se encontraron todos los elementos del juego.");
    return;
}

botonesAccion = document.querySelectorAll(".accion");

btnComenzar.addEventListener("click", iniciarJuego);

botonesAccion.forEach((boton) => {

    boton.addEventListener("click", () => {

        if (!juegoActivo) {
            return;
        }

        gastarBateria();

        if (!juegoActivo) {
            return;
        }

        acciones++;

        const accion = boton.dataset.accion;

        switch (accion) {

            case "explorar":
                explorar();
                break;

            case "puerta":
                revisarPuerta();
                break;

            case "ventana":
                mirarVentana();
                break;

            case "objeto":
                buscarObjeto();
                break;
        }

        eventoAleatorio();
        actualizarEstado();
    });

});


btnReiniciar.addEventListener("click", () => {

    victoria.classList.add("oculto");
    iniciarJuego();

});


btnReintentar.addEventListener("click", () => {

    derrota.classList.add("oculto");
    iniciarJuego();

});
```

}

/* =========================
MENSAJES
========================= */

const mensajesExploracion = [
"Escuchas un ruido en alguna parte de la casa.",
"El suelo cruje debajo de tus pies.",
"Algo parece haberse movido detrás de ti.",
"El silencio de la casa resulta inquietante.",
"Una corriente de aire helado pasa junto a ti.",
"Escuchas tres golpes provenientes de la pared."
];

const mensajesVentana = [
"La ventana está cubierta de suciedad.",
"La luna ilumina brevemente la habitación.",
"Por un instante crees ver una figura afuera.",
"No hay nadie afuera... ¿o sí?",
"Algo parece estar observándote desde el exterior."
];

const mensajesObjeto = [
"Encuentras una vieja caja vacía.",
"Hay polvo por todas partes.",
"Encuentras una vela casi consumida.",
"Debajo de unas tablas encuentras algo metálico.",
"Encuentras una pequeña llave oxidada."
];

/* =========================
INICIAR JUEGO
========================= */

function iniciarJuego() {

```
inicio.classList.add("oculto");
victoria.classList.add("oculto");
derrota.classList.add("oculto");

juego.classList.remove("oculto");

vida = 100;
bateria = 100;

llaveEncontrada = false;
velaEncontrada = false;
puertaRevisada = false;

acciones = 0;
fantasmaVisible = false;

fantasma.classList.remove("visible");

actualizarEstado();

ubicacion.textContent = "Entrada";

texto.textContent =
    "La puerta se cierra detrás de ti. Hace frío... demasiado frío.";

mensaje.textContent = "";

inventarioTexto.textContent = "Vacío";

juegoActivo = true;
```

}

/* =========================
EXPLORAR
========================= */

function explorar() {

```
ubicacion.textContent = "Pasillo";

const mensajeAleatorio =
    mensajesExploracion[
        Math.floor(Math.random() * mensajesExploracion.length)
    ];

texto.textContent = mensajeAleatorio;

mensaje.textContent = "";

if (Math.random() < 0.25) {

    perderVida(5);

    mensaje.textContent =
        "Algo te roza la espalda...";
}
```

}

/* =========================
PUERTA
========================= */

function revisarPuerta() {

```
ubicacion.textContent = "Puerta principal";

if (!puertaRevisada) {

    puertaRevisada = true;

    texto.textContent =
        "La puerta está cerrada. Hay una cerradura antigua. Necesitas una llave.";

    mensaje.textContent =
        "Debe haber una llave en alguna parte...";

    return;
}


if (llaveEncontrada) {

    texto.textContent =
        "Introduces la llave en la cerradura. La puerta comienza a abrirse lentamente.";

    mensaje.textContent =
        "¡Has encontrado la salida!";

    setTimeout(() => {
        ganarJuego();
    }, 1500);

    return;
}


texto.textContent =
    "La puerta sigue cerrada. Necesitas encontrar una llave.";

mensaje.textContent =
    "Busca cuidadosamente por la casa.";
```

}

/* =========================
VENTANA
========================= */

function mirarVentana() {

```
ubicacion.textContent = "Ventana";

const mensajeAleatorio =
    mensajesVentana[
        Math.floor(Math.random() * mensajesVentana.length)
    ];

texto.textContent = mensajeAleatorio;

if (Math.random() < 0.4) {

    mostrarFantasma();

    mensaje.textContent =
        "¡Hay algo detrás de la ventana!";

    perderVida(10);

} else {

    mensaje.textContent = "";
}
```

}

/* =========================
BUSCAR OBJETOS
========================= */

function buscarObjeto() {

```
ubicacion.textContent = "Habitación";

if (!velaEncontrada) {

    velaEncontrada = true;

    texto.textContent =
        "Encuentras una vela vieja. Su luz podría ayudarte a ver mejor.";

    mensaje.textContent =
        "Has encontrado: 🕯️ Vela";

    actualizarInventario();

    return;
}


if (!llaveEncontrada) {

    llaveEncontrada = true;

    texto.textContent =
        "Debajo de la vela encuentras una pequeña llave oxidada.";

    mensaje.textContent =
        "Has encontrado: 🔑 Llave";

    actualizarInventario();

    return;
}


texto.textContent =
    mensajesObjeto[
        Math.floor(Math.random() * mensajesObjeto.length)
    ];

mensaje.textContent = "";
```

}

/* =========================
INVENTARIO
========================= */

function actualizarInventario() {

```
const objetos = [];

if (velaEncontrada) {
    objetos.push("🕯️ Vela");
}

if (llaveEncontrada) {
    objetos.push("🔑 Llave");
}

inventarioTexto.textContent =
    objetos.length > 0
        ? objetos.join(" | ")
        : "Vacío";
```

}

/* =========================
BATERÍA
========================= */

function gastarBateria() {

```
bateria -= 4;

if (bateria < 0) {
    bateria = 0;
}


if (bateria <= 20) {

    mensaje.textContent =
        "La linterna está a punto de quedarse sin batería...";
}


if (bateria === 0) {

    texto.textContent =
        "La linterna se apaga. Ahora estás completamente a oscuras.";

    mostrarFantasma();

    perderVida(15);
}
```

}

/* =========================
VIDA
========================= */

function perderVida(cantidad) {

```
vida -= cantidad;

if (vida < 0) {
    vida = 0;
}

actualizarEstado();

if (vida <= 0) {
    perderJuego();
}
```

}

/* =========================
ACTUALIZAR ESTADO
========================= */

function actualizarEstado() {

```
vidaTexto.textContent = vida;
bateriaTexto.textContent = bateria;

if (vida <= 30) {
    vidaTexto.style.color = "#ff0000";
} else {
    vidaTexto.style.color = "";
}


if (bateria <= 20) {
    bateriaTexto.style.color = "#ff0000";
} else {
    bateriaTexto.style.color = "";
}
```

}

/* =========================
FANTASMA
========================= */

function mostrarFantasma() {

```
if (fantasmaVisible) {
    return;
}

fantasmaVisible = true;

fantasma.classList.add("visible");

setTimeout(() => {

    fantasma.classList.remove("visible");

    fantasmaVisible = false;

}, 3000);
```

}

/* =========================
EVENTOS ALEATORIOS
========================= */

function eventoAleatorio() {

```
const probabilidad = Math.random();

if (probabilidad < 0.12) {

    mostrarFantasma();

    mensaje.textContent =
        "Sientes que alguien te está observando.";

    perderVida(5);

} else if (probabilidad < 0.22) {

    mensaje.textContent =
        "Escuchas pasos acercándose lentamente...";

    perderVida(3);

} else if (probabilidad < 0.28) {

    document.body.classList.add("parpadeo");

    setTimeout(() => {

        document.body.classList.remove("parpadeo");

    }, 700);
}
```

}

/* =========================
VICTORIA
========================= */

function ganarJuego() {

```
juegoActivo = false;

juego.classList.add("oculto");

victoria.classList.remove("oculto");
```

}

/* =========================
DERROTA
========================= */

function perderJuego() {

```
juegoActivo = false;

juego.classList.add("oculto");

derrota.classList.remove("oculto");
```

}

/* =========================
EFECTO DE TERROR
========================= */

setInterval(() => {

```
if (!juegoActivo) {
    return;
}

if (Math.random() < 0.15) {

    document.body.classList.add("parpadeo");

    setTimeout(() => {

        document.body.classList.remove("parpadeo");

    }, 120);
}
```

}, 5000);

/* =========================
CARGAR JUEGO
========================= */

if (document.readyState === "loading") {

```
document.addEventListener(
    "DOMContentLoaded",
    inicializarJuego
);
```

} else {

```
inicializarJuego();
```

}
