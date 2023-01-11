import { show_Modal , quit_Modal } from "../../components/global/modal.js"
import { verification_Email , verification_Dni , verification_Phone } from "../../functions/verification_form.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, ) {

    $scope.show_Correo = function () { 
        show_Modal(".correo");
    }

    $scope.hidde_Correo = function () {
        quit_Modal();
    }

    $scope.set_Data = function () {
       const avaible_email = verification_Email($('#email').val());
       const avaible_dni = verification_Dni($('#dni').val())
       const avaible_phone = verification_Phone($('#phone').val())
       
       if (avaible_email && avaible_dni && avaible_phone) {
            document.getElementById("form").addEventListener('submit', async function() {
                emailjs.init('o5KjR2swVQ-VjGWP_');
                const serviceID = "service_mr0cxam" ;
                const templateID = "template_rmmgi7r" ;

                await emailjs.sendForm(serviceID, templateID, this);
                location.reload();
             
            })
       } else {
            alert ("Compruebe los datos");
       }
    }
})