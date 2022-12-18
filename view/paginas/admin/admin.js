import { user_class } from "../../scripts/js_class/user/user_class.js";
import { user_list } from "../../scripts/js_class/user/user_list.js";
import { controller_url_User , controller_url_user_List } from "../../scripts/js_class/user/dictionary_user.js"
import { empty_input, show_Modal , quit_Modal } from "./modal.js"
import { fetch_get_Data, fetch_set_Data } from "../../scripts/server.js"

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

    $scope.load_user = async function () {
        $timeout(200);
        $scope.list_user = new user_list();
        const result = await fetch_get_Data(controller_url_user_List('all'));
        $scope.list_user.cast_array_to_User(Array.from(result)); 
    }

    $scope.filter = async function (controller_name) {
        $timeout(200);
        $scope.list_user = new user_list();
        const result = await fetch_get_Data(controller_url_user_List(controller_name));
        $scope.list_user.cast_array_to_User(Array.from(result)); 
    }

    $scope.insert = async function() {
        $scope.new_user = new user_class();
        $scope.new_user.asigment_input();
        const data = {
            "nif" : $scope.new_user.nif , 
            "name" : $scope.new_user.name, 
            "surname" : $scope.new_user.surname, 
            "gmail" : $scope.new_user.gmail, 
            "password" :$scope.new_user.password,
            "admin" : 0
        };
        const result = await fetch_set_Data(controller_url_User('new'), data);
        if(result.status == 'ok'){
            location.reload();
        } else {
            alert(result.status);
        }
    }

    $scope.crud = async function(controller_name, id) {
        const data = { "id_user" : id }
        const result = await fetch_set_Data(controller_url_User(controller_name), data);
        console.log(result);
    }

    $scope.modify = async function(id) {
        const data = { "id_user": id };
        const response = $scope.new_user.fetch_set_data_User(controller_url_User('load'), data);
        const result = await response;
        console.log(result) // aqui falta agregar 
        
        $scope.new_user = new user_class();
        $scope.new_user.asigment_input();
        const data_modify = {
            "nif" : $scope.new_user.nif , 
            "name" : $scope.new_user.name, 
            "surname" : $scope.new_user.surname, 
            "gmail" : $scope.new_user.gmail, 
            "password" :$scope.new_user.password 
        };
        fetch_set_data_User(controller_url_User('modify'), data_modify);
    }
    
    /* Modal View */
    $scope.show_Insert = function() {
   
        empty_input();
        show_Modal(".add_user");
    }

    $scope.show_Update = function(id) {
        $scope.id = id;
        show_Modal(".modify");
    }

    $scope.show_Delete = function(id) {
        $scope.id = id;
        show_Modal(".borrar");
    }

    $scope.show_Ban = function(id) {
        $scope.id = id;
        show_Modal(".banear");
    }

    $scope.show_Unban = function(id) {
        $scope.id = id;
        show_Modal(".desban");
    }

    $scope.close = function() {
        quit_Modal();
    }

})

