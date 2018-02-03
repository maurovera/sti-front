
app.service('AlumnoService', ['$http', 'StiBaseService', function ($http, BaseService) {
        return angular.extend({}, BaseService, {
            recurso: "/alumno/" 
        });
    }]);
    