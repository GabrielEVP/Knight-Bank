import { user_class } from "../../class/user/user_class.js";
import { user_list } from "../../class/user/user_list.js";
import { controller_url_User } from "../../class/user/dictionary_user.js"
import { empty_input, show_Modal , quit_Modal } from "../../components/modal.js"
import { fetch_get_Data } from "../../server/server.js"

import { verification_Email, verification_Name , verification_Phone , verification_Dni , keypress_condition, comprobator_input } from "../../functions/verification_form.js";


const App = angular.module('App', []);

App.controller('Controler', function($scope, $http) {

    $scope.init = function () {
        $('.loading').fadeOut();
        $http.get((controller_url_User('login_verify'))).then((res) => {
            const result = res.data;          
            if (result.logged !== true) {
                location.href = '../web/login.html'
            } else {
                $scope.menu_status = localStorage.getItem('menu_status');
                $scope.body_status = localStorage.getItem('menu');
                $scope.list_user = new user_list();
                $scope.user_logged =  new user_class(result.user.id_user, result.user.gmail, result.user.NIF , result.user.foto, result.user.name , result.user.surname , result.user.password , result.user.admin , result.user.login_tries);
                $('body').removeClass('hidden');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    window.onload = function () {
        keypress_condition("#money_operation", "0123456789,.");
    }

    $scope.show_OperationBank = function(class_element, id_account) {
        $scope.id_account = id_account;
        show_Modal(class_element);
    }

    $scope.do_OperationBank = function(operation) {
        $('#form_operationBank').submit(async function() {
            switch (operation) {
                case 'deposit':
                    const sender_IBAN = $('#num_account').val();
                    const amount = $('#amount').val();
                    const notion = $('#notion').val();
                    break;

                case 'withdrawal':
                    console.log('no sabes ingles');
                    break;

                case 'transference':
                    var receiver_IBAN = $('#receiver_IBAN').val();
                    break;

                default:
                    return false;  
            }

            const data = { "sender_IBAN" : sender_IBAN, "amount" :amount, "notion" :notion, "receiver_IBAN" :receiver_IBAN, "move_type" :operation };
            const result = await fetch_set_Data(controller_url_User('logout') , data);
            console.log(result)

            if (result.status == 'ok') {
                location.reload();
            } else {
                console.error('error en la operacion');
            }
        })
    }    

    $scope.close = function() {
        quit_Modal();
    }

    $scope.logout = async function() {
        const result = await fetch_get_Data(controller_url_User('logout'));
        console.log(result);
        if (result.logout == true) {
            location.href='../web/login.html';
        } else {
            alert('error');
        }
    }
    
});