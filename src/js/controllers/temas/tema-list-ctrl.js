/**
 * @class
 * Controller que implementa la busqueda y listado de temas.
 *
 * @name angular-keycloak-seed.controller##TemaListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.controller('TemaListCtrl', ['$scope', '$routeParams', 'TemaService', 'AsignaturaService', '$controller',
function ($scope, $routeParams, service, serviceAsig, $controller) {


        /**
         * Se inserta un servicio que trae la asignatura
         **/
        $scope.serviceAsig = serviceAsig;
        /**
         * Objeto que corresponde al recurso sobre se el cual se realizan las operaciones
         * de traer la asignatura asociada.
         * @field
         * @type {Object}
         */
        $scope.recursoAsig = {};

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         */
        $scope.getRecursoAsig = function () {
            $scope.serviceAsig.obtener($routeParams.idAsig)
                .then(function (response) {
                    $scope.recursoAsig = response.data;
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de obtener la asignatura");
                });
        };


        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;

        // para ver el id de la asignaturas imprimi bien
        console.log($routeParams);
        console.log($scope.recursoAsig);

        /**
         * Configuraciones de la cabecera de la grilla.
         * @private
         * @type {Array}
         */
        var header = [{
                "key": "nombre",
                "name": "Nombre"
        }, {
                "key": "descripcion",
                "name": "Descripcion"
        }, {
                "key": "peso",
                "name": "Peso"
        }, {
                "key": "acciones",
                "name": "Acciones"
        }
    ];

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base



            angular.extend(this, $controller('BaseListCtrl', {
                "$scope": $scope
            }));

            // Se le pasa el id de asignatura para listar sus temas. 
            $scope.filterBy.asignatura = parseInt($routeParams.idAsig);
            $scope.asig = $routeParams.idAsig;

            $scope.config.header = header;
            $scope.config.recurso = 'tema';
            
            // se trae la asignatura
            $scope.getRecursoAsig();




        })();





}]);
