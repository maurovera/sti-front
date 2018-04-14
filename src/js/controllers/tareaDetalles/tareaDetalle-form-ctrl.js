/**
 * @class TareaDetalleCtrl
 * Controller que implementa el formulario administración de Tareas Detalles
 *</a>
 */
app.controller('TareaDetalleFormCtrl', ['$scope', '$routeParams','TareaDetalleService', 'TareaService','EjercicioService', '$controller',
    function ($scope,$routeParams ,service, serviceTareaForm,serviceEjercicio, $controller) {


        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;
        $scope.servicioEjercicio = serviceEjercicio;

        /**imprime el idCurso, el idTarea y el idTareaDet**/
        console.log($routeParams);


        // le paso el id de la tarea y curso para volver atras.
        $scope.atrasTarea = $routeParams.idTarea;
        $scope.atrasCurso = $routeParams.idCurso;
        // esto lo usa en base controller de view, el id es el recurso que consulta. 
        $routeParams.id = $routeParams.idTareaDet;
       

        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/curso/" + $scope.atrasCurso + "/tarea/"+$scope.atrasTarea+"/tareaDetalle";


        $scope.recursoTarea = {};
        // servicio Tarea
        $scope.serviceTarea = serviceTareaForm;

        $scope.getRecursoTareaForm = function () {
            $scope.serviceTarea.obtener($scope.atrasTarea)
                .then(function (response) {
                    $scope.recursoTarea = response.data;
                    console.log($scope.recursoTarea);
                    /**Aqui se le asigna la tarea a la tarea detalle. Para que este ligado a el**/
                    $scope.recurso.tarea = $scope.recursoTarea;
                    console.log($scope.recurso);
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de obtener la tarea para la tarea detalle");
                });
        };
        
        
        
        
        
        /**Seccion dedicada a traer la lista de ejercicios y asignarla a la tarea detalle**/
                /**Lista de ejercicios para select*/
        $scope.lista = [];
        $scope.ejercicioSeleccionado = [];


        /**
         * Se encarga de obtener la lista de ejercicios para el select.
         * Return <id,enunciado> de ejercicio
         */
        $scope.getListaEjercicio = function () {
            $scope.servicioEjercicio.listarEjercicio()
                .then(function (response) {
                    $scope.loading = false;
                    $scope.lista = response.data.rows;
                    console.log("lista de ejercicios");
                    console.log($scope.lista);


                    //se llena el select de ejercicio. 
                    $("#ejercicioSelect").select2({


                    });

                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo realizar la operación de obtener la lista de ejercicios");
                });
        };




        /**Veremos si funca
         * Funca. 12/04/2018
         **/
        $scope.guardarSeleccionado = function () {
            console.log("entre a guardarSeleccionado view");
            console.log($scope.recurso.ejercicioView);
            $scope.recurso.ejercicio = {};
            console.log("guardados selecionado");
            // guardar solo los codigos.
            $scope.recurso.ejercicio.id = $scope.recurso.ejercicioView.id;
            $scope.recurso.ejercicio.enunciado = $scope.recurso.ejercicioView.enunciado;

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
            
            $scope.getRecursoTareaForm();
            //console.log($scope.recursoAsignatura);
                        // Se ejecuta al iniciar la lista de asignaturas
            $scope.getListaEjercicio();


            $scope.ejercicioSeleccionado = $scope.recurso.ejercicioView;

        })();





    }
]);
