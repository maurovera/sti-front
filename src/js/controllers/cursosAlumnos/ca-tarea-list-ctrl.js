/**
 *Controller para listar las tareas del curso disponible.
 **/
app.controller('CursoAlumnoTareaListCtrl', ['$scope', '$routeParams', 'TareaService', 'CursoService', '$controller',
function ($scope, $routeParams, service, serviceCurso, $controller) {


        /**
         * Servicio del tarea
         */
        $scope.service = service;

        /** para ver el id del curso */
        console.log($routeParams);


        /**
         * Se inserta un servicio que trae el curso
         **/
        $scope.serviceCurso = serviceCurso;
        /**
         * Objeto que va a guardar los datos del curso
         */
        $scope.recursoCurso = {};

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         * Trae un recurso de curso. 
         */
        $scope.getRecursoCurso = function () {
            $scope.serviceCurso.obtener($routeParams.idCurso)
                .then(function (response) {
                    $scope.recursoCurso = response.data;
                }, function (data, code) {
                    $scope.recursoCurso = {};
                    Message.error("No se pudo realizar la operación de obtener el curso asociado");
                });
        };


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
                "name": "Descripción"
        }, {
                "key": "estadoTarea",
                "name": "Estado de la tarea"
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
            // se hereda del controller base



            angular.extend(this, $controller('BaseListCtrl', {
                "$scope": $scope
            }));

            // Se le pasa el id de curso para listar sus tareas. 
            $scope.filterBy.curso = parseInt($routeParams.idCurso);
            $scope.curso = $routeParams.idCurso;

            $scope.config.header = header;
            $scope.config.recurso = 'tarea';

            // se trae el curso
            $scope.getRecursoCurso();




        })();





}]);
