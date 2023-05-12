
/* let formularioImc=document.getElementById(`formulario_IMC`) */
//calcular IMC

/* formularioImc.addEventListener(`submit`, (e)=>{
    e.preventDefault()
    e.target[0].value= Number((e.target[2].value/(e.target[1].value**2)*10000)).toFixed(1)
    
}) */



 //==================divisa


/* 
let dolar=document.getElementById(`dolar`)
 let pesoArgentino=document.getElementById(`peso_argentino`)

    dolar.addEventListener(`input`, (e)=>{
       pesoArgentino.value=dolar.value*140;
    }
    )
    pesoArgentino.addEventListener(`input`,(e)=>{
        (dolar.value=pesoArgentino.value/140);
    } )  */

/* 


let formularioDivisa=document.getElementById(`formulario_divisa`)

console.log(formularioDivisa)

formularioDivisa[0].value=formularioDivisa[1].value*236
console.log(formularioDivisa[1].value) 

formularioDivisa.addEventListener(`submit`,(e)=>{
    e.preventDefault()
    e.target[0].value=e.target[1].value*236;
}) */



// ------------------------ App Notas

let notas=[
    {
        id:1,
        titulo:`Sacar la basura`,
        texto: `mi mama me va a retar si no lo hago`,
        realizada:true
    },
    {
        id:2,
        titulo:`Ir al supermercado`,
        texto: `Realizar compra semanal`,
        realizada:false
    },
    {
        id:3,
        titulo:`Salir a correr`,
        texto: `Hacer ejercicio al aire libre de 14 a 15:30`,
        realizada:true
    },
]
let idGlobal=notas[0].id

let contenedorNotas=document.getElementById(`contenedor_notas`)

let formularioNotas=document.getElementById(`form_interfaz`)
let inputTitulo=document.getElementById(`titulo`)
let inputTexto=document.getElementById(`nota_area`)
let btnBorrarNuevaNota=document.getElementById(`borrar_btn`)
let borrarNota=document.getElementById(`borrar_nota`)
let search=document.getElementById(`search_bar`)
let checkboxFilter=document.getElementById(`checkbox_filter`)



//form para crear Nueva nota
formularioNotas.addEventListener(`submit`,(e)=>{
    e.preventDefault()
    if (inputTitulo.value && inputTexto.value){
        let nota={
            titulo : inputTitulo.value,
            texto : inputTexto.value,
            realizada : false
        }
        borrarForm(inputTitulo,inputTexto)
        notas.push(nota)
        mostrarNotas(notas,contenedorNotas)
    }
} )

// boton para borra contenido de nueva nota
btnBorrarNuevaNota.addEventListener(`click`,(e)=>{
    borrarForm(inputTitulo,inputTexto);
})


// funcion para borrar texto y titulo
function borrarForm(titulo, texto){
    titulo.value="";
    texto.value="";
}

// funcion crear notas

function crearNota(array){
    let estado=""
    if(array.realizada){
        estado=`checked`
    }
        return  `<div id="nota">
            <label for="realizada"></label>
            <input type="checkbox" id="realizada" data-accion="estado" data-id="${array.id}" ${estado}>
            <h2>${array.titulo}</h2>
            <p>${array.texto}</p>
            <button type="button" class="btn btn-danger " data-accion="borrar" data-id="${array.id}">Borrar nota</button>
            
        </div>`
    }

    //funcion para mostrar notas en contenedor

    function mostrarNotas(array, dondeSeCrea){
        let template=""
        for (nota of array){
            template+=crearNota(nota)
        }
        dondeSeCrea.innerHTML=template
    }

    // Boton Borrar nota
    
    contenedorNotas.addEventListener(`click`, (e)=>{
        let dataSet=e.target.dataset
       if(dataSet.accion=="borrar"){
        notas = notas.filter(nota=>nota.id!=dataSet.id)
        mostrarNotas(notas, contenedorNotas)
       }if(dataSet.accion=="estado"){
        const nota = notas.find(nota=>nota.id==dataSet.id)
        notas.realizada= !notas.realizada
        mostrarNotas(notas, contenedorNotas)
       }
    }
    )
 
search.addEventListener(`input`, ()=>{
   const notaFiltrada = filtrarPorTitulo(notas, search.value)
      if(checkboxFilter.checked){
        const notaFiltradaPorrealizadas=filtrarPorRealizadas(notaFiltrada)
        mostrarNotas(notaFiltradaPorrealizadas, contenedorNotas)
    }else{
        mostrarNotas(notaFiltrada, contenedorNotas)
    }
}
)
checkboxFilter.addEventListener(`change`, ()=>{


})

//filtrar por titulo

function filtrarPorTitulo(notas, busqueda){
    return notas.filter(nota=>nota.titulo.toLowerCase().includes( busqueda.toLowerCase()))
}

//filtrar por estado
function filtrarPorRealizadas(notas){
    return notas.filter(nota =>nota.realizada)
}
