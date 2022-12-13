import { produktu_class } from "./produktu_class.js";
import { produktu_list } from "./produktu_list.js";

const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {
    // arrays de productos y cesta 
    $scope.produktu_list = new produktu_list();
    $scope.produktu_list_cesta = new produktu_list();
    $timeout(30);
})