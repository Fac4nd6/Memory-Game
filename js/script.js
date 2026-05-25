const tablero = document.querySelector("#tablero");
const datos = document.querySelector("#datos");

let primeraCarta = null;
let segundaCarta = null;

let score = 0;
let movimientos = 0;
let tiempo = 0;

let bloqueado = false;

// --------------------
// TEXTOS
// --------------------

const textoScore = document.createElement("p");
textoScore.textContent = "Score: 0";

const textoMovimientos = document.createElement("p");
textoMovimientos.textContent = "Movimientos: 0";

const textoTiempo = document.createElement("p");
textoTiempo.textContent = "Tiempo: 00:00";

datos.appendChild(textoTiempo);
datos.appendChild(textoScore);
datos.appendChild(textoMovimientos);

// --------------------
// CARTAS
// --------------------

let cartas = [
    "estrella", "estrella",
    "corazon", "corazon",
    "cuadrado", "cuadrado",
    "circulo", "circulo",
    "triangulo", "triangulo",
    "rombo", "rombo",
    "estrella", "estrella",
    "corazon", "corazon",
    "cuadrado", "cuadrado"
];

// MEZCLAR CARTAS
cartas.sort(() => Math.random() - 0.5);

// --------------------
// CREAR CARTAS
// --------------------

cartas.forEach(element => {

    let carta = document.createElement("div");

    carta.dataset.imagen = element;

    carta.classList.add("carta");

    // carta tapada
    carta.style.backgroundImage =
        "url(./img/reverso.png)";

    tablero.appendChild(carta);

    carta.addEventListener("click", () => {

        // evitar bugs
        if (bloqueado) return;

        // evitar tocar la misma carta
        if (carta === primeraCarta) return;

        // evitar tocar cartas ya ganadas
        if (carta.classList.contains("encontrada")) return;

        // mostrar imagen
        let girar = carta.dataset.imagen;

        carta.style.backgroundImage =
            "url(./img/" + girar + ".png)";

        // --------------------
        // PRIMER CLICK
        // --------------------

        if (primeraCarta === null) {

            primeraCarta = carta;

        }

        // --------------------
        // SEGUNDO CLICK
        // --------------------

        else if (segundaCarta === null) {

            segundaCarta = carta;

            movimientos++;

            textoMovimientos.textContent =
                "Movimientos: " + movimientos;

            // --------------------
            // COMPARAR
            // --------------------

            if (
                primeraCarta.dataset.imagen ===
                segundaCarta.dataset.imagen
            ) {

                score++;

                textoScore.textContent =
                    "Score: " + score;

                // marcar como encontradas
                primeraCarta.classList.add("encontrada");
                segundaCarta.classList.add("encontrada");

                primeraCarta = null;
                segundaCarta = null;

            } else {

                bloqueado = true;

                setTimeout(() => {

                    primeraCarta.style.backgroundImage =
                        "url(./img/reverso.png)";

                    segundaCarta.style.backgroundImage =
                        "url(./img/reverso.png)";

                    primeraCarta = null;
                    segundaCarta = null;

                    bloqueado = false;

                }, 1000);

            }

        }

    });

});

// --------------------
// TIEMPO
// --------------------

setInterval(() => {

    tiempo++;

    let minutos =
        Math.floor(tiempo / 60);

    let segundos =
        tiempo % 60;

    // agregar 0 adelante
    minutos = String(minutos).padStart(2, "0");

    segundos = String(segundos).padStart(2, "0");

    textoTiempo.textContent =
        "Tiempo: " + minutos + ":" + segundos;

}, 1000);