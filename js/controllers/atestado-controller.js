app.controller('AtestadoController', function($scope, $filter, resourceFuncionario, resourceAtestado, resourceCid){
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

    var atestado_old = {};

    var carregaAtestados = function() {
        resourceAtestado.query(function (data) {
            $scope.natest = data.length;
            for(var v = 0; v < $scope.natest; v++){
                var i = data[v].data_inicial.split(/[-]/);
                var f = data[v].data_final.split(/[-]/);

                data[v].data_inicial = new Date(Date.UTC(i[0], i[1]-1, i[2], 3, 0, 0));
                data[v].data_final = new Date(Date.UTC(f[0], f[1]-1, f[2], 3, 0, 0));
            }
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

    $scope.sortByDate = function(date){
        return new Date(date);
    };

    $scope.displayTempo = function(atestado){
        if(atestado.tipo == 'dias'){
            var final = new Date(atestado.data_final);
            var inicial = new Date(atestado.data_inicial);
            return (final - inicial)/1000/60/60/24 + " Dias";
        }
        else{
            var i = atestado.hora_inicial.split(/[:]/);
            var f = atestado.hora_final.split(/[:]/);

            var horas = f[0] - i[0];
            var minutos = f[1] - i[1];
            
            if(minutos < 0){
                horas -= 1;
                minutos *= -1;
            }

            var result = horas += "";
            
            if(minutos != 0){
                result += ":" + minutos
            }

            return result += " Horas";

        }
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

    $scope.editaAtestado = function(atestado){
        console.log(atestado);
        resourceAtestado.update(angular.toJson(atestado), function(){
            atestado.data = atestado;
            Materialize.toast('Atestado atualizado', 2000);
            carregaAtestados();
        }, function(erro){
            Materialize.toast('Erro ao atualizar atestado', 8000);
            console.log(erro);
        });
    };

    $scope.mudaAtestado = function(atestado){
        atestado_old = atestado;

        var findCid = function(id){
            for(var i = 0; i < $scope.cids.length; i++){
                if($scope.cids[i].id == id){
                    return $scope.cids[id - 1].codigo;
                }
            }
        };

        console.log(atestado);
        $scope.atestado = atestado;
        $scope.display.func = atestado.funcionario.nome;
        $scope.display.cid = findCid(atestado.cid_id);
        $scope.at.tipo = atestado.tipo;
        $('#modalEditaAtestado').openModal();

    };

    $scope.fechaAtestado = function(atestado){
        $('#modalEditaAtestado').closeModal();
        $scope.atestado = {};
        $scope.display = {};
    }

});