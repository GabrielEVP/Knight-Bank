import { empty_input, empty_input_account, show_Modal , quit_Modal } from "../../components/global/modal.js"
import { verification_Dni , verification_Email } from "../../functions/verification_form.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, ) {

    $scope.show_Correo = function () { 
        show_Modal(".correo");
    }

    $scope.hidde_Correo = function () {
        quit_Modal();
    }

    $scope.set_Data = function () {

       var a = verification_Email($('#email').val());
       var b = verification_Dni($('#dni').val())
       console.log(a);
       console.log(b);

        document.getElementById("form").addEventListener('submit', async function() {
            emailjs.init('o5KjR2swVQ-VjGWP_');
            const serviceID = "service_mr0cxam" ;
            const templateID = "template_rmmgi7r" ;

            try {
                await emailjs.sendForm(serviceID, templateID, this);
                location.reload();
            } catch (err) {
                throw err
            }
        })
    }
    
})