app.controller('AtendimentoController', function($scope, resourceAtendimento, resourceFuncionario){
    $('.button-collapse').sideNav('hide');

    $scope.string = 'view1';
    $scope.atendimento = {};
     //objeto do atendimento
    $scope.display = { func: 'Selecione um funcionario'};
    //campo de pesquisa do funcionario
    $scope.pesq = {};

    $scope.mudaFuncionario = function(func){
        $scope.funcdisplay = func.nome;
        $scope.atendimento.funcionario_id = func.id;
    };

    resourceAtendimento.query(function(data){
        $scope.atendimentos = data;
    }, function(erro){
        console.log(erro);
        Materialize.toast('Erro ao carregar os atendimentos', 8000);
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
            console.log(erro);
            Materialize.toast('Erro ao apagar', 8000);
        });
    };


    $scope.novoAtendimento = function(atendimento){
        resourceAtendimento.save(angular.toJson(atendimento), function(){
            Materialize.toast('Atendimento salvo', 2000);
        }, function(erro){
            Materialize.toast('Erro ao salvar atendimento', 8000);
            console.log(erro);
        });
    };
});