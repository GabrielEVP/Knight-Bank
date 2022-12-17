import { user_class } from "../../scripts/js_class/user/user_class.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {
    $scope.login = async function () {
        var user = new user_class();
        user.nif = $('#nif').val();
        user.password = $('#password').val();
        
        const data = {"nif" : user.nif , "password" : user.password};
        const response = user.fetch_set_data_User('../../../controller/user/login.php',data);
        const result = await response;

        if (result.status == "ok") {
            location.href = "../admin/admin.html";
        } else if (result.status == "banned") {
            alert("Banned: " +result.banTime+ "S");
        } else {
            alert(result.status);
        }
    }
})