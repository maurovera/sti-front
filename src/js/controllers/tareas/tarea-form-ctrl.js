/**
 * @class
 * Controller que implementa el formulario administración de Alumnos
 *</a>
 */
app.controller('TareaFormCtrl', ['$scope', '$routeParams', 'TareaService', 'CursoService', '$controller',
    function ($scope, $routeParams, service, cursoService, $controller) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;
        // Servicio curso y curso asignado.
        $scope.servicioCurso = cursoService;
        $scope.cursoAsignado = [];

        // le paso el id del curso para volver atras.
        $scope.atras = $routeParams.idCurso;
        // esto lo usa en base controller de view, el id es el recurso que consulta. 
        $routeParams.id = $routeParams.idTarea;
        console.log($routeParams);

        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/curso/" + $scope.atras + "/tarea";


        /**Se obtiene el curso para asignarle a la tarea
         */
        $scope.getRecursoCurso = function () {
            $scope.servicioCurso.obtener($scope.atras)
                .then(function (response) {
                    $scope.cursoAsignado = response.data;
                    // se le asigna el curso a la tarea.
                    $scope.recurso.curso = $scope.cursoAsignado;
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de asignar el curso a la tarea");
                });
        };



        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseFormCtrl', {
                "$scope": $scope
            }));




            // se ejecuta la funcion obtener curso
            $scope.getRecursoCurso();


        })();



    }
]);
