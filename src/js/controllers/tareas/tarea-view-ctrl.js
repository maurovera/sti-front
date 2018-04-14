
app.controller('TareaViewCtrl', ['$scope','$routeParams', 'TareaService', '$controller',
    function ($scope, $routeParams, service, $controller) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;

        $scope.uri = '/tarea/';
        
        
         // le paso el id del curso para volver atras.
        $scope.atras = $routeParams.idCurso;
        // esto lo usa en base controller de view, el id es el recurso que consulta. 
        $routeParams.id = $routeParams.idTarea;

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
