/* =========================
   SISTEMA DE MODAL
========================= */

function abrirModal(contenido) {

    document.getElementById("contenidoModal").innerHTML = contenido;

    document.getElementById("modal").style.display = "flex";
}


function cerrarModal() {

    document.getElementById("modal").style.display = "none";
}


/* =========================
   BUSCADOR
========================= */

function buscar() {

    let texto = document
        .getElementById("buscador")
        .value
        .toLowerCase();

    let tarjetas = document.querySelectorAll(".herramienta");

    tarjetas.forEach(function(tarjeta) {

        let contenido =
            tarjeta.innerText.toLowerCase();

        if (contenido.includes(texto)) {

            tarjeta.style.display = "block";

        } else {

            tarjeta.style.display = "none";

        }

    });
}


/* =========================
   CALCULADORA
========================= */

function abrirCalculadora() {

    let contenido = `

        <h2>🧮 Calculadora</h2>

        <div class="calculadora">

            <input
                type="text"
                id="pantalla"
                readonly
            >

            <button onclick="agregar('7')">7</button>
            <button onclick="agregar('8')">8</button>
            <button onclick="agregar('9')">9</button>
            <button onclick="agregar('/')">÷</button>

            <button onclick="agregar('4')">4</button>
            <button onclick="agregar('5')">5</button>
            <button onclick="agregar('6')">6</button>
            <button onclick="agregar('*')">×</button>

            <button onclick="agregar('1')">1</button>
            <button onclick="agregar('2')">2</button>
            <button onclick="agregar('3')">3</button>
            <button onclick="agregar('-')">−</button>

            <button onclick="agregar('0')">0</button>
            <button onclick="agregar('.')">.</button>
            <button onclick="calcular()">=</button>
            <button onclick="agregar('+')">+</button>

            <button
                onclick="limpiar()"
                style="grid-column: 1 / -1;"
            >
                C
            </button>

        </div>
    `;

    abrirModal(contenido);
}


function agregar(valor) {

    document.getElementById("pantalla").value += valor;
}


function limpiar() {

    document.getElementById("pantalla").value = "";
}


function calcular() {

    try {

        let resultado =
            Function(
                '"use strict";return (' +
                document.getElementById("pantalla").value +
                ')'
            )();

        document.getElementById("pantalla").value =
            resultado;

    } catch {

        document.getElementById("pantalla").value =
            "Error";
    }
}


/* =========================
   CONVERSOR
========================= */

function abrirConversor() {

    let contenido = `

        <h2>🔄 Conversor</h2>

        <label>Cantidad</label>

        <input
            type="number"
            id="cantidad"
            placeholder="Ejemplo: 10"
        >

        <label>Convertir</label>

        <select id="tipoConversion">

            <option value="km-millas">
                Kilómetros → Millas
            </option>

            <option value="millas-km">
                Millas → Kilómetros
            </option>

            <option value="metros-pies">
                Metros → Pies
            </option>

            <option value="pies-metros">
                Pies → Metros
            </option>

            <option value="kg-lb">
                Kilogramos → Libras
            </option>

            <option value="lb-kg">
                Libras → Kilogramos
            </option>

        </select>

        <button onclick="convertir()">
            Convertir
        </button>

        <h3 id="resultadoConversion"></h3>
    `;

    abrirModal(contenido);
}


function convertir() {

    let cantidad =
        parseFloat(
            document.getElementById("cantidad").value
        );

    let tipo =
        document.getElementById("tipoConversion").value;

    let resultado;


    if (isNaN(cantidad)) {

        document.getElementById(
            "resultadoConversion"
        ).innerText =
            "Introduce una cantidad.";

        return;
    }


    if (tipo === "km-millas") {

        resultado = cantidad * 0.621371;

    } else if (tipo === "millas-km") {

        resultado = cantidad * 1.60934;

    } else if (tipo === "metros-pies") {

        resultado = cantidad * 3.28084;

    } else if (tipo === "pies-metros") {

        resultado = cantidad * 0.3048;

    } else if (tipo === "kg-lb") {

        resultado = cantidad * 2.20462;

    } else if (tipo === "lb-kg") {

        resultado = cantidad * 0.453592;
    }


    document.getElementById(
        "resultadoConversion"
    ).innerText =
        "Resultado: " + resultado.toFixed(3);
}


