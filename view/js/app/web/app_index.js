import { show_Modal , quit_Modal } from "../../components/global/modal.js"
import { verification_Email, verification_Name , verification_Phone , verification_Dni , keypress_condition, comprobator_input } from "../../functions/verification_form.js";

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
        const avaible_nombre = verification_Name($('#name').val());
        const avaible_surname = verification_Name($('#surname').val());
        const avaible_phone = verification_Phone($('#phone').val());
        const avaible_dni = verification_Dni($('#dni').val());

        comprobator_input(avaible_email, "#email");
        comprobator_input(avaible_nombre, "#name");
        comprobator_input(avaible_surname, "#surname");
        comprobator_input(avaible_phone, "#phone");
        comprobator_input(avaible_dni, "#dni");

        if (avaible_email && avaible_nombre  && avaible_surname && avaible_phone && avaible_dni) {
            $("#form").submit(async function() {
                emailjs.init('o5KjR2swVQ-VjGWP_');
                const serviceID = "service_mr0cxam" ;
                const templateID = "template_rmmgi7r" ;

                await emailjs.sendForm(serviceID, templateID, this);
                location.reload();
            });
        }
    }

})