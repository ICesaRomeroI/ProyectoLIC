
const userRole = localStorage.getItem('userRole');
const agregarGestorMenuItem = document.querySelector('.agregar-gestor');

// Verifica el rol del usuario y muestra u oculta contenido según sea necesario
const formularioConciertos = document.getElementById('formulario-conciertos');
const formularioConciertosusuario = document.getElementById('formulario-conciertos-usuarios');

// Verifica el rol y muestra u oculta el formulario
if (userRole === 'admin') {
    formularioConciertos.style.display = 'block'; // Muestra el formulario para administradores
    agregarGestorMenuItem.style.display = 'block';

    formularioConciertosusuario.style.display = 'none'

}
else if (userRole === 'gestor'){
    formularioConciertos.style.display = 'block'; // Muestra el formulario para gestores
    agregarGestorMenuItem.style.display = 'none';

    formularioConciertosusuario.style.display = 'none'
}
 else {
    formularioConciertos.style.display = 'none'; // Oculta el formulario para otros roles
    agregarGestorMenuItem.style.display = 'none';

    formularioConciertosusuario.style.display = 'block'
}