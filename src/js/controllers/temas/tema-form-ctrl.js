/**
 * @class
 * Controller que implementa el formulario administración de Temas
 *</a>
 */
app.controller('TemaFormCtrl', ['$scope', 'TemaService', '$controller',
    function ($scope, service, $controller) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;

        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/tema/";

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
