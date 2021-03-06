/***Controller para asignacion de curso tutor al alumno.
 **/
app.controller('CursoAlumnoTareaEjercicioTutorCtrl', ['$scope', '$routeParams', '$location', 'CursoService', 'EjercicioService', 'SesionTutorService', '$controller',
function ($scope, $routeParams, $location, service, ejercicioService,
    sesionTutorService, $controller) {


    //#################DE LA CLASE ANTERIOR PADRE#########################################
    $scope.path = "/cursoAlumno/" + $routeParams.idCurso + "/tarea/" + $routeParams.idTarea + "/ejercicioTutor"

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

    // datos inicial para el criterio del tutor
    $scope.valoresCriterioTutor = {
        'idTarea': $scope.tarea,
        'idAlumno': $scope.alumno,
        'idAsignatura': 1
    };

    // datos inicial para siguiente ejercicio tutor
    $scope.valoresSiguienteEjercicio = {
        'idTarea': $scope.tarea,
        'idAlumno': $scope.alumno,
        'idAsignatura': 1,
        'idConcepto': 0
    };

     // datos inicial para siguiente material tutor
     $scope.valoresSiguienteMaterial = {
        'idTarea': $scope.tarea,
        'idAlumno': $scope.alumno,
        'idAsignatura': 1,
        'idConcepto': 0,
        'idArchivo': 4
    };



    $scope.valor = "B";
    $scope.ejercicioService = ejercicioService;
    $scope.sesionTutorService = sesionTutorService;
    $scope.ejercicio = {};
    $scope.sesionTutor = {};
    $scope.numero = 0;
    /**inicializador */
    $scope.criterioValorTutor = {};

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
    $scope.siguienteEjercicioTutor = function (parametros) {
        $scope.ejercicioService.siguienteEjercicio(parametros)
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
  * Responder ejercicio del segundo test
  */
    $scope.responderEjercicio = function (parametros) {
        $scope.ejercicioService.responderEjercicioTutor(parametros)
            .then(function (response) {
                $scope.loading = false;
                $scope.resp = response.data;
                console.log("Respuesta es correcta o no:  " + $scope.resp);
                /**llama al criterio de nuevo. */
                 $scope.criterioTutor($scope.valoresCriterioTutor);
            }, function (data, code) {
                $scope.lista = [];
                Message.error("No se pudo responder el ejercicio.");
            });
    };


    /**
     * Obtiene el criterio del segundo test.  
     *
     */
    $scope.criterioTutor = function (parametros) {
        $scope.ejercicioService.criterioTutor(parametros)
            .then(function (response) {
                $scope.loading = false;
                $scope.criterioValorTutor = response.data;
                console.log("Resultado de criterio tutor:  ");
                console.log($scope.criterioValorTutor);
                /**Primero controlamos exitoso. que seria true
                 * si ya no existen conceptos a evaluar 
                 */
                if ($scope.criterioValorTutor.exitoso) {
                    console.log("Se para el tutor. y se lanza un mensaje");
                    $scope.valor="C";

                } else if(!$scope.criterioValorTutor.exitoso && $scope.criterioValorTutor.esEjercicio){
                    console.log("esEjercicio True. lado ejercicio");
                    $scope.valor="A";
                    $scope.valoresSiguienteEjercicio.idConcepto = $scope.criterioValorTutor.concepto; 
                    $scope.siguienteEjercicioTutor($scope.valoresSiguienteEjercicio);
                
                } else if(!$scope.criterioValorTutor.exitoso && !$scope.criterioValorTutor.esEjercicio){
                    console.log("esEjercicio false. lado material");
                    $scope.valor="B";
                    $scope.valoresSiguienteMaterial.idConcepto = $scope.criterioValorTutor.concepto;                     
                    $scope.siguienteMaterialTutor($scope.valoresSiguienteMaterial);                    
    
                }

            }, function (data, code) {
                $scope.lista = [];
                Message.error("No se pudo traer el criterio tutor del alumno");
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


    /**funcion para llamar a responder del segundo test.**/
    $scope.respuestaEjercicioTutor = function (numero1) {
        console.log("el numero de la respuesta es: " + numero1);
        $scope.numero = numero1;
        console.log("el numero de la respuesta es: " + $scope.numero);
        console.log("el id del ejercicio es: " + $scope.ejercicio.id);
        // datos inicial para sesion
        $scope.variableResponder = {
            'idTarea': $scope.tarea,
            'idAlumno': $scope.alumno,
            'idAsignatura': 1,
            'respuesta': $scope.ejercicio.listaRespuesta[$scope.numero].descripcion,
            'idEjercicio': $scope.ejercicio.id,
            'idConcepto' : $scope.criterioValorTutor.concepto
        };
        /**No llamo directamente */
        $scope.responderEjercicio($scope.variableResponder);
        
        
        $scope.numero = 0;
    };


    /**
     * Obtiene el siguiente material dentro del test adaptativo
     * Segundo test 
     */
    $scope.material = {};

    $scope.siguienteMaterialTutor = function (parametros) {
        $scope.ejercicioService.siguienteMaterial(parametros)
            .then(function (response) {
                $scope.loading = false;
                $scope.material = response.data;
                console.log("Material:  ");
                console.log($scope.material.id);

            }, function (data, code) {
                $scope.lista = [];
                Message.error("No se pudo realizar la operación de obtener el siguiente material");
            });
    };

      /**
  * Responder material del segundo test
  */
  $scope.respuestaMa = false;
  $scope.responderMaterial = function (parametros) {
    $scope.ejercicioService.responderMaterial(parametros)
        .then(function (response) {
            $scope.loading = false;
            $scope.respuestaMa = response.data;
            console.log("Respuesta es correcta o no:  " + $scope.respuestaMa);
            /**llama al criterio de nuevo. */
             $scope.criterioTutor($scope.valoresCriterioTutor);
        }, function (data, code) {
            $scope.lista = [];
            Message.error("No se pudo responder el material.");
        });
};


/**funcion para llamar a responder material del segundo test.**/
$scope.respuestaMaterialTutor = function () {
    console.log("el id del material es: " + $scope.material.id);
    // datos inicial para sesion
    $scope.variableResponder = {
        'idTarea': $scope.tarea,
        'idAlumno': $scope.alumno,
        'idAsignatura': $scope.material.idAsignatura,
        'idMaterial': $scope.material.id,
        'idConcepto' : $scope.criterioValorTutor.concepto
    };
    /**No llamo directamente */
    $scope.responderMaterial($scope.variableResponder);
    
};



    /**
     * Constructor / Entrypoint
     * @constructor
     */
    (function initialize() {

        //console.log("datos de sesion:");
        //$scope.traerSesion($scope.valoresSesion);

        $scope.criterioTutor($scope.valoresCriterioTutor);


        initPath();

    })();

}]);
