/**
 * @class
 * Controller que implementa el formulario administración de Alumnos
 *</a>
 */
app.controller('TareaFormCtrl', ['$scope', '$routeParams', 'TareaService', 'CursoService', 'TemaService', '$controller',
    function ($scope, $routeParams, service, cursoService, serviceTema, $controller) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */

        $scope.service = service;
        // Servicio curso y curso asignado.
        $scope.servicioCurso = cursoService;
        // servicio tema
        $scope.serviceTema = serviceTema;
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
                    $scope.mostrarConceptos($scope.recurso.curso);
                    return $scope.recursoAsignado;
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de asignar el curso a la tarea");
                    return $scope.recursoAsignado;
                });
        };

        //********************FIN DE OBTENER CURSO *****************************************//


        /** Funcion que es intermediaria entre curso y lista concepto.
        * Funcion que se llama dentro obtener el recurso curso para obtener el id de la asignatura Asociada. 
        * Que seria. 
        * DATO: curso.asignatura.id
        * Este valor se utiliza para llamar a la lista de conceptos asociados al curso y a la tarea en si.
        * RESULTADO : Llama a la funcion getConceptosAsociados(curso.asignatura.id)
        * Se obtiene una lista de conceptos.
        
        **/
        $scope.mostrarConceptos = function (curso) {
            console.log("estoy en mostrar");
            console.log(curso.asignatura.id);
            // se obtiene el id de la asignatura
            $scope.id = curso.asignatura.id;

            // Se le pasa el id de asignatura para listar sus temas. 
            $scope.filterBy = {};
            $scope.filterBy.asignatura = parseInt($scope.id);

            //Datos para la lista
            $scope.inicial = {
                'count': 100,
                'page': 1,
                'sortBy': "id",
                'sortOrder': 'DESC',
                'filters': $scope.filterBy

            };

            //se llama a la funcion getConceptosAsociados
            $scope.getConceptosAsociados($scope.inicial);
        }

        // fin de funcion que une la funcion de obtener curso y lista de conceptos asociados



        //************************************Se utiliza para lista de conceptos**************************************
        $scope.listaFinal = [];
        $scope.recursoConceptos = [];
        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición. 
         * Trae los concepto asociados al ejercicio en si
         */
        $scope.getConceptosAsociados = function (parametros) {
            $scope.serviceTema.listar(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.recursoConceptos = response.data.rows;

                    // rellena la lista final
                    $scope.listaSelect($scope.recursoConceptos);
                    console.log("lista final de finales!!!!");
                    console.log($scope.listaFinal);

                    //se llena el select de conceptos. 
                    $("#selectConcepto").select2({
                        data: $scope.listaFinal


                    });


                    return $scope.recursoConceptos;

                }, function (data, code) {
                    $scope.recursoConceptos = [];
                    Message.error("No se pudo realizar la operación de obtener el tema con los conceptos");
                    $scope.recursoConceptos;
                });
        };


        /**
         * funcion parseadora de la lista que llena el select2 de 
         * conceptos a seleccionar. 
         **/
        $scope.listaSelect = function (lista) {
            // for sobre tema
            angular.forEach(lista, function (value, key) {
                //copiamos el id y el nombre
                $scope.estructura = {};
                $scope.estructura.id = value.id.toString();
                $scope.estructura.text = value.nombre;
                $scope.estructura.children = [];
                console.log("primerfor");
                //for sobre la lista de conceptos
                angular.forEach(value.listaConceptos, function (valor, llave) {
                    console.log("hijo");
                    $scope.hijo = {};
                    $scope.hijo.id = valor.id.toString();
                    $scope.hijo.text = valor.nombre;

                    console.log($scope.hijo);
                    $scope.estructura.children.push($scope.hijo);

                });
                $scope.listaFinal.push($scope.estructura);

            });

        };


        //******************************FIN DE LISTA DE CONCEPTOS *******************************************


        /************************************Inicio de guardar ********************
         * Funca. 10/04/2018
         * Practicamente seria el boton del formulario guardar
         * Guarda la lista de conceptos selecionados en la vista y 
         * llama al final a guardar.
         **/
        $scope.guardarTarea = function () {
            
            //Lista de conceptos asociados de la tarea
            $scope.recurso.listaConceptosTarea = [];
            console.log("guardados asociados");
            // guardar solo los codigos de los conceptos asociados.
            angular.forEach($scope.recurso.conceptosAsociados, function (valor, llave) {
                console.log(valor);
                $scope.conceptoA = {};
                $scope.conceptoA.id = parseInt(valor);
                // guardar como un concepto su id
                $scope.recurso.listaConceptosTarea.push($scope.conceptoA);
            });

            //y llama a la funcion guardar.
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


            $scope.getRecursoCurso();

        })();



    }
]);
