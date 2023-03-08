const queryString = location.search;
console.log(queryString)
const params = new URLSearchParams(queryString);
console.log([params]);
const id = params.get("id");
console.log(id);

const evento = data.events.find(elemento => elemento._id == id);

console.table(evento);
let claves = (Object.keys(evento));

function cargarCard(){
    const detailsCard = document.getElementById('details-card');
    detailsCard.innerHTML = `<div class="w-50">
    <img src="${evento.image}" class="img-details" alt="...">
  </div>
  <div class="w-50">
    <div class="card-body">
      <h5 class="card-title d-inline">${claves[2].charAt(0).toUpperCase().concat(claves[2].slice(1))}: ${evento.name}</h5>
      <p class="">${claves[3].charAt(0).toUpperCase().concat(claves[3].slice(1))}: ${evento.date}</p>
      <p class="card-text">${claves[4].charAt(0).toUpperCase().concat(claves[4].slice(1))}: ${evento.description}</p>
      <p class="card-text">${claves[5].charAt(0).toUpperCase().concat(claves[5].slice(1))}: ${evento.category}</p>
      <p class="card-text">${claves[6].charAt(0).toUpperCase().concat(claves[6].slice(1))}: ${evento.place}</p>
      <p class="card-text">${claves[7].charAt(0).toUpperCase().concat(claves[7].slice(1))}: ${evento.capacity}</p>
      <p class="card-text">${claves[8].charAt(0).toUpperCase().concat(claves[8].slice(1))}: ${evento.assistance? evento.assistance : evento.estimate}</p>
      <p class="card-text">${claves[9].charAt(0).toUpperCase().concat(claves[9].slice(1))}: $${evento.price}.-</p>
      <button onclick="back();">Volver atrás</button>
    </div>
  </div>`

}
function back(){
    window.history.back();
}
cargarCard();





