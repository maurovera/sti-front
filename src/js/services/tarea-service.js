
app.service('TareaService', ['$http', 'StiBaseService', function ($http, BaseService) {
    return angular.extend({}, BaseService, {
        recurso: "/tarea/",

        listarTareaAlumno: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "listaTareaAlumno", {
                params: params
            });
        }
    });
}]);
