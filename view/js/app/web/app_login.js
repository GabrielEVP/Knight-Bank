import { fetch_set_Data } from "../../server/server.js"
import { controller_url_User } from "../../dictionary/dictionary_user.js"
import { verification_Dni, keypress_condition, comprobator_input } from "../../functions/verification_form.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope) {

    window.onload = () => {
        
    }

    $scope.login = async () => {
        const data = { "NIF" : $('#nif').val(), "password" : $('#password').val() };
        const result = await fetch_set_Data(controller_url_User('login'), data);

        // comprueba en el login si el formulario mandado si es un usuario, si es admin o no, o esta baneado y si no retorna otro status // 
        const Process_Status = {
            ok : () => result.user.admin == 0 ? location.href = "../aplication/finanzas.html" : location.href = "../aplication/admin.html", 
            banned: () => alert("Banned: " + result.banTime+ " S")
        }
        return Process_Status[result.status] ? Process_Status[result.status]() : alert(result.status);
    }

   
    
    
})