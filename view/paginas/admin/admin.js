import { user_class } from "../../scripts/js_class/user/user_class.js";
import { user_list } from "../../scripts/js_class/user/user_list.js";
<<<<<<< HEAD
import { controller_url_User , controller_url_user_List } from "../../scripts/js_class/user/dictionary_user.js"
import { empty_input, show_Modal , quit_Modal } from "./modal.js"
=======
import {controller_url_User , controller_url_user_List} from "../../scripts/js_class/user/dictionary_user.js"
>>>>>>> 2f774433af91c6e977787fd647e424545627394b

const App = angular.module('App', []);

App.controller('Controler', async function($scope, $timeout) {
    $scope.load_user = async function () {
        $timeout(200);
        $scope.list_user = new user_list();
        const response = $scope.list_user.fetch_load_User(controller_url_user_List('all'));
        const result = await response;
        $scope.list_user.cast_array_to_User(Array.from(result)); 
        $scope.list_user.show_user_List();
    }

    $scope.filter = async function (controller_name) {
        $timeout(200);
        $scope.list_user = new user_list();
        const response = $scope.list_user.fetch_load_User(controller_url_user_List(controller_name));
        const result = await response;
        $scope.list_user.cast_array_to_User(Array.from(result)); 
        $scope.list_user.show_user_List();
    }

<<<<<<< HEAD
    $scope.insert = async function() {
        $scope.new_user = new user_class();
        $scope.new_user.asigment_input();
        const data = {
            "nif" : $scope.new_user.nif , 
            "name" : $scope.new_user.name, 
            "surname" : $scope.new_user.surname, 
            "gmail" : $scope.new_user.gmail, 
            "password" :$scope.new_user.password 
        };
        const response = $scope.new_user.fetch_set_data_User(controller_url_User('new'), data);
        const result = await response;
        console.log(result);
    }

    $scope.delete = async function(id) {
        $scope.new_user = new user_class();
        $scope.new_user.id_user = id;
        const data = { "id_user" : $scope.new_user.id_user }
        const response = $scope.new_user.fetch_set_data_User(controller_url_User('delete'), data);
        const result = await response;
        console.log(result);
    }

    $scope.ban = async function(id) {
        $scope.new_user = new user_class();
        $scope.new_user.id_user = id;
        const data = { "id_user" : $scope.new_user.id_user }
        const response = $scope.new_user.fetch_set_data_User(controller_url_User('ban'), data);
        const result = await response;
        console.log(result);
    }

    $scope.unban = async function(id) {
        $scope.new_user = new user_class();
        $scope.new_user.id_user = id;
        const data = { "id_user" : $scope.new_user.id_user }
        const response = $scope.new_user.fetch_set_data_User(controller_url_User('unban'), data);
        const result = await response;
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
        $scope.new_user.fetch_set_data_User(controller_url_User('modify'), data_modify);
    }

    /* Modal View */
    $scope.show_Insert = function() {
        empty_input();
        show_Modal(".add_user");
    }

    $scope.show_Update = function() {
        show_Modal(".modify");
    }

    $scope.show_Delete = function() {
        show_Modal(".borrar");
    }

    $scope.show_Ban = function() {
        show_Modal(".banear");
    }

    $scope.show_Unban = function() {
        show_Modal(".desban");
    }

    $scope.close = function() {
        quit_Modal();
    }

=======
>>>>>>> 2f774433af91c6e977787fd647e424545627394b
})

