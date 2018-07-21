/***Controller para asignacion de curso al alumno.
 **/
app.controller('CursoAlumnoTareaEjercicioCtrl', ['$scope', 'CursoService','EjercicioService', '$controller',
function ($scope, service,ejercicioService, $controller) {


        $scope.valor = "A";
        $scope.alumno = 1;
        $scope.ejercicioService = ejercicioService;
        $scope.ejercicio = {};
        $scope.numero = 0;

        /**
         * Obtiene el siguiente ejercicio dentro del test adaptativo 
         *
         */
        $scope.getSiguienteEjercicio = function (parametros) {
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
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {

            
            console.log("inicializador");
            
            $scope.variables = {
                'idTarea': 1,
                'idAlumno':1,
                'idAsignatura':1,
                'respuesta':"respuesta",
                'idEjercicioAnterior':0
            };
            
            $scope.getSiguienteEjercicio($scope.variables);
            



        })();



}]);
