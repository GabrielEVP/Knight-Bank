import { show_Modal , quit_Modal } from "../../functions/modal.js"
import { verification_Email, verification_Name , verification_Phone , verification_Dni , keypress_condition, comprobator_input } from "../../functions/verification_form.js";

const App = angular.module('App', []);
App.controller('Controler', ($scope) => {

    window.onload = () => {
        keypress_condition("#phone", "0123456789");
    }

    $scope.show_Correo = () => { 
        show_Modal(".correo");
    }

    $scope.hidde_Correo = () => {
        quit_Modal();
    }

    $scope.set_Data_toEmailJS = () => {
        const avaible_email = verification_Email($('#email').val());
        const avaible_nombre = verification_Name($('#name').val());
        const avaible_surname = verification_Name($('#surname').val());
        const avaible_phone = verification_Phone($('#phone').val());
        const avaible_dni = verification_Dni($('#dni').val());

        comprobator_input(avaible_email)("#email");
        comprobator_input(avaible_nombre)("#name");
        comprobator_input(avaible_surname)("#surname");
        comprobator_input(avaible_phone)("#phone");
        comprobator_input(avaible_dni)("#dni");

        if (avaible_email && avaible_nombre  && avaible_surname && avaible_phone && avaible_dni) {
            $("#form").submit(async () => {
                emailjs.init('o5KjR2swVQ-VjGWP_');
                const serviceID = "service_mr0cxam" ;
                const templateID = "template_rmmgi7r" ;

                await emailjs.sendForm(serviceID, templateID, this);
                location.reload();
            });
        }
    }

})