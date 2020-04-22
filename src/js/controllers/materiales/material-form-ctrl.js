/**
 * @class
 * Controller que implementa el formulario administración de Materiales
 *</a>
 */
app.controller('MaterialFormCtrl', ['$scope', 'MaterialService', '$controller','$routeParams',
    function ($scope, service, $controller, $routeParams) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;

         // le paso el id la asignatura para volver atras.
         $scope.atras = $routeParams.idAsig;
         // esto lo usa en base controller de view, el id es el recurso que consulta. 
         $routeParams.id = $routeParams.idMaterial;    


        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/asignatura/" + $scope.atras + "/material/";

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseFormCtrl', {
                "$scope": $scope
            }));
        })();
        
        console.log($scope.recurso);
        
        
        
    }
]);
