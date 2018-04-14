/**
 * @class
 * Controller que implementa la busqueda y listado de conceptos.
 *
 * @name angular-keycloak-seed.controller##EmpresaListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.controller('ConceptoListCtrl', ['$scope', '$routeParams', 'ConceptoService', 'TemaService', '$controller',
function ($scope, $routeParams, service, serviceTema, $controller) {


    
    
        /**Se define variables para la ruta.**/
        $scope.idAsignatura = $routeParams.idAsig;
        $scope.idTema = $routeParams.idTema;
        /**
         * Se inserta un servicio que trae el tema asociado
         **/
        $scope.serviceTema = serviceTema;
        /**
         * Objeto que corresponde al recurso sobre se el cual se realizan las operaciones
         * de traer el tema asociado asociada.
         * @field
         * @type {Object}
         */
        $scope.recursoTema = {};

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         */
        $scope.getRecursoTema = function () {
            $scope.serviceTema.obtener($routeParams.idTema)
                .then(function (response) {
                    $scope.recursoTema = response.data;
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de obtener el tema");
                });
        };

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;

        /**
         * Configuraciones de la cabecera de la grilla.
         * @private
         * @type {Array}
         */
        var header = [{
                "key": "nombre",
                "name": "Nombre"
        },{
                "key": "apriori",
                "name": "Ariori"
        }, {
                "key": "peso",
                "name": "Peso"
        }, {
                "key": "acciones",
                "name": "Acciones"
        }
    ];
    
        // para ver el id de la asignaturas imprimi bien
        console.log($routeParams);
        console.log($scope.recursoTema);
    
        // le paso el id del tema y asignatura para volver atras.
        $scope.atrasAsig = $routeParams.idAsig;

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseListCtrl', {
                "$scope": $scope
            }));

            // Se le pasa el id del tema para listar sus conceptos. 
            $scope.filterBy.tema = parseInt($routeParams.idTema);
            $scope.temaFiltro = $routeParams.idTema;
            
            
            $scope.config.header = header;
            $scope.config.recurso = 'concepto';
            
            // se trae el tema asociado
            $scope.getRecursoTema();
            
        })();
}]);
