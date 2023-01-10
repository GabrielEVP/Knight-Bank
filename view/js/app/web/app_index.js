import { empty_input, empty_input_account, show_Modal , quit_Modal } from "../../components/global/modal.js"

const App = angular.module('App', []);

App.controller('Controler', function($scope, ) {

    $scope.show_Correo = function () { 
        show_Modal(".correo");
    }

    $scope.hidde_Correo = function () {
        quit_Modal();
    }

    $scope.set_Data = function () {
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