/**
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios 
 * para realizar las operaciones sobre el recurso Empresa.
 */

app.service('AsignaturaService', ['$http', 'StiBaseService', function ($http, BaseService) {
    return angular.extend({}, BaseService, {
        recurso: "/asignatura/",

        listarEjercicio: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "listaEjercicio", {
                params: params
            });
        },
        
        listarAsignatura: function () {
            return $http.get(App.REST_BASE + this.recurso + "listaAsignatura", {
            });
        }
        




    });
    }]);
