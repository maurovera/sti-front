/**
 * @class
 * Controller que implementa el formulario administración de la inscripcion
 *</a>
 */
app.controller('CursoAlumnoInscripcion', ['$scope', 'CursoService', '$controller','$routeParams','$location',
    function ($scope, service, $controller, $routeParams, $location) {

        $scope.service = service;
        $scope.uri = "/cursoAlumno";
        
        /**Obtenemos del cookie el id para listar. Esto tiene que ser una factoria
         * o guardase en una factoria
         */
        var userGuardado = localStorage.getItem("user");
        var userGuardado = JSON.parse(userGuardado);
        console.log("user id del usuario: " + userGuardado.idAlumno);
        console.log("nombre del usuario: " + userGuardado.usuario);
        $scope.idAlu = userGuardado.idAlumno;
       
        
          /**imprime el id y el idCurso**/
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
                $scope.recurso.alumno = userGuardado.idAlumno;
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
            Message.ok("El Alumno "+ userGuardado.usuario + " se ha inscripto exitosamente.");
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
