import { user_class } from "../../class/user/user_class.js";
import { controller_url_User } from "../../dictionary/dictionary_user.js"

import { fetch_get_Data, login_Process , logout_Process } from "../../server/server.js"

import { } from "../../functions/navbar_aplication.js"
import { verification_Email, comprobator_input, verification_status_proces } from "../../functions/verification_form.js";
import { show_Modal , quit_Modal } from "../../functions/modal.js"

const App = angular.module('App', []);
App.controller('Controler', ($scope, $http) => {

    // cuando carga el dom realiza estos procesos para el uso del programa // 
    $scope.init = () => {
        $('.loading').fadeOut();
        $http.post((controller_url_User('login_verify'))).then((res) => {
            login_Process(res.data.logged, (menu, body) => {
                $scope.user_logged = new user_class(res.data.user.id_user, res.data.user.gmail, res.data.user.NIF , res.data.user.foto, res.data.user.name , res.data.user.surname , res.data.user.password , res.data.user.admin , res.data.user.login_tries);
                $scope.menu_status = menu;
                $scope.body_status = body;
            });        
        }).catch((err) => {
            console.log(err);
        });
    }

    $('#update_profile').submit(() => {
        const avaible_gmail = verification_Email($('#gmail').val());
        comprobator_input(avaible_gmail)('#gmail');
        return avaible_gmail ? true : false;
    })

    $scope.show_update_Password = () => {
        show_Modal('.modify');
    }

    $scope.update_Password = () => {
        if ( $('#password').val() !== $('#password_verify').val()) {
            comprobator_input(false)("#password_verify");
        } else {
            $http({
                url: controller_url_User('update_password'),
                method: 'POST',
                data: JSON.stringify({ "password" : $('#password').val() }),
             }).then((result) => {
                verification_status_proces(result.data.status);
             }).catch((error) => {
                console.error(error);
             });
        }
    }

    // cierra el modal //
    $scope.close = () => {
        quit_Modal();
    }

    // borra la imagen del programa // 
    $scope.delete_Image = async () => {
        const response = await $http.post((controller_url_User('delete_image')));
        const result = response.data;
        verification_status_proces(result.status);
    }

    // rompe la seccion //
    $scope.logout = async () => {
        const result = await fetch_get_Data(controller_url_User('logout'));
        logout_Process(result.logout);
    }

});