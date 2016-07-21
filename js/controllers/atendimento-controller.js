app.controller('AtendimentoController', function($scope, resourceAtendimento){
    $('.button-collapse').sideNav('hide');

    $scope.string = 'view1';

    resourceAtendimento.query(function(data){
        $scope.atendimentos = data;
    }, function(erro){console.log(erro)});


});