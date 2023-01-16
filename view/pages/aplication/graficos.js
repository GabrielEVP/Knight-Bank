// Grafico Mensual Ciruclar //
const generator_CircularMonth = (Canvas) => {
    const gastos = -1500;
    const ingresos = 1200;
    const total = ingresos + gastos;
    var color;

    if (total > 0) {
        color = 'green'
    } else if (total == 0) {
        color = 'gray'
    } else {
        color = 'red'
    }

    new Chart(Canvas, {
        type:"doughnut",
        data: {
            labels: ['Ingresos' , 'Gastos'],
            datasets:[{
                data:[ingresos,gastos],
                backgroundColor:[
                    'rgb(0, 255, 71)',
                    'rgb(255, 0, 0)'
                ]
            }]
        },  
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                    font: {
                        size: 20,
                        weight: 'normal',
                    },
                    position: 'bottom',
                    display: true,
                    color: color,
                    text: ['Total: '+total+' $'],
                    padding: {
                        top: 20,
                    }
                }
            }
        },
    })
}

// Grafico Mensual bar //
const generator_BarMonth = (Canvas) => {
    const month = ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo' ,'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    const profits_year = [2,3,4,5,1272,7,1272,1272.23,1272,4,1272,3]
    const losses = [2,3,4,5,1272,7,1272,1272.23,1272,4,1272,3];

    new Chart(Canvas, {
        type:"bar",
        data: {
            labels: month,
            datasets:[{
                label: 'Ganancias',
                data: profits_year,
                backgroundColor:[
                    'rgb(0, 255, 71)' 
                ]
            }, {
                label: 'Perdidas',
                data: losses,
                backgroundColor:[
                    'rgb(255, 0, 0)' 
                ]}
            ]
        },
        options:{
            responsive: true,
            scales:{
                yAxes:[{
                    ticks:{
                        beginAtZero:true
                    }
                }]
            }
        }
    })
}

const ctx_bar = document.getElementById('bar_year').getContext("2d");
const ctx_circular = document.getElementById('circular_month').getContext("2d");

generator_CircularMonth(ctx_circular);
generator_BarMonth(ctx_bar);
