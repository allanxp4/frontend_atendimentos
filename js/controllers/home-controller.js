app.controller('HomeController', function($scope, $window, $location, resourceLogin){
    $('.button-collapse').sideNav('hide');

    $scope.auth = {};
    
    $scope.logar = function(){
        console.log(angular.toJson($scope.auth));
        resourceLogin.save(angular.toJson($scope.auth), function(token){
            Materialize.toast("Logado com sucesso", 2000);
            $window.sessionStorage.token = token.token;
            $scope.logado = true;
            console.log(token);
        }, function(erro){
            Materialize.toast("Login ou senha incorretos", 8000);
            console.log(erro);
        })
    }
});