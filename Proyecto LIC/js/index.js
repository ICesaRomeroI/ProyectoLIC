const userRole = localStorage.getItem('userRole');
const agregarGestorMenuItem = document.querySelector('.agregar-gestor');

// Verifica el rol del usuario y muestra u oculta contenido según sea necesario
const formularioConciertos = document.getElementById('formulario-conciertos');

// Verifica el rol y muestra u oculta el formulario
if (userRole === 'admin') {
    agregarGestorMenuItem.style.display = 'block';
} else {
    agregarGestorMenuItem.style.display = 'none';
}