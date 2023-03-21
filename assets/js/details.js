let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let claves = [];
let evento = [];

traerDatos();
async function traerDatos() {
  try {
    const response = await fetch(urlApi);
    const datos = await response.json();
    let eventos = datos.events;
    capturandoID(eventos)
    cargarCard(claves, evento);
  }
  catch (error) {
    console.error(error);
  }
}

function capturandoID(miObjeto) {
  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  evento = miObjeto.find(elemento => elemento._id == id);
  claves = Object.keys(evento);
}

function cargarCard(unArray, miObjeto) {
  const detailsCard = document.getElementById('details-card');
  detailsCard.innerHTML = `<div id="card-img-details" class="w-50">
    <img src="${miObjeto.image}" class="img-details" alt="${miObjeto.name}">
  </div>
  <div id="card-txt-details" class="w-50">
    <div class="card-body">
      <h5 class="card-title d-inline">${unArray[1].charAt(0).toUpperCase().concat(claves[1].slice(1))}: ${miObjeto.name}</h5>
      <p class=""><span class="black">${unArray[3].charAt(0).toUpperCase().concat(unArray[3].slice(1))}:</span> ${miObjeto.date}</p>
      <p class="card-text"><span class="black">${unArray[4].charAt(0).toUpperCase().concat(unArray[4].slice(1))}:</span> ${miObjeto.description}</p>
      <p class="card-text"><span class="black">${unArray[2].charAt(0).toUpperCase().concat(unArray[2].slice(1))}:</span> ${miObjeto.category}</p>
      <p class="card-text"><span class="black">${unArray[6].charAt(0).toUpperCase().concat(unArray[6].slice(1))}:</span> ${miObjeto.place}</p>
      <p class="card-text"><span class="black">${unArray[8].charAt(0).toUpperCase().concat(unArray[8].slice(1))}:</span> ${miObjeto.capacity}</p>
      <p class="card-text"><span class="black">${unArray[9].charAt(0).toUpperCase().concat(unArray[9].slice(1))}:</span> ${miObjeto.assistance ? miObjeto.assistance : evento.estimate}</p>
      <p class="card-text"><span class="black">${unArray[7].charAt(0).toUpperCase().concat(unArray[7].slice(1))}:</span> $${miObjeto.price}.-</p>
      <button onclick="history.back()" class="btn btn-dark color-text card-link">Back</button>
    </div>
  </div>`
}