import { user_class } from "../../scripts/js_class/user/user_class.js";
import { user_list, user_list } from "../../scripts/js_class/user/user_list.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {



    window.onload = async function () {
        var user_list = new user_list();
        $timeout(30);
        const data = {};
        const response = user_list.fetch_set_data_User('../../../controller/user/login.php',data);
        const result = await response;
    }



   

})