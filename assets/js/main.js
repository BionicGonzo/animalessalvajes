import {Leon, Lobo, Oso, Serpiente, Aguila} from "./especie.js"

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

let ListaAnimales = []

// Función IIFE para consumir la API
let callApi = (() => {
    const url_animales = 'animales.json';
    try {
        const getData = async () => {
            const res = await fetch(url_animales)
            return await res.json()
        }
        return {getData}
    }
    
    catch(error) {
        console.log(error)
    }
})()

// Conversión de objetos a array
const {animales} = await callApi.getData();
console.log(animales)

document.getElementById('animal').addEventListener('click', function(e) {
    var index = e.target.selectedIndex;
    console.log(index);
    //index === 0 ? document.getElementById('imgPreview').src='':''
    index === 1 ? document.getElementById('imgPreview').src='assets/img/Leon.png':''
    index === 2 ? document.getElementById('imgPreview').src='assets/img/Lobo.jpg':''
    index === 3 ? document.getElementById('imgPreview').src='assets/img/Oso.jpg':''
    index === 4 ? document.getElementById('imgPreview').src='assets/img/Serpiente.jpg':''
    index === 5 ? document.getElementById('imgPreview').src='assets/img/Aguila.png':''
})

// Botón "Agregar"
document.getElementById('btnRegistrar').addEventListener('click', () => {
    let nombre = document.getElementById('animal').value
    let edad = document.getElementById('edad').value
    let comentarios = document.getElementById('comentarios').value
    let img, sonido

    nombre === '' ? '' : img = animales.find(a => a.name === nombre).imagen // que coincida el nombre para traer imagen
    nombre === '' ? '' : sonido = animales.find(a => a.name === nombre).sonido // que coincida el nombre para traer sonido

    if (nombre === '' || edad === '' || !comentarios) {
        document.getElementById('divMsjError').classList.remove('d-none')
    }

    else {
        document.getElementById('animales').innerHTML = ''
        document.getElementById('divMsjError').classList.add('d-none')
    }

    nombre === 'Leon' ? ListaAnimales.push(new Leon(nombre, edad, img, comentarios, sonido)) : ''
    nombre === 'Lobo' ? ListaAnimales.push(new Lobo(nombre, edad, img, comentarios, sonido)) : ''
    nombre === 'Oso' ? ListaAnimales.push(new Oso(nombre, edad, img, comentarios, sonido)) : ''
    nombre === 'Serpiente' ? ListaAnimales.push(new Serpiente(nombre, edad, img, comentarios, sonido)) : ''
    nombre === 'Aguila' ? ListaAnimales.push(new Aguila(nombre, edad, img, comentarios, sonido)) : ''

    document.getElementById('imgPreview').src = ''
    document.getElementById('animal').value = ''
    document.getElementById('edad').value = ''
    document.getElementById('comentarios').value = ''

    console.log(ListaAnimales)

    let id = 0;
    for (let i of ListaAnimales) {
        document.getElementById('animales').innerHTML +=
        `
        <div class="AnimalCard card bg-dark text-light w-25 p-1">
            <button id="expand" type="button" class="btn btn-outline-warning m-auto" data-toggle="modal" data-target="#${id}">
            <img class="img-fluid" src="assets/img/${i.img}" alt="${i.nombre}">
            </button>
            <p>${i.nombre}</p>
            <p>${i.edad}</p>
            <p>${i._comentarios}</p>
        </div>
        `
        document.getElementById('modalDiv').innerHTML +=
        `
        <div class="modal fade" id="${id}">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-transparent col-12 col-md-10 offset-md-1">
                    <div class="modal-body text-light text-center">
                        <img class="img-fluid" src="assets/img/${i.img}" alt="${i.nombre}">
                        <p>${i.nombre}</p>
                        <p>${i.edad}</p>
                        <p>${i._comentarios}</p>
                        <audio controls src="assets/sounds/${i.sonido}"></audio>
                    </div>
                </div>
            </div>
        </div>
        `
        id++
    }
})