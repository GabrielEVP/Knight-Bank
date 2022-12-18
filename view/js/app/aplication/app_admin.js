import { user_class } from "../../class/user/user_class.js";
import { user_list } from "../../class/user/user_list.js";
import { controller_url_User , controller_url_user_List } from "../../class/user/dictionary_user.js"
import { fetch_get_Data, fetch_set_Data } from "../../server/server.js"
import { empty_input, show_Modal , quit_Modal } from "../../components/aplication/modal.js"

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

    $scope.load_user = async function (controller_name) {
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
            alert('no has ingresado nada');
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

    $scope.crud = async function(controller_name, id) {
        const data = { "id_user" : id }
        const result = await fetch_set_Data(controller_url_User(controller_name), data);

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
        show_Modal(class_element);
    }

    $scope.close = function() {
        quit_Modal();
    }

})

