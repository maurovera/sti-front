
app.service('TareaService', ['$http', 'StiBaseService', function ($http, BaseService) {
        return angular.extend({}, BaseService, {
            recurso: "/tarea/" 
        });
    }]);
    