/***Controller para asignacion de curso al alumno.
 **/
app.controller('CursoAlumnoTareaEjercicioCtrl', ['$scope', '$routeParams', '$location', 'CursoService', 'EjercicioService', 'SesionTutorService', '$controller',
    function ($scope, $routeParams, $location, service, ejercicioService,
        sesionTutorService, $controller) {


        //#################DE LA CLASE ANTERIOR PADRE#########################################
        $scope.path = "/cursoAlumno/" + $routeParams.idCurso + "/tarea/" + $routeParams.idTarea + "/ejercicio"

        /**
        * @private
        * ESta función se encarga de calcular el path del recurso para urls
        * compuestas
        */
        function initPath() {
            var tokens = $location.$$path.split("/");
            for (var i = 0; i < tokens.length - 2; i++) {
                $scope.path += tokens[i] + "/";
            }
            //se elimina la última /
            $scope.path = $scope.path.substr(0, $scope.path.length - 1);
        }
        //#########################FIN DE CLASE ANTERIOR PADRE############################    


        //Trae el id de alumno y id tarea
        var userGuardado = localStorage.getItem("user");
        var userGuardado = JSON.parse(userGuardado);
        console.log("user id del usuario: " + userGuardado.userId);
        console.log("nombre del usuario: " + userGuardado.usuario);
        $scope.alumno = userGuardado.userId;
        $scope.tarea = $routeParams.idTarea;

        // datos inicial para sesion
        $scope.valoresSesion = {
            'idTarea': $scope.tarea,
            'idAlumno': $scope.alumno
        };

        // datos inicial para sesion
        $scope.valoresSiguiente = {
            'idTarea': $scope.tarea,
            'idAlumno': $scope.alumno,
            'idAsignatura': 1
        };



        $scope.valor = "A";
        //$scope.alumno = 19;
        $scope.asignatura = 2;
        $scope.ejercicioService = ejercicioService;
        $scope.sesionTutorService = sesionTutorService;
        $scope.ejercicio = {};
        $scope.sesionTutor = {};
        $scope.numero = 0;
        $scope.criterioValor = false;

        /**imprime el idAsig y el idTema**/
        console.log($routeParams);


        /**
         * Obtiene la sesion anterior de alumno. o crea una nueva sesion
         *
         */
        $scope.traerSesion = function (parametros) {
            $scope.sesionTutorService.comprobarSesion(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.sesionTutor = response.data;
                    console.log("Sesion y cantidad ejercicios resueltos:  ");
                    console.log($scope.sesionTutor.id);
                    console.log($scope.sesionTutor.cantidadEjerciciosResueltos);
                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo realizar la operación de obtener la sesion");
                });
        };

        /**
         * Obtiene el siguiente ejercicio dentro del test adaptativo
         * Primer test 
         */
        $scope.siguienteEjercicio = function (parametros) {
            $scope.ejercicioService.siguiente(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.ejercicio = response.data;
                    console.log("Ejercicio ");
                    console.log($scope.ejercicio.id);

                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo realizar la operación de obtener el siguiente Ejercicio");
                });
        };


        /**
      * Responder ejercicio del primer test 
      */
        $scope.responder = function (parametros) {
            $scope.ejercicioService.responder(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.resp = response.data;
                    console.log("Respuesta es correcta o no:  " + $scope.resp);
                    /*if ($scope.resp) {
                        Message.ok("Respondiste correctamente el ejercicio");
                    } else {
                        Message.error("Respondiste mal el ejercicio");
                    }*/
                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo responder el ejercicio.");
                });
        };


        /**
         * Obtiene el criterio del primer test.  
         *
         */
        $scope.criterio = function (parametros) {
            $scope.ejercicioService.criterio(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.criterioValor = response.data;
                    console.log("Resultado de criterio:  ");
                    console.log($scope.criterioValor);
                    if ($scope.criterioValor) {
                        console.log("criterio true. parar el tema");
                    } else {
                        console.log("criterio false. seguir nde loco");
                        $scope.siguienteEjercicio($scope.valoresSiguiente);
                    }
                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo traer el criterio del alumno");
                });
        };

        /**mostrar btn */
        $scope.mostrar = function () {
            if($scope.criterioValor){
                return false;
            }else{
                return true;
            }
        };


        /**funcion para llamar a responder del primer test.**/
        $scope.respuestaEjercicio = function () {
            console.log("el numero de la respuesta es: " + $scope.numero);
            console.log("el id del ejercicio es: " + $scope.ejercicio.id);
            // datos inicial para sesion
            $scope.variableResponder = {
                'idTarea': $scope.tarea,
                'idAlumno': $scope.alumno,
                'idAsignatura': 1,
                'respuesta': $scope.ejercicio.listaRespuesta[$scope.numero].descripcion,
                'idEjercicio': $scope.ejercicio.id
            };
            /**No llamo directamente */
            $scope.responder($scope.variableResponder);
            
            /**llama al criterio de nuevo. */
            $scope.criterio($scope.valoresSesion);
            $scope.numero = 0;
        };


        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {

            //console.log("datos de sesion:");
            //$scope.traerSesion($scope.valoresSesion);

            $scope.criterio($scope.valoresSesion);


            initPath();

        })();

    }]);
