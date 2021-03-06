
app.controller('AlumnoListCtrl', ['$scope', 'AlumnoService', '$controller',
function ($scope, service, $controller) {

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
            "key": "nombres",
            "name": "Nombre"
        }, {
            "key": "apellidos",
            "name": "Apellido"
        },{
            "key": "acciones",
            "name": "Acciones"
        }
    ];
    
    
    
    
    
    /**
     * Constructor / Entrypoint
     * @constructor
     */
    (function initialize() {
        
        $scope.filterBy = {'id':1};
        // se hereda del controller base
        angular.extend(this, $controller('BaseListCtrl', {
            "$scope": $scope
        }));
        
        $scope.config.header = header;
        $scope.config.recurso = 'alumno';
        
        console.info($scope.config);
        //$scope.getResource($scope.init, $scope.filterBy);
    })();
}]);




/*
app.controller('BaseListCtrl', ['$scope', '$location',
    function ($scope, $location) {



        $scope.path = $location.$$path;
        /**
         * Maneja el estado de loading de la grilla
         *
        $scope.loading = true;
        /**
         * Determina si se va mostrar no no el footer de la lista.
         *
        $scope.footer = true;

        /**
         * Inicializacion de objeto
         *
        $scope.filterBy = {};

        /**
         * @field
         * Parametros de configuración de la grilla
         *
        $scope.init = {
            'count': 20,
            'page': 1,
            'sortBy': "id",
            'sortOrder': 'DESC',
            'filterBase': 1
        };

        /**
         * Se encarga de limpiar los criterios del filtrado.
         * @function
         *
        $scope.limpiar = function () {
            $scope.filterBy = {};
        }

        /**
         * Array que contiene los datos de configuración de la grilla
         * @type Array
         * @field
         *
        $scope.config = {
            "rows": [],
            "pagination": {
                "count": $scope.init.count,
                "page": $scope.init.page,
                "pages": 0,
                "size": 0
            },
            "ssortBy": $scope.init.sortBy,
            "sortOrder": $scope.init.sortOrder
        };

        /**
         * Elimina los elementos del objeto que son nulos
         * @function
         *
        $scope.deleteUndefinedValues = function (object) {
            for (var key in object) {
                if (!object[key]) {
                    delete object[key];
                }
            }
        };

        /*
         * Se encarga de eliminar el recurso
         * @function
         *
        $scope.eliminar = function (recurso) {
            if (window.confirm("¿Está seguro de eliminar el recurso?"))
                this.service.eliminar(this.getPrimaryKey(recurso))
                .then(eliminarRecursoSuccess, eliminarRecursoError);
        };

        function eliminarRecursoSuccess(response) {
            Message.ok("El registro se ha eliminado exitosamente.");
            $location.url($scope.path);
        }

        function eliminarRecursoError(data) {
            Message.error("No se pudo realizar la operación");
        };

        /**
         * Retorna el primary key del recurso
         * Por defecto el atributo id
         * Puede ser sobreescrito en el controlador del recurso 
         * @function
         *
        $scope.getPrimaryKey = function (recurso) {
            return recurso.id;
        };

        /**
         * Se encarga de recuperar la lista paginada de los datos.
         * @function
         *
        $scope.getResource = function (params, paramsObj) {
            paramsObj.sortOrder = paramsObj.sortOrder == 'dsc' ? "DESC" : "ASC";
            $scope.loading = true;
            $scope.config.pagination.page = paramsObj.page;
            $scope.config.pagination.count = paramsObj.count;
            if (paramsObj.filters) {
                $scope.deleteUndefinedValues(paramsObj.filters);
            }
            return this.service.listar(paramsObj)
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


        /**
         * Constructor / Entrypoint
         * @constructor
         *

    }
]);*/