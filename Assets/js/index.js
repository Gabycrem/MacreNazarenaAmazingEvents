
let cards = document.getElementById('cards');
let fragment = document.createDocumentFragment();

for (let events of data.events){
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <img src="${events.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${events.name}</h5>
        <p class="card-text">${events.description}</p>
    </div>
    <div class="card-body d-flex justify-content-evenly">
        <p class="d-inline-block card-text">Price: $${events.price}</p>
        <a href="./details.html" class="btn btn-dark color-text card-link">Details</a>
    </div>`;
    fragment.appendChild(card);
}

cards.appendChild(fragment);


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

