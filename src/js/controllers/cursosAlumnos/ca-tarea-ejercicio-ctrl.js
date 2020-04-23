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
        console.log("user id del usuario: " + userGuardado.idAlumno);
        console.log("nombre del usuario: " + userGuardado.usuario);
        $scope.alumno = userGuardado.idAlumno;
        $scope.tarea = $routeParams.idTarea;
        $scope.idCursoNumero = $routeParams.idCurso;

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
        //$scope.asignatura = 2;
        $scope.ejercicioService = ejercicioService;
        $scope.sesionTutorService = sesionTutorService;
        $scope.serviceCurso = service;

        $scope.ejercicio = {};
        $scope.sesionTutor = {};
        $scope.numero = 0;
        $scope.espacio = " ";
        $scope.criterioValor = false;
        $scope.curso = {};
        
        /**imprime el idAsig y el idTema**/
        console.log($routeParams);



        /**
         * Trae un curso. 
         * Para poder asignarle el id de la asignatura. solamente para eso.
         */
        $scope.getRecursoCurso = function (parametroCurso) {
            $scope.serviceCurso.obtener(parametroCurso)
                .then(function (response) {
                    $scope.curso = response.data;
                    $scope.valoresSiguiente.idAsignatura = $scope.curso.asignatura.id;
                }, function (data, code) {
                    $scope.recursoCurso = {};
                    Message.error("No se pudo realizar la operación de obtener el curso");
                });
        };


        /**
         * Trae la lista de resueltos en el primer test. 
         */
        $scope.resueltos = {};
        $scope.getListaResueltos = function () {
            console.log("putaaaaaa mostrameeeee");
            console.log($scope.valoresSesion);
            
            $scope.ejercicioService.listarResueltoFinal($scope.valoresSesion)
                .then(function (response) {
                    $scope.resueltos = response.data.rows;
                    $scope.valorVentana = "B";
                }, function (data, code) {
                    $scope.recursoCurso = {};
                    Message.error("No se pudo realizar la operación de obtener la lista de resueltos");
                });
        };


        /**Resueltos. Pero vamos a intentar trae en sesion */
        $scope.getListaResueltosSesion = function (finalTestDecision) {
            if(finalTestDecision === true){
                $scope.ejercicioService.listarResueltoFinal($scope.valoresSesion)
                .then(function (response) {
                    $scope.resueltos = response.data.rows;
                    //$scope.valorVentana = "B";
                }, function (data, code) {
                    $scope.recursoCurso = {};
                    Message.error("No se pudo realizar la operación de obtener la lista de resueltos");
                });     
            }else{
                $scope.ejercicioService.listarResueltoInicial($scope.valoresSesion)
                .then(function (response) {
                    $scope.resueltos = response.data.rows;
                    //$scope.valorVentana = "B";
                }, function (data, code) {
                    $scope.recursoCurso = {};
                    Message.error("No se pudo realizar la operación de obtener la lista de resueltos");
                });
            }
            
           
        };



        /**
         * Obtiene la sesion anterior de alumno. o crea una nueva sesion
         *
         */
        $scope.tipoDeTest = "";
        $scope.traerSesion = function (parametros) {
            $scope.sesionTutorService.comprobarSesion(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.sesionTutor = response.data;
                    console.log("Sesion y cantidad ejercicios resueltos:  ");
                    console.log($scope.sesionTutor.id);
                    console.log($scope.sesionTutor.cantidadEjerciciosResueltos);
                    console.log("este puto:"+$scope.sesionTutor.testFinal);
                    if($scope.sesionTutor.testFinal === true){
                        console.log("entre en test final");
                        $scope.tipoDeTest = "Test Final";
                        $scope.getListaResueltosSesion(true);
                    }else{
                        console.log("entre en test inicial");
                        $scope.tipoDeTest = "Test Inicial";
                        $scope.getListaResueltosSesion(false);
                    };
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
                    $scope.numero = "0";

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
                    $scope.criterio($scope.valoresSesion);
                    $scope.numero = "0";
                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo responder el ejercicio.");
                });
        };


        /**
         * Obtiene el criterio del primer test.  
         *
         */
        $scope.valorVentana = "A";
        $scope.criterio = function (parametros) {
            $scope.ejercicioService.criterio(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.criterioValor = response.data;
                    console.log("Resultado de criterio:  ");
                    console.log($scope.criterioValor);
                    if ($scope.criterioValor) {
                        console.log("criterio true. parar el tema");
                        console.log("miraaaaaaque tipo test es");
                        console.log($scope.tipoDeTest); 
                        /**Se llama para traer los resultados */
                        //$scope.getListaResueltos();
                        $scope.valorVentana = "B";
                        $scope.traerSesion($scope.valoresSesion);
                       
                    } else {
                        console.log("criterio false. seguir nde loco");
                        $scope.valorVentana = "A";
                        $scope.numero = "0";
                        $scope.siguienteEjercicio($scope.valoresSiguiente);
                    }
                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo traer el criterio del alumno");
                });
        };

        /**mostrar btn */
        $scope.mostrar = function () {
            if ($scope.criterioValor) {
                return false;
            } else {
                return true;
            }
        };


        /**funcion para llamar a responder del primer test.**/
        $scope.respuestaEjercicio = function (parametro) {
            console.log("el parametro es: " + parametro);
            $scope.numero = parametro;
            console.log("el numero de la respuesta es: " + $scope.numero);
            console.log("el id del ejercicio es: " + $scope.ejercicio.id);
            // datos inicial para sesion
            $scope.variableResponder = {
                'idTarea': $scope.tarea,
                'idAlumno': $scope.alumno,
                'idAsignatura': $scope.curso.asignatura.id,
                'respuesta': $scope.ejercicio.listaRespuesta[$scope.numero].descripcion,
                'idEjercicio': $scope.ejercicio.id
            };
            /**No llamo directamente */
            $scope.responder($scope.variableResponder);

            /**llama al criterio de nuevo. */
            //$scope.criterio($scope.valoresSesion);
            //$scope.numero = 0;
        };


        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {

            //console.log("datos de sesion:");
            //$scope.traerSesion($scope.valoresSesion);

            $scope.criterio($scope.valoresSesion);
            $scope.getRecursoCurso($scope.idCursoNumero);
            $scope.traerSesion($scope.valoresSesion);
            $scope.numero = "0";

            initPath();

        })();

    }]);
