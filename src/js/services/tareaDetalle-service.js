
app.service('TareaDetalleService', ['$http', 'StiBaseService', function ($http, BaseService) {
        return angular.extend({}, BaseService, {
            recurso: "/tareaDetalle/" 
        });
    }]);
    