import {
  saveVenta
} from "./firebase.js";

const userRole = localStorage.getItem('userType');
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
else if (userRole === 'gestor') {
  formularioConciertos.style.display = 'block'; // Muestra el formulario para gestores
  agregarGestorMenuItem.style.display = 'none';

  formularioConciertosusuario.style.display = 'none'
}
else {
  formularioConciertos.style.display = 'none'; // Oculta el formulario para otros roles
  agregarGestorMenuItem.style.display = 'none';

  formularioConciertosusuario.style.display = 'block'
}

const botonesCompra = document.querySelectorAll('.btn.btn-success');

botonesCompra.forEach(boton => {
  boton.addEventListener('click', function () {
    // Obtener la información del concierto
    const fechaElemento = document.querySelector('.date p');
    const fecha = fechaElemento.innerText.replace('Fecha: ', '');
    const lugar = document.getElementById('lugar').innerText;

    // Mostrar la información del concierto en el modal
    document.getElementById('infoConcierto').innerHTML = `<b>Fecha:</b> ${fecha}<br><b>Lugar:</b> ${lugar}`;

    // Calcular y mostrar el total a pagar al cambiar la cantidad de boletos y el tipo de boleto
    const cantidadBoletos = document.getElementById('cantidadBoletos');
    const tipoBoleto = document.getElementById('tipoBoleto');

    const calcularTotal = () => {
      const precioSeleccionado = tipoBoleto.options[tipoBoleto.selectedIndex].text.split(' - ')[1];
      const cantidad = cantidadBoletos.value;
      const total = precioSeleccionado.slice(1) * cantidad;
      document.getElementById('totalPagar').textContent = total;
    };

    cantidadBoletos.addEventListener('input', calcularTotal);
    tipoBoleto.addEventListener('change', calcularTotal);

    // Mostrar el modal al hacer clic en el botón Comprar
    const modal = new bootstrap.Modal(document.getElementById('modalCompra'));
    modal.show();
  });
});

// Evento clic para finalizar la compra
document.getElementById('finalizarCompraBtn').addEventListener('click', function () {
  const montoIngresado = parseInt(document.getElementById('montoEfectivo').value);
  const totalPagar = parseInt(document.getElementById('totalPagar').textContent);

  if (montoIngresado >= totalPagar) {

    const cambio = montoIngresado - totalPagar;

    if (cambio > 0) {
      alertify.success(`¡Compra exitosa! Cambio a devolver: $${cambio}`);
      AddData();

    } else {
      alertify.success('¡Compra exitosa! No se requiere cambio.');
      AddData();
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalCompra'));
    modal.hide(); // Cerrar el modal

    // Reiniciar los valores de los campos del modal
    document.getElementById('tipoBoleto').selectedIndex = 0;
    document.getElementById('cantidadBoletos').value = 1;
    document.getElementById('montoEfectivo').value = '';

    // Reiniciar el total a pagar al valor predeterminado
    document.getElementById('totalPagar').textContent = '50';

  } else {
    alertify.error('El monto ingresado es insuficiente.');
  }
});

async function AddData() {
  try {
    let lugar = document.getElementById('lugar').innerText;
    let tipoBoleto = document.getElementById('tipoBoleto').value;
    let cantidadBoletos = document.getElementById('cantidadBoletos').value;
    let totalPagar = parseInt(document.getElementById('totalPagar').textContent);
    let montoIngresado = parseInt(document.getElementById('montoEfectivo').value);
    let cambio = montoIngresado - totalPagar;

    saveVenta({
      lugar, tipoBoleto, cantidadBoletos, totalPagar, montoIngresado, cambio
    });
  } catch (error) {
    console.error('Error al procesar los datos:', error);
  }
}
