// let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
//let urlApi = 'https://rickandmortyapi.com/api/character';

// function getApi() {
//     fetch('https://mindhub-xj03.onrender.com/api/amazing')
//     // fetch('../assets/json/data.json')
//         .then((response) => response.json())
//         .then((data) => {
//             pastEvents(data.events, data)
//         })
// }

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
traerDatos()
async function traerDatos() {
    try {
        const response = await fetch(urlApi)
        console.log(response)
        const datos = await response.json();
        pastEvents(datos.events , datos)
    }
    catch(error){
        console.error('ERRORRRRRRR'+error);
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
            console.log(evento.date+' evento pasado');
            //acá tengo que llamar las funciones matemáticas...
        }else{
            console.log(`${evento.date} evento futuro`)
        }
    }
}

// let porcentajesAsistance
// function porcentajeDeAsist(unEvento) {
//     unEvento.capacity
// }