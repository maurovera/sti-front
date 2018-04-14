/**
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios 
 * para realizar las operaciones sobre el recurso ejercicio
 */

app.service('EjercicioService', ['$http', 'StiBaseService', function ($http, BaseService) {
    return angular.extend({}, BaseService, {
        recurso: "/ejercicio/",
        
        
        listarEjercicio: function () {
            return $http.get(App.REST_BASE + this.recurso + "/listaEjercicio", {
            });
        }
        
        
        
    });



}]);
