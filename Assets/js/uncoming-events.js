// CARGA DINAMICA CHECKBOX

let checkbox = document.getElementById('check');
let categoriesNotDup = [];
let categories = data.events.map(event => {
    if (!categoriesNotDup.includes(event.category)){
        categoriesNotDup.push(event.category);
    }
});

console.log(categoriesNotDup);

let fragmentCheck = document.createDocumentFragment();
let cont = 0;
for (let category of categoriesNotDup) {
    let check = document.createElement('div');
    cont++;
    check.classList.add('check-inline');
    check.innerHTML = `<input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio${cont}"
             value="${category}">
             <label class="form-check-label" for="inlineRadio${cont}">${category}</label>`;
    fragmentCheck.appendChild(check);
}
checkbox.appendChild(fragmentCheck);

let chequeados = [];

let checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        chequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(input => input.value);
        cargarCardPast(filtrarTodo(data.events), 'cards');
    })
});

let inputSearch = document.getElementById('inputSearchUncoming');
inputSearch.addEventListener('keyup', () => {
    cargarCardPast(filtrarTodo(data.events), 'cards');
})

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
    let searchFilter = filtrarPorBuscado(inputSearch.value, checkFilter);
    console.log(searchFilter);
    return searchFilter;
}


cargarCardPast(data.events, 'cards');
//CARGA DE TARJETAS

function cargarCardPast(miObjeto, unId) {
    let currentDateString = data.currentDate;
    let currentDate = new Date(currentDateString);

    let cards = document.getElementById(unId);
    let fragment = document.createDocumentFragment();
    cards.innerHTML = '';
    for (let events of miObjeto) {

        let eventeDateString = events.date;
        let eventDate = new Date(eventeDateString);

        if (eventDate > currentDate) {
            let card = document.createElement('div');
            card.classList.add('card');
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
    }

    cards.appendChild(fragment);
}

