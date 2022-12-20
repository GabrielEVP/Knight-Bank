import { fetch_set_Data } from "../../server/server.js"
import { controller_url_User } from "../../class/user/dictionary_user.js"

const App = angular.module('App', []);

App.controller('Controler', function($scope) {
        
    $scope.login = async function () {
        const data = { "NIF" : $('#nif').val() , "password" : $('#password').val() };
        const result = await fetch_set_Data(controller_url_User('login'), data);

        if (result.status == "ok") {
            location.href = "../aplication/admin.html";
        } else if (result.status == "banned") {
            alert("Banned: " +result.banTime+ " S");
        } else {
            alert(result.status);
        }
    }
})