app.service('CursoService', ['$http', 'StiBaseService', function ($http, BaseService) {
    return angular.extend({}, BaseService, {
        recurso: "/curso/",

        listarCurso: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "/listaCurso", {
                params:params
            });
        },
          
        listarCursoAlumno: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "/listaCursoAlumno", {
                params:params
            });
        },
        
         agregarAlumno: function (params) {
            return $http.put(App.REST_BASE + this.recurso + "/agregarAlumno/" + params.id, params);
        }

        

    });
    }]);
