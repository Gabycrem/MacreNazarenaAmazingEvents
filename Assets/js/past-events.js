
let currentDateString = data.currentDate;
let currentDate = new Date(currentDateString);

let cards = document.getElementById('cards');
let fragment = document.createDocumentFragment();

for (let events of data.events) {

    let eventeDateString = events.date;
    let eventDate = new Date(eventeDateString);

    if (eventDate < currentDate) {
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
        fragment.appendChild(card);
    }
}

cards.appendChild(fragment);