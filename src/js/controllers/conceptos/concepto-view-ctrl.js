/**
 * @class
 * Controller que implementa el formulario administración de plantillas
 */
app.controller('ConceptoViewCtrl', ['$scope', 'ConceptoService', '$controller','$routeParams',
    function ($scope, service, $controller, $routeParams) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;

        $scope.uri = '/concepto/';
        
        
        /**imprime el id y el idTema**/
        console.log($routeParams);
        
        
        // le paso el id del tema y asignatura para volver atras.
        $scope.atrasTema = $routeParams.idTema;
        $scope.atrasAsig = $routeParams.idAsig;
        // esto lo usa en base controller de view, el id es el recurso que consulta. 
        $routeParams.id = $routeParams.idConcepto;
        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseViewCtrl', {
                "$scope": $scope
            }));
            
            
            
        })();
    }
]);