let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let chequeados = [];
let searchFilter = [];
let inputSearch = document.getElementById('inputSearchPast');
let checkbox = document.getElementById('check');
let pastEvents = [];

traerDatos()
async function traerDatos() {
    try {
        const response = await fetch(urlApi);
        const datos = await response.json();
        let eventos = dateEvents(datos, datos.events);
        cargarChecks(datos.events);
        cargarCardPast(eventos, 'cards');
        let checkboxes = document.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                chequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked)
                    .map(input => input.value);
                cargarCardPast(filtrarTodo(eventos), 'cards');
            })
        });
        inputSearch.addEventListener('keyup', () => {
            cargarCardPast(filtrarTodo(eventos), 'cards');
        })
    }
    catch (error) {
        console.error(error);
    }
}

// CARGA DINAMICA CHECKBOX
function cargarChecks(unArray) {
    let categoriesNotDup = [];
    let categories = unArray.map(event => {
        if (!categoriesNotDup.includes(event.category)) {
            categoriesNotDup.push(event.category);
        }
    });
    let fragmentCheck = document.createDocumentFragment();
    for (let category of categoriesNotDup) {
        let check = document.createElement('div');
        check.classList.add('check-inline');
        check.innerHTML = `<input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="${category.replace(' ', '-').toLowerCase()}"
             value="${category}">
             <label class="form-check-label" for="${category.replace(' ', '-').toLowerCase()}">${category}</label>`;
        fragmentCheck.appendChild(check);
    }
    checkbox.appendChild(fragmentCheck);
}

// FILTRANDOOOOOO
function filtrarPorBuscado(value, miObjeto) {
    if (value == '') return miObjeto;
    return miObjeto.filter(elemento => elemento.name.toLowerCase().includes(value.toLowerCase().trim()));
}

function filtrarPorCheck(arrayStr, arrayObj) {
    if (arrayStr.length == 0) return arrayObj;
    return arrayObj.filter(event => arrayStr.includes(event.category));
}

function filtrarTodo(array) {
    let checkFilter = filtrarPorCheck(chequeados, array);
    searchFilter = filtrarPorBuscado(inputSearch.value, checkFilter);
    return searchFilter;
}

// CUANDO NO HAY COINCIDENCIA EN LA BÚSQUEDA
function noEncuentra(cards) {

    if (searchFilter.length == 0 && inputSearch.value != '') {
        let card = document.createElement('div');
        console.log('entre al if de no exos')
        card.classList.add('card', 'my-card', 'mb-3', 'd-flex', 'flex-row', 'w-50', 'p-1', 'gap-2');
        card.innerHTML = `<div id="card-center">
        <h5 class="card-title">"${inputSearch.value}" NO EXISTE</h5>
        <p class="card-text">Su búsqueda no coincide con ningún evento</p>
    </div>`;
        cards.appendChild(card);
    }
}

// Filtrando eventos por fecha
function dateEvents(miJson, miObjeto) {
    let currentDateString = miJson.currentDate;
    let currentDate = new Date(currentDateString);
    let eventsFilterDate = [];
    for (let events of miObjeto) {
        let eventeDateString = events.date;
        let eventDate = new Date(eventeDateString);
        if (eventDate < currentDate) {
            eventsFilterDate.push(events);
        }
    }
    return eventsFilterDate;
}

//CARGA DE TARJETAS
function cargarCardPast(miObjeto, unId) {
    let cards = document.getElementById(unId);
    let fragment = document.createDocumentFragment();
    cards.innerHTML = '';
    noEncuentra(cards);
    for (let events of miObjeto) {
        let card = document.createElement('div');
        card.classList.add('card', 'card-border');
        card.innerHTML = `
        <img src="${events.image}" class="card-img-top" alt="...">
        <div id="card-center">
            <h5 class="card-title">${events.name}</h5>
            <p class="card-text">${events.description}</p>
        </div>
        <div class="d-flex justify-content-evenly" id="card-footer">
            <p class="d-inline-block card-text">Price: $${events.price}</p>
            <a href="./details.html?id=${events._id}" class="btn btn-dark color-text card-link">Details</a>
        </div>`;
        fragment.appendChild(card);
    }
    cards.appendChild(fragment);
}