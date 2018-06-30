
app.service('EstiloAprendizajeService', ['$http', 'StiBaseService', function ($http, BaseService) {
        return angular.extend({}, BaseService, {
            recurso: "/estiloAprendizaje/" 
        });
    }]);
    