/***Controller para asignacion de curso al alumno.
 **/
app.controller('CursoAlumnoListCtrl', ['$scope', 'CursoService', '$controller',
function ($scope, service, $controller) {

    
        $scope.valor="A";
        $scope.idAProbar = 1;
        /**
         * Servicio curso
         */
        $scope.service = service;
        /**Lista de cursos */
        $scope.lista = [];
        $scope.listaCursoAlumno = [];

        /**
        * Se encarga de obtener la lista de cursos disponibles para el alumno.
         * Return <id,nombre,descripcion> de Curso
         */
        $scope.getListaCurso = function (parametros) {
            $scope.service.listarCurso(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.lista = response.data.rows;
                    console.log("lista de Cursos");
                    console.log($scope.lista);

                }, function (data, code) {
                    $scope.lista = [];
                    Message.error("No se pudo realizar la operación de obtener la lista de cursos");
                });
        };

        /****FIN DE LISTA DE CURSO DISPONIBLES*/
    
        /**
        * Se encarga de obtener la lista de cursos disponibles para el alumno.
         * Return <id,nombre,descripcion> de Curso
         */
        $scope.getListaCursoAlumno = function (parametros) {
            $scope.service.listarCursoAlumno(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.listaCursoAlumno = response.data.rows;
                    console.log("lista de Cursos del alumno");
                    console.log($scope.listaCursoAlumno);

                }, function (data, code) {
                    $scope.listaCursoAlumno = [];
                    Message.error("No se pudo realizar la operación de obtener la lista de cursos del alumno");
                });
        };

        /****FIN DE LISTA DE CURSO DISPONIBLES*/

    
    
    
    
    
    
    
        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {

            console.log("cambio");
            //Se llama a la funcion getListaCurso
            //Datos para la lista
            $scope.inicial = {
                'idAlumno': $scope.idAProbar
                

            };
            $scope.getListaCurso($scope.inicial);
             $scope.getListaCursoAlumno($scope.inicial);
        })();



}]);
