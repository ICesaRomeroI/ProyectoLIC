import {
  saveVenta, saveEvent, getEventListSize, getEvento, getEventos
} from "./firebase.js";

const userType = localStorage.getItem('userType');
const agregarGestorMenuItem = document.querySelector('.agregar-gestor');

// Verifica el rol del usuario y muestra u oculta contenido según sea necesario
const formularioConciertos = document.querySelector('.ConcertAdm');
const formularioConciertosusuario = document.getElementById('formulario-conciertos-usuarios');

// Verifica el rol y muestra u oculta el formulario
if (userType === 'admin') {
  formularioConciertos.style.display = 'block'; // Muestra el formulario para administradores
  agregarGestorMenuItem.style.display = 'block';

  formularioConciertosusuario.style.display = 'none'

}
else if (userType === 'gestor') {
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

//Agregar Eventos



async function AddEvent() {
  if (validateData()) {
    // Leyendo los valores de los campos
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let image = document.getElementById("inputGroupFile01");
    let reader = new FileReader();
    reader.readAsDataURL(image.files[0]);
    reader.addEventListener("load", () => {
      // Guardamos el registro en firebase
      saveEvent({
        name, description, image: reader.result
      });
    });

    // Limpiando campos
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("inputGroupFile01").value = "";
    // Cerrando el modal
    document.getElementById("close-btn").click();
    alertify.success('Product added succesfully');
    showData();
  }
}
//mostrar Datos
async function showData() {

  let html = "";
  // Recuperando el tamaño de la lista de productos
  let size = await getEventListSize();

  if (size == 0) { // Si no hay productos en la colección
    html = `<div class="card-body">
              <div class="row gx-2">
              <div class="col">
              <div class="p-3">
                  <img src="img/no-data-found.png" class="img-fluid d-block">
              </div></div></div></div>`;

  }
  else { // Si hay productos
    //Recuperando los productos
    const productList = await getEventos();
    productList.forEach(element => {
      console.log(element);
      const product = element.data();
      html += `

                      <div >
                      
                      <div class="event col-md-5">
                      <h2 style="color:red">Proximamente</h2>
                          <img src="${product.image}" alt="" class="Img_noticia">
                          <div class="date">
                              <p>Fecha: ${product.name}</p>
                          </div>
                          <div class="description">
                              <p><b>Lugar:</b></p>
                              <p id="lugar">${product.description}</p>
                          </div>
                      </div>
                      </div>
                                              
          `;
    });
  }
  document.getElementById("crud-table").innerHTML = html;
}

showData();




let addButton = document.getElementById("submitdata");
// Agrega un listener para el evento de click
addButton.addEventListener("click", AddEvent);

//validar los datos del modal
function validateData() {
  let name = document.getElementById("name").value.trim();
  let description = document.getElementById("description").value.trim();
  let image = document.getElementById("inputGroupFile01");
  if (name == "") {
    document.getElementById("name-error-msg").innerHTML = "You must enter the name";
    return false;
  }
  else {
    document.getElementById("name-error-msg").innerHTML = "";
  }

  if (description == "") {
    document.getElementById("disc-error-msg").innerHTML = "You must enter the description";
    return false;
  }
  else if (description.length > 100) {
    document.getElementById("disc-error-msg").innerHTML = "Description max length is 100";
    return false;
  }
  else {
    document.getElementById("disc-error-msg").innerHTML = "";
  }

  if (image.files.length == 0) {
    document.getElementById("image-error-msg").innerHTML = "You must select a image";
    return false;
  }
  else {
    document.getElementById("image-error-msg").innerHTML = "";
  }

  let allowedFormats = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
  if (!allowedFormats.exec(image.files[0].name)) {
    document.getElementById("image-error-msg").innerHTML = "You must select a valid image";
    image.value = "";
    return false;
  }
  else {
    document.getElementById("image-error-msg").innerHTML = "";
  }

  let fileSize = image.files[0].size / 1024;
  if (fileSize > 700) {
    document.getElementById("image-error-msg").innerHTML = "You max file size is 700 KB";
    image.value = "";
    return false;
  }
  else {
    document.getElementById("image-error-msg").innerHTML = "";
  }



  return true;
}

