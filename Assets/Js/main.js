const URI = "https://amazing-events.herokuapp.com/api/events"

// DOM:
const divCards = document.getElementById('cardsJs')
const inputSearch = document.getElementById('search')
const divCheckBox = document.getElementById('checksContainer')
const checksContainer = document.getElementById('checksContainer')
const divCardsDetail = document.getElementById('cardsJsDetail')
const currentPage = location.href.split("/").slice(-1)[0];
let currentDate;

run();

//Funciones:
async function run() {
    var cards = await cargarDatos(URI);
    printCards(cards);

    if (divCards != null) {
        getCategories(cards);
        printCards(cards);

        let cardsFiltradas = cards;

        divCheckBox.addEventListener('change', () => {
            let arrayPrimerFiltrado = checkFilter(cards);
            cardsFiltradas = inputFilter(arrayPrimerFiltrado, inputSearch.value);
            printCards(cardsFiltradas, 'divCards');
        })

        inputSearch.addEventListener('keyup', () => {
            let arrayPrimerFiltrado = inputFilter(cardsFiltradas, inputSearch.value);
            let arraySegundoFiltrado = checkFilter(arrayPrimerFiltrado);
            printCards(arraySegundoFiltrado, 'divCards');
        })
    }
}

async function cargarDatos(URL) {
    let response = await fetch(URL).then(respuesta => respuesta.json());
    let datos = await response.events;
    currentDate = await response.currentDate;

    return datos;
}

function checkFilter(arrayData) {
    let arrayFiltrado = []
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayCheckboxes = Array.from(checkboxes)
    let arrayCheckBoxesFilter = arrayCheckboxes.filter(checkbox => checkbox.checked)
    let arrayValuesOfCheckboxes = arrayCheckBoxesFilter.map(checkbox => checkbox.value)

    arrayFiltrado = arrayData.filter(events => arrayValuesOfCheckboxes.includes(events.category))

    if (arrayFiltrado.length == 0) {
        return arrayData
    } else {
        return arrayFiltrado
    }
}

function printCards(arrayCards) {
    divCards.innerHTML = ''

    if (arrayCards.length == 0) {
        let cartel = document.createElement('div')
        cartel.className = 'cartelito'
        cartel.innerHTML = `<p>The search event is not available, please search again</p>`
        divCards.appendChild(cartel)
    } else {
        if (currentPage == 'upcomingevents.html') {
            arrayCards = arrayCards.filter(eventos => eventos.date > currentDate);
        } else if (currentPage == 'pastevents.html') {
            arrayCards = arrayCards.filter(eventos => eventos.date < currentDate);
        }

        arrayCards.forEach(event => {
            let card = document.createElement('div')
            card.className = 'card p-0 imagecard m-4'
            card.style.width = '17rem'
            card.innerHTML =
                `<img src=${event.image} class="card-img-top" alt="${event.name}">
                <div class="card-body">
                    <h6 class="card-text">${event.name}</h6>
                    <p class="card-text">${event.description}.</p>
                </div>
                <div class="card-footer nav2color">
                    <div class="d-flex justify-content-evenly align-items-center footercard">
                            <small class="text-muted">Price: $ ${event.price}</small>
                            <a href="./details.html?id=${event._id}" class="btn btn-primary">See More</a>
                        </div>
                    </div>`
            divCards.appendChild(card)
        })
    }
}

function inputFilter(arrayCards, text) {
    let arrayFilter = arrayCards.filter(element => element.name.toLowerCase().includes(text.toLowerCase().trim()))
    return arrayFilter
}

function getCategories(arrayData) {
    let category = []
    arrayData.forEach(events => {
        if (!category.includes(events.category)) {
            category.push(events.category)
        }
    })
    category.forEach(category => {
        let check = document.createElement('div')
        check.className = 'form-check form-check-inline"'
        check.innerHTML = `<li class="list-group-item">
        <input class="form-check-input me-1" type="checkbox" value="${category}" aria-label="...">${category}
        </li>`
        checksContainer.appendChild(check)
    })
}

function printStats(arrayStats) {
    if (currentPage == 'stats.html.html') {
    }
    arrayStats.sort(function (a, b) {
        return b.capacity - a.capacity
    })
}
