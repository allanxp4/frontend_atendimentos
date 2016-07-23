app.controller('AtendimentoController', function($scope, resourceAtendimento, resourceFuncionario){
    $('.button-collapse').sideNav('hide');

    $scope.string = 'view1';

    resourceAtendimento.query(function(data){
        $scope.atendimentos = data;
    }, function(erro){
        console.log(erro);
        Materialize.toast('Erro ao carregar', 8000);
    });

    resourceFuncionario.query(function(data){
        $scope.funcionarios = data;
    }, function(erro){
        console.log(erro);
        Materialize.toast('Erro ao carregar os funcionarios', 8000);
    });

    $scope.apagaAtendimento = function(atendimento){
        resourceAtendimento.remove({id: atendimento.id}, function(){
            Materialize.toast('Apagado com sucesso', 2000);
            $scope.atendimentos.splice($scope.atendimentos.indexOf(atendimento), 1);
        }, function(erro){
            console.log(erro)
            Materialize.toast('Erro ao apagar', 8000);
        });
    };

});