/* =========================
   GENERADOR QR
========================= */

function abrirQR() {

    let contenido = `

        <h2>📱 Generador de código QR</h2>

        <p>
            Escribe un texto o enlace.
        </p>

        <input
            type="text"
            id="textoQR"
            placeholder="https://ejemplo.com"
        >

        <button onclick="crearQR()">
            Generar QR
        </button>

        <div id="qrResultado"></div>

    `;

    abrirModal(contenido);
}


function crearQR() {

    let texto =
        document.getElementById("textoQR").value;

    if (!texto) {

        alert("Escribe un texto o enlace.");

        return;
    }

    let url =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
        encodeURIComponent(texto);

    document.getElementById(
        "qrResultado"
    ).innerHTML =
        `<img src="${url}" alt="Código QR">`;
}


/* =========================
   TEMPORIZADOR
========================= */

let intervaloTemporizador;


function abrirTemporizador() {

    let contenido = `

        <h2>⏱️ Temporizador</h2>

        <input
            type="number"
            id="segundos"
            placeholder="Segundos"
            min="1"
        >

        <button onclick="iniciarTemporizador()">
            Iniciar
        </button>

        <h1
            id="reloj"
            style="text-align:center; margin:20px;"
        >
            00:00
        </h1>

    `;

    abrirModal(contenido);
}


function iniciarTemporizador() {

    clearInterval(intervaloTemporizador);

    let segundos =
        parseInt(
            document.getElementById("segundos").value
        );

    if (isNaN(segundos) || segundos <= 0) {

        alert("Introduce los segundos.");

        return;
    }


    function actualizar() {

        let minutos =
            Math.floor(segundos / 60);

        let seg =
            segundos % 60;

        document.getElementById("reloj").innerText =
            String(minutos).padStart(2, "0") +
            ":" +
            String(seg).padStart(2, "0");


        if (segundos <= 0) {

            clearInterval(intervaloTemporizador);

            alert("⏰ ¡Tiempo terminado!");

            return;
        }

        segundos--;
    }


    actualizar();

    intervaloTemporizador =
        setInterval(actualizar, 1000);
}


/* =========================
   NOTAS
========================= */

function abrirNotas() {

    let notasGuardadas =
        localStorage.getItem("utilhubNotas") || "";

    let contenido = `

        <h2>📝 Mis notas</h2>

        <textarea
            id="notas"
            placeholder="Escribe aquí..."
        >${notasGuardadas}</textarea>

        <button onclick="guardarNotas()">
            Guardar nota
        </button>

        <button
            onclick="borrarNotas()"
            style="background:#ef4444;"
        >
            Borrar
        </button>

    `;

    abrirModal(contenido);
}


function guardarNotas() {

    let notas =
        document.getElementById("notas").value;

    localStorage.setItem(
        "utilhubNotas",
        notas
    );

    alert("✅ Nota guardada.");
}


function borrarNotas() {

    localStorage.removeItem(
        "utilhubNotas"
    );

    document.getElementById("notas").value = "";

    alert("Nota eliminada.");
}


/* =========================
   CONTRASEÑA
========================= */

function generarPassword() {

    let caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    let password = "";

    for (let i = 0; i < 14; i++) {

        password +=
            caracteres.charAt(
                Math.floor(
                    Math.random() *
                    caracteres.length
                )
            );
    }


    let contenido = `

        <h2>🔐 Contraseña generada</h2>

        <div class="password-box">

            <input
                id="passwordGenerada"
                value="${password}"
                readonly
            >

            <button onclick="copiarPassword()">
                Copiar
            </button>

        </div>

        <p>
            Usa contraseñas únicas para tus cuentas importantes.
        </p>

    `;

    abrirModal(contenido);
}


function copiarPassword() {

    let campo =
        document.getElementById(
            "passwordGenerada"
        );

    navigator.clipboard.writeText(
        campo.value
    );

    alert("✅ Contraseña copiada.");
}


/* =========================
   ORGANIZADOR
========================= */

