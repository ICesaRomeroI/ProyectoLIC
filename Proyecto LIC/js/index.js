const userType = localStorage.getItem('userType');
const agregarGestorMenuItem = document.querySelector('.agregar-gestor');

// Verifica el rol del usuario y muestra u oculta contenido según sea necesario
const formularioConciertos = document.getElementById('formulario-conciertos');

// Verifica el rol y muestra u oculta el formulario
if (userType === 'admin') {
    agregarGestorMenuItem.style.display = 'block';
}
else if(userType=='gestor')
{
    agregarGestorMenuItem.style.display = 'none';
}

else {
    agregarGestorMenuItem.style.display = 'none';
}
