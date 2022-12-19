const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

    var tabla_prestamo = Array();
    $scope.calcularPrestamo = function () {

        const tipoPrestamo = $("#tipoPrestamo").val();

        const porcentaje_interes = $("#porcentajeInteres").val();
        const duracion = $("#duracion").val();//años

        var total_pendiente = $("#totalPrestado").val();
        var total_amortizado = 0;

        var amortizado_cuota = 0;
        var total_cuota = 0;
        var interes_cuota = 0;
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

            function calcularFrances() {
                for (let i = 0; i < duracion; i++) {
                    
                }
            }
        
            function calcularLineal() {
                amortizado_cuota = total_pendiente / duracion;
                for (let i = 0; i < duracion; i++) {
                    interes_cuota = total_pendiente * (porcentaje_interes / 100);
                    total_cuota = interes_cuota + amortizado_cuota;   
                    total_amortizado += amortizado_cuota;     
                    total_pendiente -= amortizado_cuota;

                    const cuota = {"interes_cuota":interes_cuota,'total_cuota':total_cuota,'amortizado_cuota':amortizado_cuota,'total_amortizado':total_amortizado,'total_pendiente':total_pendiente};
                    tabla_prestamo.push(cuota);
                }
                console.log(tabla_prestamo);
            }
        
            function calcularSimple() {
        
            }
        
            function calcularAmericano() {
        
            }
    }



})