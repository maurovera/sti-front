/**
 * @class
 * Controller que implementa la busqueda y listado de Ejercicios.
 *
 * @name angular-keycloak-seed.controller##TemaListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.controller('EjercicioListCtrl', ['$scope', '$routeParams', 'EjercicioService', 'AsignaturaService', '$controller',
function ($scope, $routeParams, service, serviceAsig, $controller) {



        // Id de la asignatura. Para saber que temas traer.
        $scope.asignaturaId = $routeParams.idAsig;
        $scope.service = service;
        $scope.serviceAsig = serviceAsig;


        var header = [{
                "key": "enunciado",
                "name": "Enunciado"
        }, {
                "key": "nivelDificultad",
                "name": "Nivel de dificultad"
        }, {
                "key": "adivinanza",
                "name": "Descuido"
        }, {
                "key": "acciones",
                "name": "Acciones"
        }
    ];



        /**
         * Lista los ejercicios pasandole como filtro el id de asignatura.
         * En el back se obtiene la lista de ejercicios asociado a el.
         **/
        $scope.getResourceEjercicio = function (params, paramsObj) {
            paramsObj.sortOrder = paramsObj.sortOrder == 'dsc' ? "DESC" : "ASC";
            $scope.loading = true;
            $scope.config.pagination.page = paramsObj.page;
            $scope.config.pagination.count = paramsObj.count;
            if (paramsObj.filters) {
                $scope.deleteUndefinedValues(paramsObj.filters);
            }
            return $scope.serviceAsig.listarEjercicio(paramsObj)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.config.rows = response.data.rows;
                    $scope.config.pagination.size = response.data.count;
                    $scope.config.pagination.pages = Math.ceil(response.data.count / $scope.config.pagination.count);
                    return $scope.config;
                }, function (response) {
                    $scope.loading = null;
                    $scope.config.rows = [];
                    $scope.config.pagination.size = 0;
                    $scope.config.pagination.pages = 0;
                    return $scope.config;
                });
        };


        /**Se trae el recurso asignatura*/
        $scope.recursoAsignatura = {};

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         * Trae una asignatura 
         */
        $scope.getRecursoAsig = function () {
            $scope.serviceAsig.obtener($scope.asignaturaId)
                .then(function (response) {
                    $scope.recursoAsignatura = response.data;
                }, function (data, code) {
                    Message.error("No se pudo realizar la operación de obtener la asignatura");
                });
        };





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
            //$scope.filterBy.asignatura = parseInt($routeParams.idAsig);
            //$scope.asig = $routeParams.idAsig;

            $scope.config.header = header;
            $scope.config.recurso = 'ejercicio';
            // Se le pasa el id de asignatura para listar sus temas. 
            $scope.filterBy.asignatura = parseInt($routeParams.idAsig);


            // se trae la asignatura
            $scope.getRecursoAsig();

        })();

}]);
