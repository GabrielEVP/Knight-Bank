import { user_class } from "../../class/user/user_class.js";
import { user_list } from "../../class/user/user_list.js";
import { controller_url_User , controller_url_user_List } from "../../dictionary/dictionary_user.js"

import { account_list } from "../../class/account/account_list.js";
import { controller_url_Account , controller_url_account_List } from "../../dictionary/dictionary_account.js"

import { fetch_get_Data, fetch_set_Data, logout_Process } from "../../server/server.js"

import { empty_input, show_Modal , quit_Modal , open_ResponsiveModal , close_ResponsiveModal } from "../../functions/modal.js"
import { get_SaveConfiguration_Navbar } from "../../functions/navbar_aplication.js"
import { verification_status_proces } from "../../functions/verification_form.js";


const App = angular.module('App', []);

App.controller('Controler', function($scope, $http) {

    $scope.init = function () {
        $('.loading').fadeOut();
        $http.post((controller_url_User('login_verify'))).then((res) => {
            const result = res.data;
            if (result.logged !== true) {
                location.href = '../web/login.html'
            } else {
                $scope.list_user = new user_list();
                $scope.user_logged =  new user_class(result.user.id_user, result.user.gmail, result.user.NIF , result.user.foto, result.user.name , result.user.surname , result.user.password , result.user.admin , result.user.login_tries);
                $scope.load_user('all');
                const a = get_SaveConfiguration_Navbar($scope.menu_status, $scope.body_status);
                console.log(a)
                $('body').removeClass('hidden');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    $scope.load_user = function (controller_name) {
        $http.post(controller_url_user_List(controller_name))
        .then((result) => {
            $scope.list_user = new user_list();
            $scope.list_user.cast_array_to_User(Array.from(result.data));
        }).catch((err) => {
            console.log(err);
        });;
    }

    $('#seach_user').submit(() => {    
        if ($('#seach_value').val() == '') {
            $scope.load_user('all');
        } else {
            $http({
                url: controller_url_user_List('load_search'),
                method: "POST",
                data: JSON.stringify({'search': $('#seach_value').val()})
            }).then(function (result) {
                $scope.list_user = new user_list();
                $scope.list_user.cast_array_to_User(Array.from(result.data));
            }).catch(function (result) {
                console.error("Ocurrio un error", result.status, result.data);
            })
        }
    }) 

    
    $scope.insert = async function() {
        $scope.new_user = new user_class();
        $scope.new_user.asigment_input();

        if ($scope.new_user.NIF != '') {
            const result = await fetch_set_Data(controller_url_User('new'), $scope.new_user);
            verification_status_proces(result.status);
        } else {
            alert('Ingresa un Nif valido');
        }
        
    }

    $scope.modify = async function() {
        $scope.new_user = new user_class();
        $scope.new_user.asigment_input();
        $scope.new_user.id_user = $scope.id

        const result = await fetch_set_Data(controller_url_User('modify'), $scope.new_user);
        verification_status_proces(result.status);
    }

    $scope.crud = async function(controller_name, id) {
        const data = { "id_user" : id }
        const result = await fetch_set_Data(controller_url_User(controller_name), data);
        verification_status_proces(result.status);
    }

    /* Modal View */
    $scope.show_Insert = function() {
        empty_input();
        show_Modal(".add_user");
    }

    $scope.show_Update = async function(id) {
        $scope.id = id;
        const data = { "id_user": id };
        const result = await fetch_set_Data(controller_url_User('load'), data);

        $scope.new_user = new user_class(result.user.id_user, result.user.gmail, result.user.NIF, '' , result.user.name, result.user.surname, '' , '' , '');
        $scope.new_user.load_input_Value();

        show_Modal(".modify");
    }

    $scope.show_Crud = function(class_element, id_user) {
        $scope.id = id_user;
        show_Modal(class_element);
    }

    $scope.close = function() {
        $scope.list_account = new account_list(); 
        quit_Modal();
        close_ResponsiveModal();
    }

    $scope.show_Account = async function(class_element, id) {
        $scope.id = id;
        const data = { id_user : id }
        open_ResponsiveModal();
       
        $http({
            url : controller_url_account_List('load_from_user'),
            method : 'POST',
            data : JSON.stringify(data)
        }).then((result) => {
            $scope.list_account = new account_list(); 
            $scope.list_account.cast_array_to_Account(Array.from(result.data));
            show_Modal(class_element);
        }).catch((err) => {
            console.error(err);
        });

    }

    $scope.insert_account = async function(id) {
        const data = {'id_user' : id} 
        const result = await fetch_set_Data(controller_url_Account('new'), data);
        verification_status_proces(result.status);
    }

    $scope.logout = async function() {
        const result = await fetch_get_Data(controller_url_User('logout'));
        logout_Process(result.logout);
    }

})


    

