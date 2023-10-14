// Simula una base de datos de usuarios con sus roles y contraseñas
const users = [
    { username: 'usuario1', password: 'clave1', role: 'admin' },
    { username: 'usuario2', password: 'clave2', role: 'usuario' },
];

const loginForm = document.getElementById('login-form');
const optionsDiv = document.getElementById('options');
const ingresar = document.getElementById("idBtnIngresar");


function ingresarLogin(){

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
    
        const user = users.find(user => user.username === usernameInput && user.password === passwordInput);
    
        if (user) {
            // Ocultar el formulario de inicio de sesión
            loginForm.style.display = 'none';
            // Obtén el rol del usuario después de la autenticación
            const userRole = user ? user.role : null;

            // Almacena el rol en localStorage
            localStorage.setItem('userRole', userRole);
            // Redirigir al usuario a la página de destino después del inicio de sesión
           
            // Lógica para mostrar opciones basadas en el rol del usuario
            if (user.role === 'admin') {
                window.location.href = './pages/index.html';
            } else if (user.role === 'usuario') {
                window.location.href = './pages/index.html';
            }
        } else {
            alert('Credenciales incorrectas. Inténtelo de nuevo.');
        }
    });
}


ingresar.onclick = () =>{
    ingresarLogin();
}
