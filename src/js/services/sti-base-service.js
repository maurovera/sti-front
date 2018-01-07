/**
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios 
 * para realizar las operaciones sobre el recurso Empresa.
 *
 * @name gfd.service#UsuarioService
 * @author <a href="mailto:juan.benitez@konecta.com.py">Juan Benitez</a>
 */
app.service('StiBaseService', ['$http', 'BaseService', function ($http, BaseService) {

    return angular.extend({}, BaseService, {
        recurso: "",
        /**
         * Se sobrescribe el método base para invocar a la url del recurso paginado.
         * Esto es debido a que se utiliza un json server para simular una api rest.
         * @function
         */

        actualizar: function (params) {
            return $http.put(App.REST_BASE + this.recurso + params.id, params);
        },

        eliminar: function (params) {
            return $http.delete(App.REST_BASE + this.recurso + params);
        },

        obtener: function (params) {
            return $http.get(App.REST_BASE + this.recurso + params);
        }


    });
}]);
