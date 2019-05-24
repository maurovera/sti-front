/***Controller para asignacion de curso al alumno.
 **/
app.controller('CursoAlumnoListCtrl', ['$scope', 'CursoService', '$controller',
    function ($scope, service, $controller) {

        /**Valor para el panel de disponible y no disponible. */
        $scope.valor = "B";
        /**Obtenemos del cookie el id para listar. Esto tiene que ser una factoria
         * o guardase en una factoria
         */
        var userGuardado = localStorage.getItem("user");
        var userGuardado = JSON.parse(userGuardado);
        console.log("user id del usuario: " + userGuardado.idAlumno);
        console.log("nombre del usuario: " + userGuardado.usuario);
        $scope.idAlu = userGuardado.idAlumno;
       


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
         * Este listar esta mal porque trae muchisimos. 
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

            $scope.inicial = {
                'idAlumno': $scope.idAlu
            };

            $scope.getListaCurso($scope.inicial);
            $scope.getListaCursoAlumno($scope.inicial);
        })();



    }]);
