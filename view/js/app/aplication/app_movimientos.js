import { user_class } from "../../class/user/user_class.js";
import { controller_url_User } from "../../dictionary/dictionary_user.js"

import { controller_url_account_List } from "../../dictionary/dictionary_account.js";
import { controller_url_moves_List } from "../../dictionary/dictionary_moves.js";

import { fetch_get_Data, login_Process , logout_Process } from "../../server/server.js"

import { } from "../../functions/navbar_aplication.js"

const App = angular.module('App', []);
App.controller('Controler', ($scope, $http) => {

    // cuando carga el dom realiza estos procesos para el uso del programa // 
    $scope.init = () => {
        $('.loading').fadeOut();
        $http.post((controller_url_User('login_verify'))).then((res) => {
            login_Process(res.data.logged, (menu, body) => {
                $scope.user_logged = new user_class(res.data.user.id_user, res.data.user.gmail, res.data.user.NIF, res.data.user.foto, res.data.user.name, res.data.user.surname, res.data.user.password, res.data.user.admin, res.data.user.login_tries);
                $scope.menu_status = menu;
                $scope.body_status = body;
                $scope.index_account = 0;  
                $scope.load_Move_Data(); 
            });        
        }).catch((err) => {
            console.log(err);
        });
    }

    // Carga todos numero de cuenta el usuario y llama a reload move para que cargue los movimiento del primer numero de cuenta //
    $scope.load_Move_Data = () => {
        $http.post((controller_url_account_List('load_own'))).then((res) => {
            $scope.result = res.data;
            reload_data_Move();
        }).catch((err) => {
            console.log(err);
        });
    }

    // recibe la posicion del array para cambiar el numero de cuenta y sus datos //
    $scope.filter_Move_Data = function (index) {
        $scope.index_account = index;
        reload_data_Move();
    }

    // Cambia asincronamente el numero de cuenta como tambien los movimiento al numero de cuenta clickeado //
    function reload_data_Move () {
        // variables de cuentas //
        $scope.account_array_scroll = $scope.result; // array de scroll con sus respectivas posiciones //
        $scope.account_array_now = $scope.result[$scope.index_account]; // datos de la cuenta actual //
        $scope.balance_user = parseFloat($scope.account_array_now.balance).toFixed(2);
        $scope.view_Move('all');
    }

    // Recibe los datos para visualizarlo en cliente los movimiento del numero de cuenta del usuario //
    $scope.view_Move = (filter_type) => {
        const data = {'start_date' :$('#start_date').val(), 'end_date' :$('#end_date').val(), 'filter_type' :filter_type, 'IBAN' :$scope.account_array_now.IBAN, }
        $http({
            url: controller_url_moves_List('load_own'),
            method: "POST",
            data: JSON.stringify(data)
        }).then(function (result) {
            $scope.move_user = result.data.list;
        }).catch(function (result) {
            console.error("Ocurrio un error", result.status);
        })    
    }

    // rompe la seccion //
    $scope.logout = async () => {
        const result = await fetch_get_Data(controller_url_User('logout'));
        logout_Process(result.logout);
    }

});