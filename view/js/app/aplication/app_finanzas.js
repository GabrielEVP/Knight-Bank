import { user_class } from "../../class/user/user_class.js";
import { user_list } from "../../class/user/user_list.js";
import { controller_url_User } from "../../class/user/dictionary_user.js"
import { show_Modal , quit_Modal } from "../../components/modal.js"

import { controller_url_move } from "../../class/move/dictionary_account_move.js";
import { controller_url_account_List } from "../../class/account/dictionary_account.js";

import { fetch_get_Data, fetch_set_Data } from "../../server/server.js"

import { keypress_condition, comprobator_input } from "../../functions/verification_form.js";


const App = angular.module('App', []);

App.controller('Controler', function($scope, $http) {

    window.onload = function () {
        keypress_condition("#money_operation", "0123456789,.");
    }

    $scope.init = function () {
        $('.loading').fadeOut();
        $http.get((controller_url_User('login_verify'))).then((res) => {
            const result = res.data;          
            if (result.logged !== true) {
                location.href = '../web/login.html'
            } else {
                $scope.menu_status = localStorage.getItem('menu_status');
                $scope.body_status = localStorage.getItem('menu');
                $scope.list_user = new user_list();
                $scope.user_logged =  new user_class(result.user.id_user, result.user.gmail, result.user.NIF , result.user.foto, result.user.name , result.user.surname , result.user.password , result.user.admin , result.user.login_tries);
                $('body').removeClass('hidden');
                $scope.load_account_Own();
                $scope.load_Financial_data();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    $scope.load_account_Own = function () {
        $http.get((controller_url_account_List('load_own'))).then((res) => {
            const result = res.data;          
            //console.log(result)
        }).catch((err) => {
            console.log(err);
        });

    }

    $scope.load_Financial_data = function () {
        $http.get((controller_url_account_List('financial'))).then((res) => {
            const result = res.data;

            $scope.account_array = result.accounts;
            $scope.account_array_now = result.accounts[0];
            $scope.monthly_financial_data_array = result.monthly_financial_data;
            $scope.present_financial_data = result.present_financial_data;

            $scope.graficPIE_financial_expense = $scope.present_financial_data[0].expenses[0].expenses_income;
            $scope.graficPIE_financial_income = $scope.present_financial_data[0].income[0].expenses_income;

            console.log($scope.account_array);
            console.log($scope.monthly_financial_data_array[0].expenses);
            console.log($scope.present_financial_data);


            const ctx_bar = document.getElementById('bar_year').getContext("2d");
            const ctx_circular = document.getElementById('circular_month').getContext("2d");
            generator_CircularMonth(ctx_circular,$scope.graficPIE_financial_expense, $scope.graficPIE_financial_income);
            generator_BarMonth(ctx_bar,$scope.monthly_financial_data_array[0].expenses);
        }).catch((err) => {
            console.log(err);
        });

    }

    $scope.show_OperationBank = function(class_element, id_account) {
        show_Modal(class_element);
    }

    $scope.do_OperationBank = async function(operation) {
        //$('#form_operationBank').click(async function() {
            var amount = $('#amount').val();
            var sender_IBAN = $('#sender_IBAN').val();
            var notion = $('#notion').val();
            var receiver_IBAN;

            if (operation == 'withdrawal' ) amount = -Math.abs(amount);
            if (operation == 'transference') receiver_IBAN = $('#receiver_IBAN').val(); 

            const data = { "sender_IBAN" : sender_IBAN, "amount" :amount, "notion" :notion, "receiver_IBAN" :receiver_IBAN, "move_type" :operation };
            const result = await fetch_set_Data(controller_url_move('new') , data);

            if (result.status == 'ok') {
                location.reload();
            } else {
                console.error('error en la operacion');
            }
       // })
    }    

    $scope.close = function() {
        quit_Modal();
    }

    $scope.logout = async function() {
        const result = await fetch_get_Data(controller_url_User('logout'));
        console.log(result);
        if (result.logout == true) {
            location.href='../web/login.html';
        } else {
            alert('error');
        }
    }

    // Grafico Mensual Ciruclar //
    const generator_CircularMonth = (Canvas, expense , income) => {
        const gastos = expense;
        const ingresos = income;
        const total_calculus = parseFloat(ingresos) + parseFloat(gastos);
        var color;
        var total;
        var datasets;

        if (total_calculus == 0) {
            datasets = [{
                data:[1],
                backgroundColor:[
                    'rgb(80, 80, 80)'
                ]
            }]
            total = ['Total: '+total_calculus+' €'];
        } else {
            datasets = [{
                data:[ingresos,gastos],
                backgroundColor:[
                    'rgb(0, 255, 71)',
                    'rgb(255, 0, 0)'
                ]
            }]
            total = ['Total: '+total_calculus.tofixed(2)+' €'];
        }

        if (total_calculus > 0) {
            color = 'green'
        } else if (total_calculus == 0) {
            color = 'gray'
        } else {
            color = 'red'
        }

        new Chart(Canvas, {
            type:"doughnut",
            data: {
                labels: ['Ingresos' , 'Gastos'],
                datasets: datasets,
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
                        text: total,
                        padding: {
                            top: 20,
                        }
                    }
                }
            },
        })
    }

    // Grafico Mensual bar //
    const generator_BarMonth = (Canvas , expense) => {
        const month = ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo' ,'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        const profits_year = [2,3,4,5,1272,7,1272,1272.23,1272,4,1272,3]
        const losses = [expense];
        console.log(losses);

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
});

