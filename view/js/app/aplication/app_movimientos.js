import { user_class } from "../../class/user/user_class.js";
import { user_list } from "../../class/user/user_list.js";
import { controller_url_User } from "../../dictionary/dictionary_user.js"
import { empty_input, show_Modal , quit_Modal } from "../../functions/modal.js"
import { fetch_get_Data } from "../../server/server.js"
import { controller_url_account_List } from "../../dictionary/dictionary_account.js";

import { controller_url_moves_List } from "../../dictionary/dictionary_moves.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, $http) {

    $scope.init = function () {
        $('.loading').fadeOut();
        $http.post((controller_url_User('login_verify'))).then((res) => {
            const result = res.data;
            if (result.logged !== true) {
                location.href = '../web/login.html'
            } else {
                $scope.list_user = new user_list();
                $scope.user_logged =  new user_class(result.user.id_user, result.user.gmail, result.user.NIF , result.user.foto, result.user.name , result.user.surname , result.user.password , result.user.admin , result.user.login_tries);
                $scope.menu_status = localStorage.getItem('menu_status');
                $scope.body_status = localStorage.getItem('menu');
                $scope.load_Financial_data();  
                $scope.index_account = 0;  
                $('body').removeClass('hidden');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    $scope.load_Financial_data = function () {
        $http.post((controller_url_account_List('load_own'))).then((res) => {
            $scope.result = res.data;
            reload_data_Financial();
        }).catch((err) => {
            console.log(err);
        });
    }

    function reload_data_Financial () {
        // variables de cuentas //
        $scope.account_array_scroll = $scope.result; // array de scroll con sus respectivas posiciones //
        $scope.account_array_now = $scope.result[$scope.index_account]; // datos de la cuenta actual //
        $scope.balance_user = parseFloat($scope.account_array_now.balance).toFixed(2);

    }

    $scope.filter_Financial_data = function (index) {
        $scope.index_account = index;
        reload_data_Financial();
    }

    $scope.view_move = (filter_type) => {

        const start_date = $('#start_date').val();
        const end_date = $('#end_date').val();

        const data = {'start_date' :start_date, 'end_date' :end_date, 'filter_type' :filter_type, 'IBAN' :$scope.account_array_now.IBAN, }
        console.log(data);
        $http({
            url: controller_url_moves_List('load_own'),
            method: "POST",
            data: JSON.stringify(data)
        }).then(function (result) {
            console.log (result.data)
        }).catch(function (result) {
            console.error("Ocurrio un error", result.status, result.data);
        })    

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