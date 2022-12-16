import { user_class } from "../../scripts/js_class/user/user_class.js";
import { user_list } from "../../scripts/js_class/user/user_list.js";
import {controller_url_User , controller_url_user_List} from "../../scripts/js_class/user/dictionary_user.js"

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {
    $scope.list_user = new user_list();

    window.onload = async function () {
        $timeout(30);
        const response = $scope.list_user.fetch_load_User(controller_url_user_List('all'));
        const result = await response;
        console.log(result);
    }

    $scope.filter = async function (controller_name) {
        $timeout(40);
        const response = $scope.list_user.fetch_load_User(controller_url_user_List(controller_name));
        const result = await response;
        console.log(result);
    }

})

