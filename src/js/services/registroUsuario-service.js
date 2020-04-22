app.service('RegistroUsuarioService', ['$http', 'StiBaseService', function ($http, BaseService) {
    return angular.extend({}, BaseService, {
        recurso: "/usuarios/",
        
        /**
         * Realiza un post para guardar el nuevo usuario
         * @function
         */
        registrarUsuario: function (params) {
            return $http.post(App.REST_BASE + this.recurso + "insertar", params);
        }

    });
}]);
