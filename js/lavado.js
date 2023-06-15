let lavados = [];


let form = document.getElementById("form-anadir");

let LS = window.localStorage;
if (LS.getItem('lavados')) {
    lavados = JSON.parse(LS.getItem('lavados'));
}

imprimirV(lavados);

form.addEventListener('submit', e =>{
    e.preventDefault();
    agregarV();
})

function agregarV(){
    const nombre = document.getElementById("nombres").value;
    const tematica = document.getElementById("tematica").value;
    const valor = document.getElementById("valor").value;
    const puntos = document.getElementById("puntos").value;

    let nuevoV = {
        id: Date.now(),
        nombre,
        tematica,
        valor,
        puntos
    }

    lavados.push(nuevoV);

    LS.setItem('lavados', JSON.stringify(lavados));

    imprimirV(lavados);
}

function imprimirV(dic){
    let tabla = document.getElementById("tabla-vid");
    tabla.innerHTML = "";

    dic.forEach(lavado => {
        tabla.innerHTML += `
        <tr>
        <td>${lavado.id}</td>
        <td>${lavado.nombre}</td>
        <td>${lavado.tematica}</td>
        <td>${lavado.valor}</td>
        <td>${lavado.puntos}</td>
        <td class="">
        <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-danger" onclick="eliminar(${lavado.id})"> B </button>
        </div>
        </td>
        </tr>
        `
    });
}

function eliminar(id){
    lavados = lavados.filter(lavado => lavado.id !== id)
    LS.setItem('lavados', JSON.stringify(lavados));
    imprimirV(lavados)
}