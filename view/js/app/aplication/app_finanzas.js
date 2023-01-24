import { user_class } from "../../class/user/user_class.js";
import { controller_url_User } from "../../dictionary/dictionary_user.js"

import { controller_url_move } from "../../dictionary/dictionary_account_move.js";
import { controller_url_account_List } from "../../dictionary/dictionary_account.js"

import { fetch_get_Data, fetch_set_Data, login_Process , logout_Process } from "../../server/server.js"

import { } from "../../functions/navbar_aplication.js"
import { verification_status_proces } from "../../functions/verification_form.js";
import { show_Modal , quit_Modal } from "../../functions/modal.js"
import { generator_config_CircularMonth, generator_config_BarMonth  } from "../../functions/graficos.js";


const App = angular.module('App', []);
App.controller('Controler', ($scope, $http) => {

    const ctx_bar = document.getElementById('bar_year').getContext("2d");
    const ctx_circular = document.getElementById('circular_month').getContext("2d");

    window.onload = function () {
        keypress_condition("#money_operation", "0123456789,.");
    }

    // cuando carga el dom realiza estos procesos para el uso del programa // 
    $scope.init = () => {
        $('.loading').fadeOut();
        $http.post((controller_url_User('login_verify'))).then((res) => {
            login_Process(res.data.logged, (menu, body) => {
                $scope.user_logged = new user_class(res.data.user.id_user, res.data.user.gmail, res.data.user.NIF , res.data.user.foto, res.data.user.name , res.data.user.surname , res.data.user.password , res.data.user.admin , res.data.user.login_tries);
                $scope.menu_status = menu;
                $scope.body_status = body;
                $scope.index_account = 0;
                $scope.chartbar;
                $scope.chartdoughnut;
                $scope.load_Financial_data();
                $scope.account_all();
            });        
        }).catch((err) => {
            console.log(err);
        });
    }

    // carga todos los numeros de cuenta que estan habilitadas en el servidor //
    $scope.account_all = () => {
        $http.post((controller_url_account_List('all'))).then((res) => {
            $scope.result_all_iban = res.data.list;
        }).catch((err) => {
            console.log(err);
        });
    }
   
    // recibe Todos los datos necesarios para mostrar los numero de cuenta de el usuario como sus respectivos balances  (por defecto carga el primer numero de cuenta) //
    $scope.load_Financial_data = () => {
        $http.post((controller_url_account_List('financial'))).then((res) => {
            $scope.result = res.data;
            reload_data_Financial();
        }).catch((err) => {
            console.log(err);
        });
    }

    // actualiza asincronamente los datos dependiendo del numero de cuenta del cliente //
    function reload_data_Financial () {
        // variables de cuentas //
        $scope.account_array_scroll = $scope.result.accounts; // array de scroll con sus respectivas posiciones //
        $scope.account_array_now = $scope.result.accounts[$scope.index_account]; // datos de la cuenta actual //
        $scope.balance_user = parseFloat($scope.account_array_now.balance).toFixed(2);

        // variables de graficos doughnut (circular) //
        $scope.graficDOUGHNUT_financial_income = $scope.result.present_financial_data[$scope.index_account].income[0].expenses_income;
        $scope.graficDOUGHNUT_financial_expense = $scope.result.present_financial_data[$scope.index_account].expenses[0].expenses_income;

        // variables de graficos pie (mensual de barra) //
        $scope.graficBAR_financial_income = $scope.result.monthly_financial_data[$scope.index_account].income;
        $scope.graficBAR_financial_expenses = $scope.result.monthly_financial_data[$scope.index_account].expenses;

        // variables de despejes de graficos bar //
        $scope.expenses = new Array();
        $scope.income = new Array();
       
        // bucle para asignar en un array los datos necesarios para el grafico anual de bar //
        for (const iterator of $scope.graficBAR_financial_income) $scope.income.push(iterator.expenses_income);
        for (const iterator of $scope.graficBAR_financial_expenses) $scope.expenses.push(+Math.abs(iterator.expenses_income));
      
        // generacion de graficos //
        if ($scope.chartdoughnut != null) $scope.chartdoughnut.destroy();
        $scope.chartdoughnut = new Chart(ctx_circular, generator_config_CircularMonth($scope.graficDOUGHNUT_financial_income ,$scope.graficDOUGHNUT_financial_expense));

        if ($scope.chartbar != null) $scope.chartbar.destroy();
        $scope.chartbar = new Chart(ctx_bar,  generator_config_BarMonth($scope.income ,$scope.expenses));  
    }

    // filtra dependiendo del numero de cuenta clickeado por parte del scroll //
    $scope.filter_Financial_data = (index) => {
        $scope.index_account = index;
        reload_data_Financial();
    }

    // abre el modal para realizar las respectivas operaciones (ingresar, retirar, transferir) //
    $scope.show_OperationBank = (class_element) => {
        show_Modal(class_element);
    }

    // manda al servidor las respectivas operaciones (ingresar, retirar, transferir) //
    $scope.do_OperationBank = (operation) => {
        $('#form_operationBank').click(async () => {
            var amount = $('#amount').val();
            var sender_IBAN = $('#sender_IBAN').val();
            var notion = $('#notion').val();
            var receiver_IBAN;

            if (operation == 'withdrawal' ) amount = -Math.abs(amount);
            if (operation == 'transference') receiver_IBAN = $('#receiver_IBAN').val(); 

            const data = { "sender_IBAN" : sender_IBAN, "amount" :amount, "notion" :notion, "receiver_IBAN" :receiver_IBAN, "move_type" :operation };
            const result = await fetch_set_Data(controller_url_move('new') , data);
            verification_status_proces(result.status);
        })
    }    

    // cierra el modal //
    $scope.close = () => {
        quit_Modal();
    }

    // rompe la seccion //
    $scope.logout = async function() {
        const result = await fetch_get_Data(controller_url_User('logout'));
        logout_Process(result.logout);
    }

});