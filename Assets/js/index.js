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
// TRAER TODOS LOS CHECKBOX

let checkboxes = document.querySelectorAll('input[type=checkbox]');

console.log(checkboxes);
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', seleccionados);
})
// FILTRAR LOS SELECCIONADOS
function seleccionados() {
    let chequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    console.log(chequeados);
    let inputsValue = chequeados.map(input => input.value);
    console.log(inputsValue);
    let eventFiltr = data.events.filter(event => inputsValue.includes(event.category));
    console.log(eventFiltr)
    
}


// IMPRIMIR FILTRADOS


// CARGA DE TARJETAS DINÁMICAS
cargarCard();

function cargarCard() {
    let cards = document.getElementById('cards');
    let fragmentCards = document.createDocumentFragment();

    for (let events of data.events) {

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

