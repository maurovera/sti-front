/**
 * @class
 * Controller que implementa el formulario administración de Alumnos
 *</a>
 */
app.controller('CursoFormCtrl', ['$scope', 'CursoService', 'AsignaturaService', '$controller',
    function ($scope, service, asignaturaService, $controller) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         * Asignatura service. Servicio de asignatura para la lista de select
         */
        $scope.service = service;
        $scope.asignaturaServicio = asignaturaService;
        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/curso/";

        /**Lista de asignaturas para select*/
        $scope.lista = [];
        $scope.asignaturaSeleccionada = [];


        /**
         * Se encarga de obtener la lista de asignaturas para el select.
         * Return <id,nombre> de asignatura
         */
        $scope.getListaAsignatura = function () {
            $scope.asignaturaServicio.listarAsignatura()
                .then(function (response) {
                    $scope.loading = false;
                    $scope.lista = response.data.rows;
                    console.log("lista de asignaturas");
                    console.log($scope.lista);


                    //se llena el select de asignaturas
                    $("#asignaturaSelect").select2({
                    placeholder: "Seleccione una asignatura", allowClear: true

                    });

                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo realizar la operación de obtener la lista de asignaturas");
                });
        };




        /**Veremos si funca
         * Funca. 11/04/2018
         **/
        $scope.guardarSeleccionado = function () {
            console.log("entre a guardarSeleccionado view");
            console.log($scope.recurso.asignaturaView);
            $scope.recurso.asignatura = {};
            console.log("guardados selecionado");
            // guardar solo los codigos.
            $scope.recurso.asignatura.id = $scope.recurso.asignaturaView.id;
            $scope.recurso.asignatura.nombre = $scope.recurso.asignaturaView.nombre;

            $scope.guardar();
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

            console.log("recurso asig view");
            console.log($scope.recurso);
            // Se ejecuta al iniciar la lista de asignaturas
            $scope.getListaAsignatura();


            $scope.asignaturaSeleccionada = $scope.recurso.asignaturaView;


        })();






    }
]);
