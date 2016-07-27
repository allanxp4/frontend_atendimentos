/**
 * Created by Allan on 21/07/2016.
 */
resurl = 'http://localhost:8000';

angular.module('servicos', ['ngResource'])
    .factory('resourceAtendimento', function($resource){
        return $resource(resurl + '/atendimento/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    })

    .factory('resourceFuncionario', function($resource){
        return $resource(resurl + '/funcionario/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    })

    .factory('resourceAtestado', function($resource){
        return $resource(resurl + '/atestado:id', null, {
            update: {
                method: 'PUT'
            }
        });
    })
