/**
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios 
 * para realizar las operaciones sobre el recurso ejercicio
 */

app.service('EjercicioService', ['$http', 'StiBaseService', function ($http, BaseService) {
    return angular.extend({}, BaseService, {
        recurso: "/ejercicio/",


        listarEjercicio: function () {
            return $http.get(App.REST_BASE + this.recurso + "listaEjercicio", {});
        },

        siguiente: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "siguiente", {
                params: params
            });
        }, 

        criterio: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "criterio", {
                params: params
            });
        },

        responder: function (params) {
            return $http.post(App.REST_BASE + this.recurso + 'responder', params);
        },
        
        criterioTutor: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "criterioTutor", {
                params: params
            });
        },

        siguienteEjercicio: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "siguienteEjercicio", {
                params: params
            });
        },

        
        responderEjercicioTutor: function (params) {
            return $http.post(App.REST_BASE + this.recurso + 'responderEjercicioTutor', params);
        },
        
        siguienteMaterial: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "siguienteMaterial", {
                params: params
            });
        },

        responderMaterial: function (params) {
            return $http.post(App.REST_BASE + this.recurso + 'responderMaterial', params);
        },

        listarResueltoInicial: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "listaResueltoInicial", {
                params:params
            });
        },
        

        listarResueltoFinal: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "listaResueltoTestFinal", {
                params:params
            });
        },

        listarResueltoTestTutor: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "listaResueltoTestTutor", {
                params:params
            });
        },

        listarCamino: function (params) {
            return $http.get(App.REST_BASE + this.recurso + "listaCamino", {
                params:params
            });
        }
    
    });
}]);
