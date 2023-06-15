const LS = window.localStorage;
let clientes = [];
let lavados = [];
let datoCliente = [];
let datoLavados = [];
let lavadoSeleccionado;

// -- Traer registros del Local Storage si existen
if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}

if(LS.getItem('lavados')){
    lavados = JSON.parse(LS.getItem('lavados'))
}

const modClientes = document.querySelector('#clientes');
const modLavados = document.querySelector('#lavados');


/**
 * SELECCION DE CLIENTES
 */
imprimirCliente(clientes);

const inputBuscar = document.querySelector('#buscar-clientes');
inputBuscar.addEventListener('keyup', buscarClientes);


const btnSelectCliente = document.querySelector('#select-cliente');
btnSelectCliente.addEventListener('click', () => {

    modClientes.classList.add('d-none');
    modLavados.classList.remove('d-none');

    cargarClienteTicket();
});


function buscarClientes(){
    if (isNaN(inputBuscar.value)){
        busqueda = clientes.filter(function(cliente){
            return (
                cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) || 
                cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
            )
        });

        if(busqueda.length === 1){
            btnSelectCliente.classList.remove('disabled');
        } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
        }
        datoCliente = busqueda;
        imprimirCliente(busqueda);
    } else{
        let busqueda = clientes.filter(function(cliente){
            return cliente.identificacion.includes(inputBuscar.value);
            
        })
        if(busqueda.length === 1){
            btnSelectCliente.classList.remove('disabled');
        }
        else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
        }
        datoCliente = busqueda;
        imprimirCliente(busqueda);
    }
} 

function cargarClienteTicket(){
    const clienteDatos = document.querySelector('#clienteDatos');

    clienteDatos.innerHTML = `
                        <p><b>Documento:</b>${datoCliente[0].identificacion}</p>
                        <p><b>Nombres:</b>${datoCliente[0].nombres} ${datoCliente[0].apellidos}</p>
                        <p><b>Teléfono:</b>${datoCliente[0].telefono}</p>
                        <p><b>Email:</b>${datoCliente[0].email}</p>
                        <p><b>Placa:</b>${datoCliente[0].placa}</p>

    `
}


/**
 * SELECCION DE LAVADOS
 */

imprimirLavados(lavados);

const inputBuscarV = document.querySelector('#buscar-lavados');
inputBuscarV.addEventListener('keyup', buscarLavados);

const btnSelectV = document.querySelector('#comprarTicket');
btnSelectV.addEventListener('click', () => {
    cargarLavadoTicket();
    
    document.querySelector('#form-tickets').classList.add('d-none');

    clientes.forEach((cliente,idx) => {
        if(cliente.id === datoCliente[0].id){
            clientes[idx].puntos += parseInt(datoLavados[0].puntos)
        }
    })

    LS.setItem('clientes', JSON.stringify(clientes));
});


function buscarLavados(){
    if (inputBuscarV.value) { // Estudiar!!!
        busqueda = lavados.filter(function (lavado) {
            return lavado.nombre.toLowerCase().includes(inputBuscarV.value.toLowerCase());
        });

        // Validar si es un sólo usuario
        if (busqueda.length === 1) {
            btnSelectV.classList.remove('disabled');
        } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectV.classList.contains('disabled')) {
            btnSelectV.classList.add('disabled');
        }

        datoLavados = busqueda;

        imprimirLavados(busqueda);
    }
} 

function cargarLavadoTicket() {
    const lavadosDatos = document.querySelector('#lavadosDatos');

    lavadosDatos.innerHTML = `
        <p><b>Valor lavado:</b> ${datoLavados[0].valor}</p>
        <p><b>+IVA:</b> ${datoLavados[0].valor * 0.16}</p>
        <p><b>+Tasa adicional:</b> ${datoLavados[0].valor * 0.04}</p>
        <p><b>Total:</b> ${datoLavados[0].valor * 1.20}</p>
        <hr>
        <p><b>Puntos de Fidelización de Lavado:</b> ${datoLavados[0].puntos}</p>
    `
}


// TablasMostrar

function imprimirCliente(dic){
    const tabla = document.getElementById("tabla-clientes");
    tabla.innerHTML = "";

    dic.forEach(cliente => {
        tabla.innerHTML += `<tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        </tr>`
    });
}

function imprimirLavados(dic){
    const tabla = document.getElementById("tabla-lavados");
    tabla.innerHTML = "";
    dic.forEach(cliente => {
        tabla.innerHTML += `<tr>
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.tematica}</td>
        <td>${cliente.valor}</td>
        <td>${cliente.puntos}</td>
        </tr>`
    });
}