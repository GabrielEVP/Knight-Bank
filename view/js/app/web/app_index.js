import { show_Modal , quit_Modal } from "../../components/global/modal.js"
import { verification_Email , verification_Dni , verification_Phone , keypress_condition } from "../../functions/verification_form.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, ) {

    window.onload = function () {
        keypress_condition("#phone", "0123456789");
    }

    $scope.show_Correo = function () { 
        show_Modal(".correo");
    }

    $scope.hidde_Correo = function () {
        quit_Modal();
    }

    $scope.set_Data = function () {
        const avaible_email = verification_Email($('#email').val());
        var avaible_nombre = false
        var avaible_surname = false
        const avaible_phone = verification_Phone($('#phone').val())
        const avaible_dni = verification_Dni($('#dni').val())

        if (avaible_email === false) {
            $("#email").css({"border-color": "red"},) ;
        } else {
            $("#email").css({"border-color": ""},);
        }
      
        if ($('#name').val() == '') {
            avaible_nombre = false;
            $("#name").css({"border-color": "red"},) ;
        } else {
            avaible_nombre = true;
            $("#name").css({"border-color": ""},);
        }

        if ($('#surname').val() == '') {
            avaible_surname = false;
            $("#surname").css({"border-color": "red"},) ;
        } else {
            avaible_surname = true;
            $("#surname").css({"border-color": ""},);
        }
        
        if (avaible_phone === false) {
            $("#phone").css({"border-color": "red"},);
        } else {
            $("#phone").css({"border-color": ""},);
        }

        if (avaible_dni === false) {
            $("#dni").css({"border-color": "red"},);
        } else {
            $("#dni").css({"border-color": ""},);
        }

        console.log(avaible_nombre);
        if (avaible_email && avaible_nombre  && avaible_surname && avaible_phone && avaible_dni) {
            document.getElementById("form").addEventListener('submit', async function() {
                emailjs.init('o5KjR2swVQ-VjGWP_');
                const serviceID = "service_mr0cxam" ;
                const templateID = "template_rmmgi7r" ;

                await emailjs.sendForm(serviceID, templateID, this);
                location.reload();
            })
        }
    }
})