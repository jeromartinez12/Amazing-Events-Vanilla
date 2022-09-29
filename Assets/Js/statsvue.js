const app = Vue.

createApp({
    data() {
        return {
            events : [],
            pastEvents : [],
            upEvents : [],
            tabla : [],
            tablaUp : [],
            tablaPast : [],

            fecha: '',
            eventoMasCapacidad: [],
            eventoMayorPorcentaje: [],
            eventoMenorPorcentaje: [],
        }
},
    created(){
        fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then((json) => {
            this.events = json.events;
            this.fecha = json.currentDate;

            this.upEvents = this.events.filter((event)=> event.date > json.currentDate)
                this.pastEvents = this.events.filter((event)=> event.date < json.currentDate)
                this.tablaUp = this.calculadora(this.upEvents)
                this.tablaPast = this.calculadora(this.pastEvents)
                this.eventsGuardados = this.events;
               
                this.conseguirMayorCapacidad();
                this.conseguirAsistencias(this.events.filter(evento => evento.date < this.fecha));
        })
        .catch((error) => console.log(error))
    },
    methods: {
        calculadora(array) {
            let arraysinduplicados = []
            array.forEach(evento => {
                if (!arraysinduplicados.includes(evento.category)) {
                    arraysinduplicados.push(evento.category)
                }})
                let arraycalculos = []
                    arraysinduplicados.forEach(category => {
                        let categoriasAgrupadas = array.filter(events => events.category == category)
                        let ingresos = categoriasAgrupadas.map(events => (events.estimate? events.estimate : events.assistance) * events.price)
                        let totalIngresos = ingresos.reduce((a, b) => a = a + b, 0)
                        let porcentaje = categoriasAgrupadas.map(events =>((events.estimate? events.estimate : events.assistance) / events.capacity))
                        let totalPorcentaje = porcentaje.reduce((a, b) => a = a + b, 0);
                        arraycalculos.push([category, totalIngresos, parseInt(totalPorcentaje / categoriasAgrupadas.length*100)])
                    })
                    return arraycalculos
        },

        conseguirMayorCapacidad(){
            let capacidades = this.events.map(event => event.capacity)
            this.eventoMasCapacidad = this.events.find(event => event.capacity == Math.max(...capacidades))
        },

        conseguirAsistencias(eventosPasados){
            let asistencias = eventosPasados.map(event => event.assistance / event.capacity)
            this.eventoMayorPorcentaje = eventosPasados.find(event => event.assistance / event.capacity == Math.max(...asistencias))
            this.eventoMenorPorcentaje = eventosPasados.find(event => event.assistance / event.capacity == Math.min(...asistencias))
        },
    }

}).mount('#app')