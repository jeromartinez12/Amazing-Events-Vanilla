const URI = "https://amazing-events.herokuapp.com/api/events"
const divCardsDetail = document.getElementById('cardsJsDetail')
const queryString = location.search;
const id = new URLSearchParams(queryString).get('id')

cargarDatos(URI);

async function cargarDatos(URL) {
    let response = await fetch(URL).then(respuesta => respuesta.json());
    let datos = await response.events;

    const carta = datos.find(event => event._id == id)
    let card = document.createElement('div');
    card.className = "cartita"
    card.innerHTML = `<div class="conteinerCard m-3" ><div class="card cardInfo" style="width: 18rem;">
        <img src="${carta.image}" class="card-img-top" alt="Card Detail: ${carta.name}">
        <div class="card-body">
            <h5 class="card-title">${carta.name}</h5>
            <p class="card-text">${carta.description}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Date: ${carta.date}</li>
            <li class="list-group-item">Category: ${carta.category}</li>
            <li class="list-group-item">Place: ${carta.place}</li>
            <li class="list-group-item">Capacity: ${carta.capacity}</li>
            <li class="list-group-item">Estimate or Assistance: ${carta.estimate? carta.estimate : carta.assistance}</li>
            <li class="list-group-item">Price: $ ${carta.price}</li>
        </ul>
        <div>
        </div>
        `
    divCardsDetail.appendChild(card)
}
