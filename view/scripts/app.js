const App = angular.module('App', []);

App.controller('Controler', function($scope, $timeout) {
    $timeout(30);
})