function abrirOrganizador() {

    let contenido = `

        <h2>📅 Organizador</h2>

        <input
            id="tarea"
            placeholder="Escribe una tarea"
        >

        <button onclick="agregarTarea()">
            Agregar
        </button>

        <ul
            id="listaTareas"
            style="margin-top:20px;"
        ></ul>

    `;

    abrirModal(contenido);
}


function agregarTarea() {

    let tarea =
        document.getElementById("tarea").value;

    if (!tarea) return;

    let lista =
        document.getElementById("listaTareas");

    let elemento =
        document.createElement("li");

    elemento.innerText =
        "✅ " + tarea;

    elemento.style.margin =
        "10px 0";

    lista.appendChild(elemento);

    document.getElementById("tarea").value = "";
}


/* =========================
   DICCIONARIO
========================= */

function abrirDiccionario() {

    let contenido = `

        <h2>📖 Diccionario</h2>

        <p>
            Escribe una palabra para buscar su significado.
        </p>

        <input
            id="palabra"
            placeholder="Ejemplo: libertad"
        >

        <button onclick="buscarPalabra()">
            Buscar
        </button>

        <div
            id="resultadoDiccionario"
            style="margin-top:20px;"
        ></div>

    `;

    abrirModal(contenido);
}


async function buscarPalabra() {

    let palabra =
        document.getElementById("palabra").value;

    if (!palabra) return;

    let resultado =
        document.getElementById(
            "resultadoDiccionario"
        );

    resultado.innerText =
        "Buscando...";

    try {

        let respuesta =
            await fetch(
                "https://api.dictionaryapi.dev/api/v2/entries/es/" +
                encodeURIComponent(palabra)
            );

        if (!respuesta.ok) {

            throw new Error();
        }

        let datos =
            await respuesta.json();

        let definicion =
            datos[0].meanings[0]
            .definitions[0]
            .definition;

        resultado.innerHTML =
            "<strong>Significado:</strong><br>" +
            definicion;

    } catch {

        resultado.innerText =
            "No se encontró la palabra.";
    }
}


/* =========================
   HORARIO
========================= */

function abrirHorario() {

    let contenido = `

        <h2>⏰ Mi horario</h2>

        <input
            id="lunes"
            placeholder="Lunes"
        >

        <input
            id="martes"
            placeholder="Martes"
        >

        <input
            id="miercoles"
            placeholder="Miércoles"
        >

        <input
            id="jueves"
            placeholder="Jueves"
        >

        <input
            id="viernes"
            placeholder="Viernes"
        >

        <button onclick="guardarHorario()">
            Guardar horario
        </button>

    `;

    abrirModal(contenido);
}


function guardarHorario() {

    alert(
        "✅ Horario guardado en esta sesión."
    );
}


/* =========================
   SERVICIOS
========================= */

function abrirNegocios() {

    abrirModal(`

        <h2>🏪 Negocios locales</h2>

        <p>
            Próximamente podrás encontrar
            negocios y servicios de tu localidad.
        </p>

        <button onclick="cerrarModal()">
            Entendido
        </button>

    `);
}


function abrirServicios() {

    abrirModal(`

        <h2>🔧 Servicios técnicos</h2>

        <p>
            Próximamente podrás encontrar
            técnicos y servicios disponibles.
        </p>

        <button onclick="cerrarModal()">
            Entendido
        </button>

    `);
}


function abrirConsejos() {

    abrirModal(`

        <h2>💡 Consejos útiles</h2>

        <ul style="text-align:left; line-height:2;">

            <li>📱 Protege tus cuentas con contraseñas únicas.</li>

            <li>📚 Organiza tus tareas antes de comenzar.</li>

            <li>⏰ Usa un temporizador para administrar tu tiempo.</li>

            <li>💾 Guarda copias de tus archivos importantes.</li>

            <li>🔎 Verifica la información antes de compartirla.</li>

        </ul>

    `);
}


/* =========================
   CERRAR MODAL AL HACER CLIC FUERA
========================= */

window.onclick = function(event) {

    let modal =
        document.getElementById("modal");

    if (event.target === modal) {

        cerrarModal();
    }
};
