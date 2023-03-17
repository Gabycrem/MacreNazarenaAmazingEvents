let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let eventsPast = [];
let eventsUncoming = [];
let revenuesCat = [];
let tabla1 = document.getElementById('tabla1');
let tabla2 = document.getElementById('tabla2');
let tabla3 = document.getElementById('tabla3');
let tablaPast = [];
let tablaUncoming = [];


traerDatos()
async function traerDatos() {
    try {
        const response = await fetch(urlApi)
        const datos = await response.json();
        pastEvents(datos.events, datos);
        //console.log(eventsPast);
        porcentajeAsistencia(eventsPast);
        tablaPast.forEach(cat => { ganancias(eventsPast, cat)});
        tablaUncoming.forEach(cat => { ganancias(eventsUncoming, cat)});
        
        //categoriesFilt(datos.events);

    }
    catch (error) {
        console.error('ERRORRRRRRR' + error);
    }
}

function currentDate(miObjeto) {
    let currentDateString = miObjeto.currentDate;
    let currentDate = new Date(currentDateString);
    return currentDate;
}

function pastEvents(miObjeto, miJson) {

    for (evento of miObjeto) {
        let eventeDateString = evento.date;
        let eventDate = new Date(eventeDateString);

        if (eventDate < currentDate(miJson)) {
            eventsPast.push(evento);
            //console.log(eventsPast)
        } else {
            eventsUncoming.push(evento);
        }
    }
    categoriesFilt(eventsPast);
    categoriesFilt(eventsUncoming);
}


function categoriesFilt(miObjeto) {
    let categories = [];
    miObjeto.map(event => {
        if (!categories.includes(event.category)) {
            categories.push(event.category);
             
        }

    })
    console.log(miObjeto)
    if (miObjeto.keys('assistance')){
        tablaPast = categories;
        //console.log('eventPast')
        //console.log(tablaPast)
    } else {
        tablaUncoming = categories;
        //console.log(tablaUncoming)
    }
    //console.log(tablaPast)
}

function ganancias(unArray, categoria) {
    //console.log(categorias)
    let revenues = 0;
    let sumaAss = 0;
    let contCat = 0;
    for (evento of unArray) {
        if (evento.category == categoria) {
            contCat++
            revenues += (evento.assistance ? evento.assistance : evento.estimate) * evento.price;
            sumaAss += parseFloat(((evento.assistance ? evento.assistance : evento.estimate) * 100 / evento.capacity).toFixed(2));
        }
        if (evento.assistance && !tablaPast.includes(categoria)) {
            tablaPast.push(categoria);
        } else if (evento.estimate && !tablaUncoming.includes(categoria)) {
            tablaUncoming.push(categoria);
        }
    }
    sumaAss = parseFloat(sumaAss / contCat).toFixed(2);
    if (unArray.keys('assistance')){

    }
    console.log(categoria + ' ' + sumaAss + '% -- Revenues: $' + revenues)


}



function cargarTabla2y3(tabla, col1, col2, col3) {
    tabla.innerHTML = `
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>`
}

function cargarTabla1(miObjeto) {
    tabla1.innerHTML = `
    <tr>
        <td> ${miObjeto.eventMayPorAsist} </td>
        <td> ${miObjeto.eventMenPorAsist}</td>
        <td> ${miObjeto.eventMayCapacity} </td>
    </tr>`
}
function porcentajeAsistencia(unArray) {
    let contTabla1 = {};
    let eventMayPorAsist = '';
    let eventMenPorAsist = '';
    let eventMayCapacity = '';
    let porcentajeMay = 0;
    let porcentajeMen = 100;
    let capacity = 0;
    for (evento of unArray) {
        let auxPorcentaje = ((evento.assistance * 100) / evento.capacity).toFixed(2);
        if (auxPorcentaje > porcentajeMay) {
            porcentajeMay = auxPorcentaje;
            eventMayPorAsist = evento.name;
        } else if (auxPorcentaje < porcentajeMen) {
            porcentajeMen = auxPorcentaje;
            eventMenPorAsist = evento.name;
        }
        let auxCapacity = evento.capacity;
        if (auxCapacity > capacity) {
            capacity = auxCapacity;
            eventMayCapacity = evento.name;
        }
    }
    contTabla1.eventMayPorAsist = `${eventMayPorAsist}:  ${porcentajeMay}%`;
    contTabla1.eventMenPorAsist = `${eventMenPorAsist}:  ${porcentajeMen}%`;
    contTabla1.eventMayCapacity = `${eventMayCapacity}:  ${capacity}`;
    cargarTabla1(contTabla1);
}
