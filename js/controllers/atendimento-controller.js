app.controller('AtendimentoController', function($scope, resourceAtendimento){
    $('.button-collapse').sideNav('hide');

    $scope.string = 'view1';

    resourceAtendimento.query(function(data){
        $scope.atendimentos = data;
    }, function(erro){console.log(erro)});

    $scope.apagaAtendimento = function(atendimento){
        resourceAtendimento.remove({id: atendimento.id}, function(){
            Materialize.toast('Apagado com sucesso', 2000);
            $scope.atendimentos.splice($scope.atendimentos.indexOf(atendimento), 1);
        }, function(erro){console.log(erro)});
    }

});