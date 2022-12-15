import { user_class } from "../../scripts/js_class/user/user_class.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

$scope.login = async function () {
   var user = new user_class();
    user.nif = $('#nif').val();
    user.password = $('#password').val();

    $timeout(30);
    const data = {"nif" : user.nif , "password" : user.password};
    const aa = user.fetch_set_data_User('../../../controller/user/login.php',data);
    const a = await aa;
    alert(a.status);
}


})