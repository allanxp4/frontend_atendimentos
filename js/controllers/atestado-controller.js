app.controller('AtestadoController', function($scope, resourceFuncionario, resourceAtestado, resourceCid){
    $('.button-collapse').sideNav('hide');
    $scope.string = 'view2';

    $scope.string = 'view1';
    $scope.atestado = {};
    //objeto do atendimento
    $scope.display = { func: 'Selecione um funcionario'};
    //campo de pesquisa do funcionario
    $scope.pesq = {};
    $scope.funcionario = {};
    $scope.nfunc = 0;
    $scope.pagina = 0;
    $scope.paginaatest = 0;

    var carregaAtestados = function() {
        resourceAtestado.query(function (data) {
            $scope.atestados = data;
        }, function (erro) {
            console.log(erro);
            Materialize.toast('Erro ao carregar atestados', 8000);
        })
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

    var carregaCid = function(){
        resourceCid.query(function(data){
            $scope.cids = data;
        }, function(erro){
            Materialize.toast('Erro ao carregar os cids', 8000);
        })
    };

    carregaAtestados();
    carregaFuncionarios();
    carregaCid();

    $scope.at  = {
        tipos: [{
            nome: 'dias'
            }, {
            nome: 'horas'
            }],
        tipo: "dias"
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

    $scope.mudaFuncionario = function(func){
        $scope.funcdisplay = func.nome;
        $scope.atendimento.funcionario_id = func.id;
    };

    $scope.novoAtestado = function(atestado){
        console.log(atestado);
        resourceAtestado.save(angular.toJson(atestado), function(){
            atestado.data = atestado;
            Materialize.toast('Atestado salvo', 2000);
            carregaAtestados();
        }, function(erro){
            Materialize.toast('Erro ao salvar atestado', 8000);
            console.log(erro);
        });
    };

});