
app.service('CursoService', ['$http', 'StiBaseService', function ($http, BaseService) {
        return angular.extend({}, BaseService, {
            recurso: "/curso/" 
        });
    }]);
    