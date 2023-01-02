const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

    $scope.tabla_prestamo = Array();
    $scope.show_table = false;

    $scope.calcularPrestamo = function () {
        $scope.tabla_prestamo = Array();

        const tipoPrestamo = $("#tipoPrestamo").val();

        const tipo_amortizacion = $("#tipoAmortizacion").val();
        const tipo_interes = $("#tipoInteres").val();
        const tipo_carencia = $("#tipoCarencia").val();
        const carencia = $("#carencia").val();

        const porcentaje_interes = $("#porcentajeInteres").val();
        const interes = porcentaje_interes/100;
        const duracion = parseInt($("#duracion_anos").val() * 12) + parseInt($("#duracion_meses").val());//meses 
        
        var total_pendiente = $("#totalPrestado").val();
        var total_amortizado = 0;

        var amortizado_cuota = 0;
        var total_cuota = 0;
        var interes_cuota = 0;

        if (duracion != '' && porcentaje_interes !='' && tipoPrestamo != '' && total_pendiente != '') {    

            $scope.show_table = true;

            const cuota = {"ano":0,"periodo":0,"interes_cuota":process_number_format(interes_cuota),'total_cuota':process_number_format(total_cuota),'amortizado_cuota':process_number_format(amortizado_cuota),'total_amortizado':process_number_format(total_amortizado),'total_pendiente':process_number_format(total_pendiente)};
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
                var anos = (duracion / 12);   
                const interes_K = Math.pow( (1 + interes) ,1/(12/tipo_interes) ) - 1;
                const calculo_cuota = (total_pendiente * interes_K) / (1 - Math.pow((1 + interes_K), ( ((12/tipo_amortizacion) * -anos))) );

                if (anos % 1 != 0) {
                    anos++;
                }
                
                var fin_prestamo = false;
                for (let i = 1; i <= anos; i++) {
                    var contador_periodo = 0;
                    for (let j = 1; j < 13 && fin_prestamo == false; j++) {
                        var check = false;

                        interes_cuota = 0;
                        amortizado_cuota = 0;
                        total_cuota = 0;

                        if ( j % (tipo_interes) == 0 ) {
                            interes_cuota = (Math.pow( (1 + interes) ,1/(12/tipo_interes)) * total_pendiente) - total_pendiente;
                            check = true;
                        }

                        if ( j % (tipo_amortizacion) == 0 ) {
                            total_cuota = calculo_cuota;
                            amortizado_cuota = calculo_cuota - interes_cuota;
                            check = true;
                        }

                        if (check) {
                            total_cuota = interes_cuota + amortizado_cuota;
                            total_pendiente = total_pendiente - amortizado_cuota;
                            total_amortizado += amortizado_cuota;

                            if ( ((i - 1) * 12) + j == duracion) {
                                console.log(i);
                                console.log(j);
                                fin_prestamo = true;
                                if (total_pendiente != 0) {
                                    amortizado_cuota += total_pendiente;
                                    total_cuota += total_pendiente;
                                    total_amortizado += total_pendiente; 
    
                                    total_pendiente = 0;
                                }
                            }

                            contador_periodo++;

                            const cuota = {"ano":i,"periodo":contador_periodo,"interes_cuota":process_number_format(interes_cuota),'total_cuota':process_number_format(total_cuota),'amortizado_cuota':process_number_format(amortizado_cuota),'total_amortizado':process_number_format(total_amortizado),'total_pendiente':process_number_format(total_pendiente)};
                            $scope.tabla_prestamo.push(cuota);
                        }
                        delete(check);
                    }
                }
            }

            function calcularLineal() {
                var anos = duracion / 12;   
                const amortizacion = total_pendiente / (duracion/tipo_amortizacion);

                if (anos % 1 != 0) {
                    anos++;
                }

                var fin_prestamo = false;
                for (let i = 1; i <= anos; i++) {
                    var contador_periodo = 0;
                    for (let j = 1; j < 13 && fin_prestamo == false; j++) {
                        var check = false;
                        interes_cuota = 0;
                        amortizado_cuota = 0;

                        if ( j % (tipo_interes) == 0 ) {
                            interes_cuota = (Math.pow( (1 + interes) ,1/(12/tipo_interes)) * total_pendiente) - total_pendiente;
                            check = true;
                        }

                        if ( j % (tipo_amortizacion) == 0 ) {
                            amortizado_cuota = amortizacion;
                            check = true;
                        }

                        if (check) {
                            total_cuota = interes_cuota + amortizado_cuota;
                            total_pendiente = total_pendiente - amortizado_cuota;
                            total_amortizado += amortizado_cuota;

                            if ( ((i - 1) * 12) + j == duracion) {
                                fin_prestamo = true;
                                if (total_pendiente != 0) {
                                    amortizado_cuota += total_pendiente;
                                    total_cuota += total_pendiente;
                                    total_amortizado += total_pendiente; 
    
                                    total_pendiente = 0;
                                }
                            }

                            contador_periodo++;

                            const cuota = {"ano":i,"periodo":contador_periodo,"interes_cuota":process_number_format(interes_cuota),'total_cuota':process_number_format(total_cuota),'amortizado_cuota':process_number_format(amortizado_cuota),'total_amortizado':process_number_format(total_amortizado),'total_pendiente':process_number_format(total_pendiente)};
                            $scope.tabla_prestamo.push(cuota);
                        }
                        delete(check);
                    }
                }
            }
        
            function calcularSimple() {
                const duracion_bucle = duracion / tipo_amortizacion - 1;

                for (let i = 0; i < duracion_bucle; i++) {
                    const cuota = {"periodo":i+1,"interes_cuota":process_number_format(0),'total_cuota':process_number_format(0),'amortizado_cuota':process_number_format(0),'total_amortizado':process_number_format(0),'total_pendiente':process_number_format(total_pendiente)};
                    $scope.tabla_prestamo.push(cuota);
                }
                delete duracion_bucle;

                amortizado_cuota += total_pendiente;
                total_amortizado += total_pendiente; 

                interes_cuota = ( (total_pendiente * (Math.pow( (1 + interes), duracion ) ) ) - total_pendiente);
                total_cuota = parseFloat(interes_cuota) + parseFloat(total_pendiente);

                total_pendiente = 0;

                const cuota = {"periodo":duracion,"interes_cuota":process_number_format(interes_cuota),'total_cuota':process_number_format(total_cuota),'amortizado_cuota':process_number_format(amortizado_cuota),'total_amortizado':process_number_format(total_amortizado),'total_pendiente':process_number_format(total_pendiente)};
                $scope.tabla_prestamo.push(cuota);
            }
        
            function calcularAmericano() {
                const duracion_bucle = duracion / tipo_amortizacion;

                total_pendiente = total_pendiente * 100;//centimos
                interes_cuota = parseInt(truncate_decimals(( (total_pendiente * interes) / (12/tipo_interes) ),0));
                total_cuota = interes_cuota;
                for (let i = 0; i < duracion_bucle; i++) {

                    if (i == (duracion_bucle - 1)) {
                        amortizado_cuota += total_pendiente;
                        total_cuota += total_pendiente;
                        total_amortizado += total_pendiente; 

                        total_pendiente = 0;
                    }
                    delete duracion_bucle;
                    const cuota = {"periodo":i+1,"interes_cuota":process_number_format(interes_cuota/100),'total_cuota':process_number_format(total_cuota/100),'amortizado_cuota':process_number_format(amortizado_cuota/100),'total_amortizado':process_number_format(total_amortizado/100),'total_pendiente':process_number_format(total_pendiente/100)};
                    $scope.tabla_prestamo.push(cuota);
                }
            }
        }
    }


    // $scope.mostrarCarencia = function () {
    //     console.log("aaa");
    //     if ($("tipoCarencia").val() == 0) {
    //         $("div_carencia").style("display","none");
    //     } else {
    //         $("div_carencia").style("display","block");
    //     }
    // }
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

