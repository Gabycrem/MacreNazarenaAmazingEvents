// CARGA DE CATEGORÍAS - 
//TRAIGO CATEGORÍAS Y ELIMINO REPETIDAS
let checkbox = document.getElementById('check');
let fragmentCheck = document.createDocumentFragment();
let categories = [];
const catNotDups = (unArray) => {
    for (let events of data.events) {
        categories.push(events.category)
    }
    return unArray.reduce((array, item) => {
        if (array.indexOf(item) === -1) {
            array.push(item)
        }
        return array
    }, []);
}
categories = catNotDups(categories);

//CARGO CATEGORÍAS SIN REPETIR Y CREO ELEMENTOS HTML

for (let category of categories) {
    let check = document.createElement('div');
    check.classList.add('check-inline');
    check.innerHTML = `<input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="${category.replace(' ', '-').toLowerCase()}"
             value="${category}">
             <label class="form-check-label" for="${category.replace(' ', '-').toLowerCase()}">${category}</label>`;
    fragmentCheck.appendChild(check);
}
checkbox.appendChild(fragmentCheck);

//-------------------------------
let chequeados = [];

function filtrarPorBuscado (value, miObjeto){ 
    if(value == '') return miObjeto;
    return miObjeto.filter(elemento => elemento.name.toLowerCase().includes(value.toLowerCase().trim()));
}

function filtrarPorCheck (arrayStr, arrayObj){
    if (arrayStr.length == 0) return arrayObj
    let eventFiltr = arrayObj.filter(event => arrayStr.includes(event.category));
    return(eventFiltr)
}

// FILTRAR LOS SELECCIONADOS

// evento CHECKBOX
let checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () =>{
        chequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(input => input.value);
        cargarCard(filtrarTodo(data.events),'cards');
    });
    
})
//  evento SEARCH
let inputSearch = document.getElementById('inputSearch');
inputSearch.addEventListener('keyup', () => {
    cargarCard(filtrarTodo(data.events), 'cards');
})

function filtrarTodo(array){
    let checkFilter = filtrarPorCheck(chequeados, array);
    let searchFilter = filtrarPorBuscado(inputSearch.value, checkFilter);
    console.log(searchFilter);
    return searchFilter;
}

// CARGA DE TARJETAS DINÁMICAS
cargarCard(data.events, 'cards');

function cargarCard(miObjeto, unId) {
    let cards = document.getElementById(unId);
    cards.innerHTML = '';
    let fragmentCards = document.createDocumentFragment();
    for (let events of miObjeto) {
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
        fragmentCards.appendChild(card);
    }
    cards.appendChild(fragmentCards);
}

//-------------------------------

