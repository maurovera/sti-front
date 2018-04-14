/**
 * @class
 * Controller que implementa el formulario administración de Temas
 *</a>
 */
app.controller('ConceptoFormCtrl', ['$scope', '$routeParams','ConceptoService', 'TemaService', '$controller',
    function ($scope,$routeParams ,service, serviceTemaForm, $controller) {


        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;


        /**imprime el idAsig, el idTema y el idConcepto**/
        console.log($routeParams);


        // le paso el id del tema y asignatura para volver atras.
        $scope.atrasTema = $routeParams.idTema;
        $scope.atrasAsig = $routeParams.idAsig;
        // esto lo usa en base controller de view, el id es el recurso que consulta. 
        $routeParams.id = $routeParams.idConcepto;
       

        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/asignatura/" + $scope.atrasAsig + "/tema/"+$scope.atrasTema+"/concepto";


        
        
        //$scope.recursoTema = {}; Pregunta. En getRecurso. Si le pones el route params no funciona pero si una variable
        $scope.serviceTema = serviceTemaForm;

        $scope.getRecursoTemaForm = function () {
            $scope.serviceTema.obtener($scope.atrasTema)
                .then(function (response) {
                    $scope.recursoTema = response.data;
                    console.log($scope.recursoTema);
                    /**Aqui se le asigna el tema al concepto. Para que este ligado a el**/
                    $scope.recurso.tema = $scope.recursoTema;
                    console.log($scope.recurso);
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de obtener el tema para el concepto form");
                });
        };



        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseFormCtrl', {
                "$scope": $scope
            }));
            
            $scope.getRecursoTemaForm();
            //console.log($scope.recursoAsignatura);

        })();





    }
]);
