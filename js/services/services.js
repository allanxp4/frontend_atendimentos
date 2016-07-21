/**
 * Created by Allan on 21/07/2016.
 */
resurl = 'http://localhost:8000';

angular.module('servicos', ['ngResource'])
    .factory('resourceAtendimento', function($resource){
        return $resource(resurl + '/atendimento', null, {
            update: {
                method: 'PUT'
            }
        });

    })

    .factory('resourceFuncionario', function($resource){
        return $resource(resurl + '/funcionario', null, {
            update: {
                method: 'PUT'
            }
        });

    });
