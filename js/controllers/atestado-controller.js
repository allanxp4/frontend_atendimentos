app.controller('AtestadoController', function($scope, resourceAtestado){
    $('.button-collapse').sideNav('hide');
    $scope.string = 'view2';
    
    resourceAtestado.query(function(data){
        $scope.atestados = data;
    }, function(erro){
        console.log(erro);
        Materialize.toast('Erro ao carregar atestados', 8000);
    })

});