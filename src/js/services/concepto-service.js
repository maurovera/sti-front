/**
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios 
 * para realizar las operaciones sobre el recurso concepto.
 */

app.service('ConceptoService', ['$http', 'StiBaseService', function ($http, BaseService) {



    return angular.extend({}, BaseService, {
        recurso: "/concepto/"
    });


}]);
