/**
 * @class
 * Controller que implementa la busqueda y listado de tareaDetalle.
 *
 * @name angular-keycloak-seed.controller##TareaDetalleListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.controller('TareaDetalleListCtrl', ['$scope', '$routeParams', 'TareaDetalleService', 'TareaService', '$controller',
function ($scope, $routeParams, service, serviceTarea, $controller) {




        /**Se define variables para la ruta.
         * Son id curso y id tarea
         **/
        $scope.idCurso = $routeParams.idCurso;
        $scope.idTarea = $routeParams.idTarea;

        
        // le paso el id del curso para volver atras.
        $scope.atrasCurso = $routeParams.idCurso;
        $scope.atrasTarea = $routeParams.idTarea;


    
    
    
        /**
         * Se inserta un servicio que trae la tarea asociado
         **/
        $scope.serviceTarea = serviceTarea;
        /**
         * Objeto que corresponde al recurso sobre se el cual se realizan las operaciones
         * de traer la tarea asociado asociada.
         * @field
         * @type {Object}
         */
        $scope.recursoTarea = {};

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         * Trae el recurso tarea que se asocia a la tarea detalle por debajo
         */
        $scope.getRecursoTarea = function () {
            $scope.serviceTarea.obtener($routeParams.idTarea)
                .then(function (response) {
                    $scope.recursoTarea = response.data;
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de obtener la tarea asociada a la tarea detalle");
                });
        };

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
                "key": "acciones",
                "name": "Acciones"
        }
    ];

        // para ver el id del curso y tarea asociada
        console.log($routeParams);
        console.log($scope.recursoTarea);
        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseListCtrl', {
                "$scope": $scope
            }));

            // Se le pasa el id de la tarea para listar sus tareas detalles. 
            $scope.filterBy.tarea = parseInt($routeParams.idTarea);
            $scope.tareaFiltro = $routeParams.idTarea;


            $scope.config.header = header;
            $scope.config.recurso = 'tareaDetalle';

            // se trae la tarea asociado
            $scope.getRecursoTarea();

        })();
}]);
