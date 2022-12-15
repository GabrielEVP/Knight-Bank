import { user_class } from "js_class/user_class.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {

$scope.login = function () {
    user = new user_class();
    user.nif = angular.element('#nif').val();
    user.password = angular.element('#password').val();

    $timeout(30);
    const data = {"nif" : nif , "password" : password};
    const aa = user.fetch_set_data_User('../../../controller/user/login.php',data);
    console.log(aa);
}


})