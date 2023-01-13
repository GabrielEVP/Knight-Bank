import { truncate_decimals , process_number_format  } from "../../functions/calculus.js";
import { keypress_condition } from "../../functions/verification_form.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope) {

    window.onload = function () {
        keypress_condition("#porcentajeInteres", "0123456789.");
        keypress_condition("#duracion_anos", "0123456789");
        keypress_condition("#duracion_meses", "0123456789");
        keypress_condition("#carencia", "0123456789");
        keypress_condition("#totalPrestado", "0123456789");
    }

    $scope.tabla_prestamo = Array();
    $scope.show_table = false;

    $scope.model_tipo = "frances";
    $scope.model_carencia = "0";

    $(".mostrar_periodo_amortizacion").show();
    $(".mostrar_periodo_interes").show();
    $(".mostrar_carencia").show();
    $(".mostrar_duracion_carencia").hide();
    $(".duracion_meses").show();
    
    $( "#tipoPrestamo" ).change(function() {
        const tipoPrestamo = $("#tipoPrestamo").val();
        if (tipoPrestamo == "frances" || tipoPrestamo == "lineal") {

            $(".mostrar_periodo_amortizacion").show();
            $(".mostrar_periodo_interes").show();
            $(".mostrar_carencia").show();
            $(".mostrar_duracion_carencia").hide();
            $(".duracion_meses").show();

            $("#tipoAmortizacion").val(12);
            $("#tipoInteres").val(12);
            $("#tipoCarencia").val(0);
            $("#carencia").val(0);
        } else {
            
            $(".mostrar_periodo_amortizacion").hide();
            $(".mostrar_periodo_interes").hide();
            $(".mostrar_carencia").hide();
            $(".mostrar_duracion_carencia").hide();
            $(".duracion_meses").hide();

            $("#tipoAmortizacion").val(12);
            $("#tipoInteres").val(12);
            $("#tipoCarencia").val(0);
            $("#carencia").val(0);
        }
    });

    $("#tipoCarencia").change(function() {
        const tipo_carencia = $("#tipoCarencia").val(); 
        if (tipo_carencia == "0") {
            $(".mostrar_duracion_carencia").hide();
            $("#carencia").val(0);
        } else {
            $(".mostrar_duracion_carencia").show();
        }
    });

    $scope.calcularPrestamo = function () {
        $scope.tabla_prestamo = Array();

        const tipoPrestamo = $("#tipoPrestamo").val();

        const tipo_amortizacion = $("#tipoAmortizacion").val();
        const tipo_interes = $("#tipoInteres").val();
        const tipo_carencia = $("#tipoCarencia").val();
        const duracion_carencia = $("#carencia").val();//temporal_meses

        const porcentaje_interes = $("#porcentajeInteres").val();
        const interes = porcentaje_interes/100;
        const duracion = parseInt($("#duracion_anos").val() * 12) + parseInt($("#duracion_meses").val());//meses 
        
        var total_pendiente = $("#totalPrestado").val();
        var total_amortizado = 0;

        var amortizado_cuota = 0;
        var total_cuota = 0;
        var interes_cuota = 0;

        if (parseInt(tipo_amortizacion) < parseInt(tipo_interes)) {
            alert("el periodo de amortizacion debe ser igual o mayor al de carencia");
        } else if (duracion != '' && porcentaje_interes !='' && tipoPrestamo != '' && total_pendiente != '') {    

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
                    alert("error al seleccionar tipo de simulacion");
                } 
            console.log($scope.tabla_prestamo);
        
            function calcularFrances() {
                var anos = (duracion / 12);   
                const interes_K = Math.pow( (1 + interes) ,1/(12/tipo_interes) ) - 1;

                var inicio_contador_anos = 1;
                var inicio_contador_mes = 1;


                if (duracion_carencia > 0 && tipo_carencia != 0) {
                    var anos_carencia = duracion_carencia/12;
                    if (anos_carencia % 1 != 0) {
                        anos_carencia++;
                    }
                    var fin_carencia = false;
                    for (let i = 1; i <= anos_carencia; i++) {
                        var contador_periodo = 0;
                        for (let j = 1; j < 13 && fin_carencia == false && !(((i - 1) * 12) + j >= duracion_carencia); j++) {
                            var check = false;
                            interes_cuota = 0;
                            amortizado_cuota = 0;
                            total_cuota = 0;

                            if ( j % (tipo_interes) == 0 ) {
                                check = true;
                                if (tipo_carencia == 1) {
                                    interes_cuota = total_cuota = (Math.pow( (1 + interes) ,1/(12/tipo_interes)) * total_pendiente) - total_pendiente;
                                } else if (tipo_carencia == 2) {
                                    total_pendiente = parseFloat(total_pendiente) + parseFloat( (Math.pow( (1 + interes) ,1/(12/tipo_interes)) * total_pendiente) - total_pendiente );
                                }
                            }

                            if ( ((i - 1) * 12) + j == duracion_carencia) {
                                fin_carencia = true;
                                inicio_contador_mes = j + 1;
                            }
                            if (check) { 
                                contador_periodo++;
                                const cuota = {"ano":i,"periodo":contador_periodo,"interes_cuota":process_number_format(interes_cuota),'total_cuota':process_number_format(total_cuota),'amortizado_cuota':process_number_format(0),'total_amortizado':process_number_format(0),'total_pendiente':process_number_format(total_pendiente)};
                                $scope.tabla_prestamo.push(cuota);
                            }
                        }
                    }

                    inicio_contador_anos = truncate_decimals((anos_carencia + 1),0);
                    
                } 
                
                const calculo_cuota = (total_pendiente * interes_K) / (1 - Math.pow((1 + interes_K), ( ((12/tipo_amortizacion) * - truncate_decimals( ((duracion - duracion_carencia)/12),0 )))) );

                if (anos % 1 != 0) {
                    anos++;
                }
                if (inicio_contador_mes == 13) {
                    inicio_contador_mes = 1;
                }

                var fin_prestamo = false;
                for (let i = inicio_contador_anos; i <= anos; i++) {
                    var contador_periodo = 0;
                    for (let j = inicio_contador_mes ; j < 13 && fin_prestamo == false && !(((i - 1) * 12) + j > duracion) && total_pendiente > 0; j++) {
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
                    }
                    inicio_contador_mes = 1;
                }
            }

            function calcularLineal() {
                var anos = duracion / 12;   

                var inicio_contador_anos = 1;
                var inicio_contador_mes = 1;

                if (duracion_carencia > 0 && tipo_carencia != 0 && ((duracion_carencia/tipo_amortizacion > 1) ||(duracion_carencia/tipo_interes > 1)  ) ) {
                    var anos_carencia = duracion_carencia/12;
                    if (anos_carencia % 1 != 0) {
                        anos_carencia++;
                    }
                    var fin_carencia = false;
                    for (let i = 1; i <= anos_carencia; i++) {
                        var contador_periodo = 0;
                        for (let j = 1; j < 13 && fin_carencia == false && !(((i - 1) * 12) + j >= duracion_carencia); j++) {
                            var check = false;
                            interes_cuota = 0;
                            amortizado_cuota = 0;
                            total_cuota = 0;

                            if ( j % (tipo_interes) == 0 ) {
                                check = true;
                                if (tipo_carencia == 1) {
                                    interes_cuota = total_cuota = (Math.pow( (1 + interes) ,1/(12/tipo_interes)) * total_pendiente) - total_pendiente;
                                } else if (tipo_carencia == 2) {
                                    total_pendiente = parseFloat(total_pendiente) + parseFloat( (Math.pow( (1 + interes) ,1/(12/tipo_interes)) * total_pendiente) - total_pendiente );
                                }
                            }

                            if ( ((i - 1) * 12) + j == duracion_carencia) {
                                fin_carencia = true;
                                inicio_contador_mes = j + 1;
                                console.log("hola");
                            }
                            if (check) { 
                                contador_periodo++;
                                const cuota = {"ano":i,"periodo":contador_periodo,"interes_cuota":process_number_format(interes_cuota),'total_cuota':process_number_format(total_cuota),'amortizado_cuota':process_number_format(0),'total_amortizado':process_number_format(0),'total_pendiente':process_number_format(total_pendiente)};
                                $scope.tabla_prestamo.push(cuota);
                            }
                        }
                    }
                    
                    inicio_contador_anos = truncate_decimals((anos_carencia + 1),0);
                } 

                if (anos % 1 != 0) {
                    anos++;
                }
                if (inicio_contador_mes == 13) {
                    inicio_contador_mes = 1;
                }

                console.log(inicio_contador_anos);
                console.log(inicio_contador_mes);
                const amortizacion = total_pendiente / truncate_decimals( ((duracion - duracion_carencia)/tipo_amortizacion) ,0);

                var fin_prestamo = false;
                for (let i = inicio_contador_anos; i <= anos; i++) {
                    var contador_periodo = 0;
                    for (let j = inicio_contador_mes; j < 13 && fin_prestamo == false && !(((i - 1) * 12) + j > duracion) && total_pendiente > 0; j++) {
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
                        //delete(check);
                    }
                    inicio_contador_mes = 1;
                }
            }
        
            function calcularSimple() {
                const duracion_bucle = duracion / tipo_amortizacion - 1;

                for (let i = 0; i < duracion_bucle; i++) {
                    const cuota = {"periodo":i+1,"interes_cuota":process_number_format(0),'total_cuota':process_number_format(0),'amortizado_cuota':process_number_format(0),'total_amortizado':process_number_format(0),'total_pendiente':process_number_format(total_pendiente)};
                    $scope.tabla_prestamo.push(cuota);
                }
                //delete duracion_bucle;

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
                    //delete duracion_bucle;
                    const cuota = {"periodo":i+1,"interes_cuota":process_number_format(interes_cuota/100),'total_cuota':process_number_format(total_cuota/100),'amortizado_cuota':process_number_format(amortizado_cuota/100),'total_amortizado':process_number_format(total_amortizado/100),'total_pendiente':process_number_format(total_pendiente/100)};
                    $scope.tabla_prestamo.push(cuota);
                }
            }
        }
    }

})