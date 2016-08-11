app.controller('AtendimentoController', function($scope, resourceAtendimento, resourceFuncionario){
    $('.button-collapse').sideNav('hide');

    $scope.string = 'view1';
    $scope.atendimento = {};
     //objeto do atendimento
    $scope.display = { func: 'Selecione um funcionario', cid: 'Selecione um CID' };
    //campo de pesquisa do funcionario
    $scope.pesq = {};
    $scope.funcionario = {};
    $scope.nfunc = 0;
    $scope.pagina = 0;
    $scope.paginaatend = 0;

    var carregaAtendimentos = function(){
        resourceAtendimento.query(function(data){
            $scope.atendimentos = data;
            $scope.natend = $scope.atendimentos.length;
        }, function(erro){
            console.log(erro);
            Materialize.toast('Erro ao carregar os atendimentos', 8000);
        });
    };

    var carregaFuncionarios = function(){
        resourceFuncionario.query(function(data){
            $scope.funcionarios = data;
            $scope.nfunc = $scope.funcionarios.length;
        }, function(erro){
            console.log(erro);
            Materialize.toast('Erro ao carregar os funcionarios', 8000);
        });
    };

    carregaAtendimentos();
    carregaFuncionarios();

    $scope.mudaFuncionario = function(func){
        $scope.funcdisplay = func.nome;
        $scope.atendimento.funcionario_id = func.id;
    };

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
            carregaAtendimentos();
        }, function(erro){
            Materialize.toast('Erro ao salvar atendimento', 8000);
            console.log(erro);
        });
    };

    $scope.novoFuncionario = function(funcionario){
        resourceFuncionario.save(angular.toJson(funcionario), function(){
            Materialize.toast('Funcionario salvo', 2000);
            carregaFuncionarios();
        }, function(erro){
            Materialize.toast('Erro ao criar funcionário');
            console.log(erro);
        });
    };
});