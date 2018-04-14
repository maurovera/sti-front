app.controller('TareaListCtrl', ['$scope', '$routeParams', 'TareaService', '$controller',
function ($scope, $routeParams, service, $controller) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;


        /**
         * Configuraciones de la cabecera de la grilla.
         * @private
         * @type {Array}
         */
        var header = [{
                "key": "nombre",
                "name": "Nombre"
        }, {
                "key": "descripcion",
                "name": "Descripcion"
        }, {
                "key": "estadoTarea",
                "name": "Estado"
        }, {
                "key": "acciones",
                "name": "Acciones"
        }
    ];





        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {

            angular.extend(this, $controller('BaseListCtrl', {
                "$scope": $scope
            }));

            // Se le pasa el id de curso para listar sus tareas. 
            /**IdCurso*/
            $scope.cursoId = $routeParams.idCurso;
            console.log($scope.cursoId);
            $scope.filterBy.curso = parseInt($scope.cursoId);



            $scope.config.header = header;
            $scope.config.recurso = 'tarea';


        })();
}]);
