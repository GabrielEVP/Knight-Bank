// Grafico Mensual Ciruclar //



const generator_config_CircularMonth = (income, expense ) => {
    
    const total = parseFloat(income) - parseFloat(expense);
    var color;
    var text;
    var datasets

    if (total < 0) {
        datasets = {
            data:[income, expense],
            backgroundColor:[
                'rgb(0, 255, 71)',
                'rgb(255, 0, 0)'
            ]
        }

        text = ['Total: '+total.toFixed(2)+' €']
        color = 'red'
    } else if (total > 0) {
        datasets = {
            data:[income, expense],
            backgroundColor:[
                'rgb(0, 255, 71)',
                'rgb(255, 0, 0)'
            ]
        }

        text = ['Total: '+total.toFixed(2)+' €']
        color = 'green'
    } else {
        datasets = {
            data:[1],
            backgroundColor:[
                'rgb(60, 60, 60)'
            ]
        }

        text = ['Total: '+total+' €']
        color = 'gray'
    }
  
    return {
        type:"doughnut",
        data: {
            labels: ['Ingresos' , 'Gastos'],
            datasets: [datasets
               
            ],
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
                    text: text,
                    padding: {
                        top: 20,
                    }
                }
            }
        },
    }
}

// Grafico Mensual bar //
const generator_config_BarMonth = (income, expense) => {
    return {
        type:"bar",
        data: {
            labels: ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo' ,'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            datasets:[
                {
                    label: 'Ganancias',
                    data: income,
                    backgroundColor:[
                        'rgb(0, 255, 71)' 
                    ]
                }, 
                {
                    label: 'Perdidas',
                    data: expense,
                    backgroundColor:[
                        'rgb(255, 0, 0)' 
                    ]
                }
            ]
        },
        options: {
            responsive: true
        }
    }
}

export {generator_config_CircularMonth , generator_config_BarMonth }