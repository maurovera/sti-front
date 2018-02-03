/**
 * @class
 * Controller que implementa el formulario administración de Temas
 *</a>
 */
app.controller('TemaFormCtrl', ['$scope', '$routeParams','TemaService', 'AsignaturaService', '$controller',
    function ($scope,$routeParams ,service, serviceA, $controller) {


        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;


        /**imprime el idAsig y el idTema**/
        console.log($routeParams);


        // le paso el id la asignatura para volver atras.
        $scope.atras = $routeParams.idAsig;
        // esto lo usa en base controller de view, el id es el recurso que consulta. 
        $routeParams.id = $routeParams.idTema;
        // se le asigna la asignatura al recurso que se selecciona. Independiente a si modifica o elimina o etc.
        //$scope.recurso.asignatura = $routeParams.idAsig;

        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/asignatura/" + $scope.atras + "/tema";


        
        
        $scope.recursoAsignatura = {};
        $scope.serviceAsignatura = serviceA;

        $scope.getRecursoAsignatura = function () {
            $scope.serviceAsignatura.obtener($scope.atras)
                .then(function (response) {
                    $scope.recursoAsignatura = response.data;
                    console.log($scope.recursoAsignatura);
                    $scope.recurso.asignatura = $scope.recursoAsignatura;
                    console.log($scope.recurso);
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de obtener la asignatura");
                });
        };


        //console.log("imprimi el recurso asig");
        //console.log($scope.recursoAsignatura);
        //console.log($routeParams.idAsig);
       // console.log($scope.recurso);




        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseFormCtrl', {
                "$scope": $scope
            }));
            
            $scope.getRecursoAsignatura();
            //console.log($scope.recursoAsignatura);

        })();





    }
]);
