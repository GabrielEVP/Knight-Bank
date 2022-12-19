const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

    $scope.tabla_prestamo = Array();
    $scope.calcularPrestamo = function () {
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

        const cuota = {"interes_cuota":truncate_decimals(interes_cuota,2),'total_cuota':truncate_decimals(total_cuota,2),'amortizado_cuota':truncate_decimals(amortizado_cuota,2),'total_amortizado':truncate_decimals(total_amortizado,2),'total_pendiente':truncate_decimals(total_pendiente,2)};
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

            // function calcularFrances() {
            //     total_cuota = truncate_decimals((total_pendiente * interes) / (1-(Math.pow(1+interes,-duracion))));
            //     for (let i = 0; i < duracion; i++) {
            //         interes_cuota = truncate_decimals(total_pendiente * interes);
            //         amortizado_cuota = truncate_decimals(total_cuota - interes_cuota);
            //         total_amortizado += truncate_decimals(amortizado_cuota);
            //         total_pendiente -= truncate_decimals(amortizado_cuota);

            //         const cuota = {"interes_cuota":truncate_decimals(interes_cuota,2),'total_cuota':truncate_decimals(total_cuota,2),'amortizado_cuota':truncate_decimals(amortizado_cuota,2),'total_amortizado':truncate_decimals(total_amortizado,2),'total_pendiente':truncate_decimals(total_pendiente,2)};
            //         $scope.tabla_prestamo.push(cuota);
            //     }
            // }

            function calcularFrances() {
                
                total_pendiente * 100;//centimos
                total_cuota = ((total_pendiente * interes) / (1-(Math.pow(1+interes,-duracion))));
                total_cuota = Math.round((total_cuota + Number.EPSILON) * 100) / 100;
                
                for (let i = 0; i < duracion; i++) {
                    interes_cuota = (total_pendiente * interes);
                    amortizado_cuota = (total_cuota - interes_cuota);
                    total_amortizado += (amortizado_cuota);
                    total_pendiente -= (amortizado_cuota);

                    const cuota = {"interes_cuota":truncate_decimals(interes_cuota,2),'total_cuota':truncate_decimals(total_cuota,2),'amortizado_cuota':truncate_decimals(amortizado_cuota,2),'total_amortizado':truncate_decimals(total_amortizado,2),'total_pendiente':truncate_decimals(total_pendiente,2)};
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

                    const cuota = {"interes_cuota":truncate_decimals(interes_cuota,2),'total_cuota':truncate_decimals(total_cuota,2),'amortizado_cuota':truncate_decimals(amortizado_cuota,2),'total_amortizado':truncate_decimals(total_amortizado,2),'total_pendiente':truncate_decimals(total_pendiente,2)};
                    $scope.tabla_prestamo.push(cuota);
                }
            }
        
            function calcularSimple() {
        
            }
        
            function calcularAmericano() {
        
            }
    }
})



function truncate_decimals(num, fixed = 2) {
        // var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        // truncated_number =  num.toString().match(re)[0];

    truncated_number =  Math.round((num + Number.EPSILON) * 100) / 10000  ;
    return parseFloat(truncated_number);
}