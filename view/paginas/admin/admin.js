import { user_class } from "../../scripts/js_class/user/user_class.js";
import { user_list } from "../../scripts/js_class/user/user_list.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

    window.onload = async function () {
        var user_lista = new user_list();
        $timeout(30);
        const response = user_lista.fetch_load_User('../../../controller/user/lists/load_user_list.php');
        const result = await response;
        console.log(result);
    }

})