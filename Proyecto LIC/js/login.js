// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMmdGs8TpdNGyEJ3A1L2uuTAQe4hO9WFQ",
    authDomain: "prueba-ee087.firebaseapp.com",
    databaseURL: "https://prueba-ee087-default-rtdb.firebaseio.com",
    projectId: "prueba-ee087",
    storageBucket: "prueba-ee087.appspot.com",
    messagingSenderId: "403177697333",
    appId: "1:403177697333:web:8d93223dd435298ffec17c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Aquí se obtiene la instancia de Firestore


// Función para registrar un nuevo usuario
function registrarUsuario() {
    // Obtén los valores del formulario
    const usernameInput = document.getElementById('reg-username').value;
    const passwordInput = document.getElementById('reg-password').value;
    const tipo = "cliente";

    // Validación de campos vacíos
    if (usernameInput === "" || passwordInput === "") {
        // Muestra un mensaje de error en el formulario
        document.getElementById('error-messagek').innerText = 'Por favor, complete todos los campos.';
        return;
    }

    // Crea un nuevo usuario con Firebase
    setDoc(doc(db, 'users', usernameInput), { password: passwordInput, type: tipo })
        .then(() => {
            
            // Usuario creado con éxito
            alertify.success('Usuario creado', usernameInput);

            document.getElementById('reg-username').value = "";
            document.getElementById('reg-password').value = "";

        })
        .catch((error) => {
            // Maneja los errores de creación de usuario
            const errorCode = error.code;
            const errorMessage = error.message;
            alertify.error('Error de creación de usuario:', errorCode, errorMessage);
            document.getElementById('reg-username').value = "";
            document.getElementById('reg-password').value = "";
        });
}

// Añade un evento al botón de registro
document.getElementById('idBtnCrearCuenta').addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    registrarUsuario();
});

const loginForm = document.getElementById('login-form');
const optionsDiv = document.getElementById('options');
const ingresar = document.getElementById("idBtnIngresar");

async function iniciarSesion() {
    console.log('Click en el botón Ingresar');
    // Obtén los valores del formulario
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    // Validación de campos vacíos
    if (usernameInput === "" || passwordInput === "") {
        // Muestra un mensaje de error en el formulario
        document.getElementById('error-message').innerText = 'Por favor, complete todos los campos.';
        return;
    }

    try {
        // Consulta el documento del usuario en Firestore
        const userDocRef = doc(db, 'users', usernameInput);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const storedPassword = userData.password;

            // Verifica la contraseña
            if (passwordInput === storedPassword) {
                // Contraseña correcta, se puede acceder al campo 'type'
                const userType = userData.type;
                
                alertify.success('Inicio de sesión exitoso. Tipo de usuario:', userType);

                // Almacena el rol en localStorage
                
                localStorage.setItem('userType', userType);

                 // Ocultar el formulario de inicio de sesión
                  loginForm.style.display = 'none';

                if (userType === 'admin') {
                    window.location.href = './pages/index.html';
                } else if (userType === 'usuario') {
                    window.location.href = './pages/index.html';
                }else if(userType==='gestor'){
                    window.location.href='./pages/index.html';
                }

                window.location.href='./pages/index.html';

                
            } else {
                alertify.error('Contraseña incorrecta');
            }
        } else {
            alertify.error('Usuario no encontrado');
        }
    } catch (error) {
        alertify.error('Error al iniciar sesión:', error);
    }
}

ingresar.onclick = () =>{
    iniciarSesion();
}
