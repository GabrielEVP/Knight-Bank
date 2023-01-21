import { user_class } from "../../class/user/user_class.js";
import { user_list } from "../../class/user/user_list.js";
import { controller_url_User } from "../../class/user/dictionary_user.js"
import { show_Modal , quit_Modal } from "../../components/modal.js"

import { controller_url_move } from "../../class/move/dictionary_account_move.js";
import { controller_url_account_List } from "../../class/account/dictionary_account.js";

import { fetch_get_Data, fetch_set_Data } from "../../server/server.js"

import { keypress_condition, comprobator_input } from "../../functions/verification_form.js";

import { generator_config_CircularMonth, generator_config_BarMonth  } from "./graficos.js";


const App = angular.module('App', []);

App.controller('Controler', function($scope, $http) {

    window.onload = function () {
        keypress_condition("#money_operation", "0123456789,.");
    }

    $scope.init = function () {
        $('.loading').fadeOut();
        $http.post((controller_url_User('login_verify'))).then((res) => {
            const result = res.data;          
            if (result.logged !== true) {
                location.href = '../web/login.html'
            } else {
                $scope.menu_status = localStorage.getItem('menu_status');
                $scope.body_status = localStorage.getItem('menu');
                $scope.list_user = new user_list();
                $scope.user_logged =  new user_class(result.user.id_user, result.user.gmail, result.user.NIF , result.user.foto, result.user.name , result.user.surname , result.user.password , result.user.admin , result.user.login_tries);
                $scope.load_Financial_data();
                $scope.account_all();
                $('body').removeClass('hidden');
                $scope.index_account = 0;
                $scope.chartbar;
                $scope.chartdoughnut;
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    $scope.account_all = function () {
        $http.post((controller_url_account_List('all'))).then((res) => {
            $scope.result_all_iban = res.data.list;
        }).catch((err) => {
            console.log(err);
        });
    }
   
    $scope.load_Financial_data = function () {
        $http.post((controller_url_account_List('financial'))).then((res) => {
            $scope.result = res.data;
            reload_data_Financial();
        }).catch((err) => {
            console.log(err);
        });
    }

    const ctx_bar = document.getElementById('bar_year').getContext("2d");
    const ctx_circular = document.getElementById('circular_month').getContext("2d");
 
    function reload_data_Financial () {
        // variables de cuentas //
        $scope.account_array_scroll = $scope.result.accounts; // array de scroll con sus respectivas posiciones //
        $scope.account_array_now = $scope.result.accounts[$scope.index_account]; // datos de la cuenta actual //

        // variables de graficos doughnut (circular) //
        $scope.graficDOUGHNUT_financial_income = $scope.result.present_financial_data[$scope.index_account].income[0].expenses_income;
        $scope.graficDOUGHNUT_financial_expense = $scope.result.present_financial_data[$scope.index_account].expenses[0].expenses_income;

        // variables de graficos pie (mensual de barra) //
        $scope.graficBAR_financial_income = $scope.result.monthly_financial_data[$scope.index_account].income;
        $scope.graficBAR_financial_expenses = $scope.result.monthly_financial_data[$scope.index_account].expenses;

        // variables de despejes de graficos bar //
        $scope.expenses = new Array();
        $scope.income = new Array();

        for (const iterator of $scope.graficBAR_financial_income) {
            $scope.income.push(iterator.expenses_income)
        }

        for (const iterator of $scope.graficBAR_financial_expenses) {
            $scope.expenses.push(+Math.abs(iterator.expenses_income))
        }
       
        if ($scope.chartdoughnut != null) $scope.chartdoughnut.destroy();
        $scope.chartdoughnut = new Chart(ctx_circular, generator_config_CircularMonth($scope.graficDOUGHNUT_financial_income ,$scope.graficDOUGHNUT_financial_expense));

        if ($scope.chartbar != null) $scope.chartbar.destroy();
        $scope.chartbar = new Chart(ctx_bar,  generator_config_BarMonth($scope.income ,$scope.expenses));  
    }


    $scope.filter_Financial_data = function (index) {
        $scope.index_account = index;
        reload_data_Financial();
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
            console.log(data)
            const result = await fetch_set_Data(controller_url_move('new') , data);
 

            if (result.status == 'ok') {
                location.reload();
            } else {
                console.error('error en la operacion');
            }
        //})
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
});