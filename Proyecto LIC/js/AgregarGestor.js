import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Configuración de Firebase
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
const db = getFirestore(app);

// Añade un evento al botón de agregar gestor
document.getElementById('idBtnAgregar').addEventListener('click', agregarGestor);

async function agregarGestor() {
    // Obtén los valores del formulario
    const usuario = document.getElementById('idTxtUsuario').value;
    const contraseña = document.getElementById('idTxtContraseña').value;
    const role = document.getElementById('idCmbRole').value;
    const nombreCompleto = document.getElementById('idTxtNombreCompleto').value;
    const dui = document.getElementById('idTxtDui').value;
    const nit = document.getElementById('idTxtNit').value;
    const fechaNacimiento = document.getElementById('idTxtFechaNacimiento').value;
    const correo = document.getElementById('idTxtCorreo').value;
    const edad = document.getElementById('idTxtEdad').value;

    // Validación de campos vacíos
  if (
    usuario === "" ||
    contraseña === "" ||
    role === "" ||
    nombreCompleto === "" ||
    dui === "" ||
    nit === "" ||
    fechaNacimiento === "" ||
    correo === "" ||
    edad === ""
  ) {
    // Muestra un mensaje de error en el formulario
    document.getElementById('error-message').innerText = 'Por favor, complete todos los campos.';
    return;
  }

  // Validación de selección de rol
  if (role === '0') {
    // Muestra un mensaje de error en el formulario
    document.getElementById('error-message11').innerText = 'Por favor, seleccione un rol.';
    return;
  }

  // Otras validaciones; validando nombre:
  if (!nombreCompleto.match(/^[a-zA-Z ]+$/)) {
    // Muestra un mensaje de error en el formulario
    document.getElementById('error-message1').innerText = 'Nombre inválido.';
    return;
  }

  // validación dui
  if (!dui.match(/^\d{8}-\d$/)) {
    // Muestra un mensaje de error en el formulario
    document.getElementById('error-message2').innerText = 'DUI inválido.';
    return;
  }

  // validación nit
  if (!nit.match(/^\d{4}-\d{6}-\d{3}-\d$/)) {
    // Muestra un mensaje de error en el formulario
    document.getElementById('error-message3').innerText = 'NIT inválido.';
    return;
  }

  // Validación de selección de fecha
  if (fechaNacimiento === "") {
    // Muestra un mensaje de error en el formulario
    document.getElementById('error-message22').innerText = 'Por favor, seleccione fecha de nacimiento.';
    return;
  }

  // validación correo
  if (!correo.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
    // Muestra un mensaje de error en el formulario
    document.getElementById('error-message4').innerText = 'correo inválido.';
    return;
  }

  // validación edad
  if (!edad.match(/^\d+$/)) {
    // Muestra un mensaje de error en el formulario
    document.getElementById('error-message5').innerText = 'edad inválida.';
    return;
  }

    try {
        // Crea un nuevo usuario en Firestore
        await setDoc(doc(db, 'users', usuario), {
            password: contraseña,
            type: role,
            nombreCompleto: nombreCompleto,
            dui: dui,
            nit: nit,
            fechaNacimiento: fechaNacimiento,
            correo: correo,
            edad: edad
        });

        console.log('Gestor agregado exitosamente:', usuario);
        // Puedes agregar más lógica aquí, como mostrar un mensaje de éxito o redirigir a otra página.
    } catch (error) {
        console.error('Error al agregar gestor:', error);
    }
}
