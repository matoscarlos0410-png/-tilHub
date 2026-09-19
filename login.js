import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {

    apiKey: "TU_API_KEY",

    authDomain: "TU_PROYECTO.firebaseapp.com",

    projectId: "TU_PROJECT_ID",

    storageBucket: "TU_STORAGE_BUCKET",

    messagingSenderId: "TU_MESSAGING_SENDER_ID",

    appId: "TU_APP_ID"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


const boton =
    document.getElementById("googleLogin");

const usuario =
    document.getElementById("usuario");


boton.addEventListener("click", async () => {

    try {

        const resultado =
            await signInWithPopup(
                auth,
                provider
            );

        const user = resultado.user;

        usuario.innerHTML = `
            <p>✅ Hola, ${user.displayName}</p>
            <p>${user.email}</p>

            <button id="cerrarSesion">
                Cerrar sesión
            </button>
        `;

        document
            .getElementById("cerrarSesion")
            .addEventListener("click", () => {

                signOut(auth);

            });

    } catch (error) {

        console.error(error);

        alert(
            "No se pudo iniciar sesión con Google."
        );
    }

});


onAuthStateChanged(auth, (user) => {

    if (user) {

        usuario.innerHTML = `
            <p>✅ Sesión iniciada</p>
            <p>${user.displayName}</p>
            <button id="cerrarSesion">
                Cerrar sesión
            </button>
        `;

    } else {

        usuario.innerHTML = "";
    }

});
