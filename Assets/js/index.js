
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
        <a href="./details.html" class="btn btn-dark color-text card-link">Details</a>
    </div>`;
    fragmentCards.appendChild(card);
}

cards.appendChild(fragmentCards);
// Plantilla de Tarjetas.
// <div class="card">
//     <img src="./assets/img/cinema.jpg" class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <p class="card-text">Some quick example text....</p>
//         </div>
//         <div class="card-body d-flex justify-content-evenly">
//             <p class="d-inline-block card-text">Price: $1111</p>
//             <a href="./details.html" class="btn btn-dark color-text card-link">Another link</a>
//         </div>
// </div> 

//Carga de categorias dinámica

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
categories = (catNotDups(categories));

let cont = 0;
for (let category of categories) {
    let check = document.createElement('div');
    cont++;
    check.classList.add('check-inline');
    check.innerHTML = `<input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio${cont}"
             value="${category}">
             <label class="form-check-label" for="inlineRadio${cont}">${category}</label>`;
    fragmentCheck.appendChild(check);
}
checkbox.appendChild(fragmentCheck);

// Plantilla de checkbox
// {/* <div class="check-inline">
//     <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio2"
//         value="Book Exchange">
//         <label class="form-check-label" for="inlineRadio2">Book Exchange</label>
// </div> */}