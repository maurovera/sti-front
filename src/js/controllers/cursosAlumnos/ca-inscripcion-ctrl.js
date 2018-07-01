/**
 * @class
 * Controller que implementa el formulario administración de la inscripcion
 *</a>
 */
app.controller('CursoAlumnoInscripcion', ['$scope', 'CursoService', '$controller','$routeParams','$location',
    function ($scope, service, $controller, $routeParams, $location) {

        $scope.service = service;
        $scope.uri = "/cursoAlumno";
        
        
          /**imprime el idAsig, el idTema y el idConcepto**/
        console.log($routeParams);



        // esto es para que le llame a modificar curso.
        $routeParams.id = $routeParams.idCurso;
        console.log($routeParams);
        
        
        /////////////DESDE AQUI CONTROLES PARA AGREGAR ALUMNO///////////////////////////////
         /**
         * Se encarga de persistir los datos del modelo.
         */
        $scope.guardarCurso = function () {
                console.log("estoy en guardarCurso");
                $scope.recurso.alumno = 2;
                this.editarRecursoAlumno();
            
        };
        /**
         * Se encarga de actualizar los datos del recurso.
         */
        $scope.editarRecursoAlumno = function () {
            console.log("entre en editar curso")
            $scope.disabledButtonSave = true;
            return this.service.agregarAlumno($scope.recurso)
                .then(this.guardarSuccessAlumno, this.editarRecursoErrorAlumno);
        };

        /**
         *Mensaje de error si no se puede inscribir.
         *
         */
        $scope.editarRecursoErrorAlumno = function (data) {
            $scope.disabledButtonSave = false;
            Message.error("No se pudo inscribir");
        };

        /**
         * Mensaje si se guarda bien el alumno
         */
        $scope.guardarSuccessAlumno = function (response) {
            $scope.disabledButtonSave = false;
            Message.ok("El Alumno se ha inscripto exitosamente.");
            $location.url($scope.uri);
        };
        // fin de agregar alumno.


        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseFormCtrl', {
                "$scope": $scope
            }));
        })();
        
        
        
        
    }
]);
