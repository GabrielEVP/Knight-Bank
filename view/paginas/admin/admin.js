import { user_class } from "../../scripts/js_class/user/user_class.js";
import { user_list } from "../../scripts/js_class/user/user_list.js";
import { controller_url_User , controller_url_user_List } from "../../scripts/js_class/user/dictionary_user.js"
import { empty_input, show_Modal , quit_Modal } from "./modal.js"
import { fetch_get_Data, fetch_set_Data } from "../../scripts/server.js"

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

    $scope.load_user = async function () {
        $timeout(300);

        $scope.list_user = new user_list();
        const result = await fetch_get_Data(controller_url_user_List('all'));
        $scope.list_user.cast_array_to_User(Array.from(result)); 
    }

    $scope.filter = async function (controller_name) {
        $timeout(300);

        $scope.list_user = new user_list();
        const result = await fetch_get_Data(controller_url_user_List(controller_name));
        $scope.list_user.cast_array_to_User(Array.from(result)); 
    }

    $scope.insert = async function() {
        $scope.new_user = new user_class();
        $scope.new_user.asigment_input();

        if ($scope.new_user.NIF != '') {
            const result = await fetch_set_Data(controller_url_User('new'), $scope.new_user);
            if (result.status == 'ok') {
                location.reload();
            } else {
                alert(result.status);
            }
        } else {
            alert('idiota');
        }
        
    }

    $scope.crud = async function(controller_name, id) {
        const data = { "id_user" : id }
        const result = await fetch_set_Data(controller_url_User(controller_name), data);
        if (result.status == 'ok') {
            location.reload();
        } else {
            alert(result.status);
        }
    }

    $scope.modify = async function() {
        $scope.new_user = new user_class();
        $scope.new_user.asigment_input();
        $scope.new_user.id_user = $scope.id

        const result = await fetch_set_Data(controller_url_User('modify'), $scope.new_user);
        console.log(result);
        if (result.status == 'ok') {
            location.reload();
        } else {
            alert(result.status);
        }
    }
    
    /* Modal View */
    $scope.show_Insert = function() {
        empty_input();
        show_Modal(".add_user");
    }

    $scope.show_Update = async function(id) {
        $scope.id = id;
        const data = { "id_user": id };
        const result = await fetch_set_Data(controller_url_User('load'), data);

        $scope.new_user = new user_class(result.user.id_user, result.user.gmail, result.user.NIF, result.user.name, result.user.surname, result.user.password, result.user.admin, result.user.active);
        $scope.new_user.load_input_Value();

        show_Modal(".modify");
    }

    $scope.show_Crud = function(class_element, id_user) {
        $scope.id = id_user;
        show_Modal(class_element );
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

