const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

    $scope.tabla_prestamo = Array();
    $scope.show_table = false;

    $scope.calcularPrestamo = function () {

        $scope.show_table = true; 
        $scope.tabla_prestamo = Array();

        const tipoPrestamo = $("#tipoPrestamo").val();

        const porcentaje_interes = $("#porcentajeInteres").val();
        const interes = porcentaje_interes/100;
        const duracion = $("#duracion").val();//años
        
        var total_pendiente = $("#totalPrestado").val();
        var total_amortizado = 0;

        var amortizado_cuota = 0;
        var total_cuota = 0;
        var interes_cuota = 0;

        if (duracion != '' && porcentaje_interes !='' && tipoPrestamo != '' && total_pendiente != '') {    

            const cuota = {"periodo":0,"interes_cuota":process_number_format(interes_cuota),'total_cuota':process_number_format(total_cuota),'amortizado_cuota':process_number_format(amortizado_cuota),'total_amortizado':process_number_format(total_amortizado),'total_pendiente':process_number_format(total_pendiente)};
            $scope.tabla_prestamo.push(cuota);
            //console.log(tipoPrestamo);
            switch(tipoPrestamo) {
                  case "frances":
                    calcularFrances();
                    break;
                  case "lineal":
                    calcularLineal();
                    break;
                  case "simple":
                    calcularSimple();
                    break;
                case "americano":
                    calcularAmericano();
                    break;
                  default:
                    // code block
                } 
            console.log($scope.tabla_prestamo);

            function calcularFrances() {
                
                total_pendiente = total_pendiente * 100;//centimos
                total_cuota = ((total_pendiente * interes) / (1-(Math.pow(1+interes,-duracion))));
                total_cuota = parseInt(truncate_decimals(total_cuota,0));
                
                for (let i = 0; i < duracion; i++) {
                    interes_cuota = parseInt(truncate_decimals((total_pendiente * interes),0));
                    amortizado_cuota = (total_cuota - interes_cuota);
                    total_amortizado += (amortizado_cuota);
                    total_pendiente -= (amortizado_cuota);

                    if (i == (duracion - 1) && total_pendiente != 0) {
                        amortizado_cuota += total_pendiente;
                        total_cuota += total_pendiente;
                        total_amortizado += total_pendiente; 

                        total_pendiente = 0;
                    }

                    const cuota = {"periodo":i+1,"interes_cuota":process_number_format(interes_cuota/100),'total_cuota':process_number_format(total_cuota/100),'amortizado_cuota':process_number_format(amortizado_cuota/100),'total_amortizado':process_number_format(total_amortizado/100),'total_pendiente':process_number_format(total_pendiente/100)};
                    $scope.tabla_prestamo.push(cuota);
                }
            }
        
            function calcularLineal() {
                amortizado_cuota = total_pendiente / duracion;
                for (let i = 0; i < duracion; i++) {
                    interes_cuota = truncate_decimals(total_pendiente * interes);
                    total_cuota = truncate_decimals(interes_cuota + amortizado_cuota);   
                    total_amortizado += truncate_decimals(amortizado_cuota);     
                    total_pendiente -= truncate_decimals(amortizado_cuota);

                    if (i == (duracion - 1) && total_pendiente != 0) {
                        amortizado_cuota += total_pendiente;
                        total_cuota += total_pendiente;
                        total_amortizado += total_pendiente; 

                        total_pendiente = 0;
                    }

                    const cuota = {"periodo":i+1,"interes_cuota":process_number_format(interes_cuota),'total_cuota':process_number_format(total_cuota),'amortizado_cuota':process_number_format(amortizado_cuota),'total_amortizado':process_number_format(total_amortizado),'total_pendiente':process_number_format(total_pendiente)};
                    $scope.tabla_prestamo.push(cuota);
                }
            }
        
            function calcularSimple() {
        
            }
        
            function calcularAmericano() {
        
            }
        }
    }
})



function truncate_decimals(num, fixed = 2) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        truncated_number =  num.toString().match(re)[0];

    //truncated_number =  Math.round((num + Number.EPSILON) * 100) / 10000  ;
    return parseFloat(truncated_number);
}

function process_number_format (num) {
    var processed_number = (truncate_decimals(num).toFixed(2)).toString();
    processed_number = processed_number.replace(".",",");
    //console.log(processed_number);
    const char_array = Array.from(processed_number).reverse(); 
    var final_char_array = char_array;

    const array_length = char_array.length;
    for (let i = 6; i < array_length; i = i+4) {
        final_char_array.splice(i,0,".");
    }

    return (final_char_array.reverse()).join("");
}