/**
 * @class TareaDetalleView
 * Controller que implementa el formulario administración de plantillas
 */
app.controller('TareaDetalleViewCtrl', ['$scope', 'TareaDetalleService', '$controller','$routeParams',
    function ($scope, service, $controller, $routeParams) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;

        $scope.uri = '/tareaDetalle/';
        
        
        /**imprime el idCurso, idTarea y idTareaDet**/
        console.log($routeParams);
        
        
        // le paso el id de la tarea y curso para volver atras.
        $scope.atrasTarea = $routeParams.idTarea;
        $scope.atrasCurso = $routeParams.idCurso;
        // esto lo usa en base controller de view, el id es el recurso que consulta. 
        $routeParams.id = $routeParams.idTareaDet;
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