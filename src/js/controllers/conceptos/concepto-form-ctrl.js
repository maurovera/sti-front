/**
 * @class
 * Controller que implementa el formulario administración de Temas
 *</a>
 */
app.controller('ConceptoFormCtrl', ['$scope', '$routeParams', 'ConceptoService', 'TemaService', '$controller',
    function ($scope, $routeParams, service, serviceTemaForm, $controller) {


        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;


        /**imprime el idAsig, el idTema y el idConcepto**/
        console.log("primer routeparams: "+ $routeParams);


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
        $scope.uri = "/asignatura/" + $scope.atrasAsig + "/tema/" + $scope.atrasTema + "/concepto";




        //$scope.recursoTema = {}; Pregunta. En getRecurso. Si le pones el route params no funciona pero si una variable
        $scope.serviceTema = serviceTemaForm;

        $scope.getRecursoTemaForm = function () {
            $scope.serviceTema.obtener($scope.atrasTema)
                .then(function (response) {
                    $scope.recursoTema = response.data;
                    console.log("recurso: "+$scope.recursoTema);
                    /**Aqui se le asigna el tema al concepto. Para que este ligado a el**/
                    $scope.recurso.tema = $scope.recursoTema;
                    
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de obtener el tema para el concepto form");
                });
        };
        
        
        /**Funcion guardar concepto. */
        $scope.guardarConcepto = function () {
            // id de la asignatura ligada a los conceptos.
            $scope.recurso.idAsignatura = $scope.atrasAsig;
            
            console.log("recurso en guardar:"+$scope.recurso.idAsignatura);
            
            //Funcion guardar heredado. 
            $scope.guardar();
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
            
            
            $routeParams.id = $routeParams.idConcepto;
            
            $scope.atrasTema = $routeParams.idTema;
            $scope.atrasAsig = $routeParams.idAsig;
            $scope.recurso.idAsignatura = $scope.atrasAsig;
            console.log("inicial: "+ $scope.atrasTema + ","+ $scope.atrasAsig+","+ $scope.recurso.idAsignatura + "inicio" );
            $scope.getRecursoTemaForm();
            //Lista conocimiento previo
            $scope.listaConocimiento = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5,0.55,
                                        0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
            //lista peso o importancia
            $scope.listaPeso = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5,0.55,
                                        0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];

        })();





    }
]);
