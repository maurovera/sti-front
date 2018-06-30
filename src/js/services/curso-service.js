app.service('CursoService', ['$http', 'StiBaseService', function ($http, BaseService) {
    return angular.extend({}, BaseService, {
        recurso: "/curso/",

        listarCurso: function () {
            return $http.get(App.REST_BASE + this.recurso + "/listaCurso", {});
        },
        
        listarCursoAlumno: function () {
            return $http.get(App.REST_BASE + this.recurso + "/listaCursoAlumno", {});
        },
        
         agregarAlumno: function (params) {
            return $http.put(App.REST_BASE + this.recurso + "/agregarAlumno/" + params.id, params);
        }

        

    });
    }]);
