app.controller('EstiloAprendizajeResumenViewCtrl', ['$scope', 'EstiloAprendizajeService', 'AlumnoService', '$controller',
    function ($scope, service, serviceAlu, $controller) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.serviceAlumno = serviceAlu;


        //Trae el id de alumno y id tarea
        var userGuardado = localStorage.getItem("user");
        var userGuardado = JSON.parse(userGuardado);
        console.log("user id del usuario: " + userGuardado.userId);
        console.log("nombre del usuario: " + userGuardado.usuario);
        $scope.idAlu = userGuardado.idAlumno;



        $scope.alumno = {};
        $scope.estilo = {};

        $scope.getAlumno = function (parametros) {
            $scope.serviceAlumno.obtener(parametros)
                .then(function (response) {
                    $scope.alumno = response.data;
                    $scope.estilo = $scope.alumno.estilo;

                    console.log("nombre: " + $scope.alumno.nombres);
                }, function (data, code) {
                    $scope.listaTareas = {};
                    Message.error("No se pudo realizar la operación de obtener el alumno");
                });
        };

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {

            $scope.getAlumno($scope.idAlu);


        })();
    }
]);



