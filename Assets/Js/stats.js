const URI = "https://amazing-events.herokuapp.com/api/events"
const tableUp = document.getElementById('tableUp')
const tableGeneral = document.getElementById('tableGeneral')
const tablePast = document.getElementById('tablePast')


cargarDatos(URI);


function statsContain(arrayEvents){
    let categories = []
    let arrayStats = []

    arrayEvents.forEach(event => {
        if(!categories.includes(event.category)){
            categories.push(event.category)
        }
    });

    categories.forEach(categoria =>{

        let arrayFilterEvents = arrayEvents.filter(event => event.category == categoria)

        let ingresos = arrayFilterEvents.map(event => ((event.assistance ?event.assistance :event.estimate) * event.price))

        let ingresoTotal = ingresos.reduce((actual, siguiente) => actual = actual + siguiente, 0)

        let porcentajeDeAsistencia = arrayFilterEvents.map(event =>(event.assistance ?event.assistance :event.estimate) / event.capacity)

        let promedioPorcentaje = (porcentajeDeAsistencia.reduce((actual, siguiente) => actual = actual + siguiente, 0) / (porcentajeDeAsistencia.length)) * 100

    arrayStats.push([categoria, ingresoTotal, parseInt(promedioPorcentaje)])
    })
    return arrayStats
}
function contenidoTabla(arrayEvents, container){
    let statistics = stats(arrayEvents)
    statistics.forEach(estadistica => {
        let tr = document.createElement('td')
        tr.innerHTML = `
        <td class="text-center">${estadistica[0]}</td>
        <td class="text-center">$ ${estadistica[1]}</td>
        <td class="text-center">${estadistica[2]} %</td>`
    container.appendChild(tr)
    })
}