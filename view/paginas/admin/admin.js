import { user_class } from "../../scripts/js_class/user/user_class.js";
import { user_list } from "../../scripts/js_class/user/user_list.js";
import {controller_url_User , controller_url_user_List} from "../../scripts/js_class/user/dictionary_user.js"

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

})

