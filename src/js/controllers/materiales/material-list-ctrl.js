
app.controller('MaterialListCtrl', ['$scope', 'MaterialService', '$controller', '$location','$routeParams',
function ($scope, service, $controller, $location, $routeParams) {

    /**
     * Service utilizdo para recuperar los datos y realizar las operaciones.
     * @field
     * @type {Object}
     */
    
    $scope.service = service;
    $scope.path = $location.$$path;
    $scope.asignaturaId = $routeParams.idAsig;

    /**
     * Configuraciones de la cabecera de la grilla.
     * @private
     * @type {Array}
     */
    var header = [{
        "key": "estilo",
        "name": "Estilos"
    }, {
        "key": "nivel",
        "name": "Niveles"
    },
    {
        "key": "tipo",
        "name": "Tipos"
    },{
        "key": "concepto",
        "name": "Conceptos"
    },
     {
        "key": "acciones",
        "name": "Acciones"
    }
    ];

    $scope.init = {
        'count': 5,
        'page': 1,
        'sortBy': 'id',
        'sortOrder': 'DESC',
        'filterBase': 1
    };

    $scope.config = {
        "rows": [],
        "pagination": {
            "count": $scope.init.count,
            "page": $scope.init.page,
            "pages": 0,
            "size": 0
        },
        "sortBy": $scope.init.sortBy,
        "sortOrder": $scope.init.sortOrder
    };

     /**
     * Elimina los elementos del objeto que son nulos
     * @function
     */
    $scope.deleteUndefinedValues = function (object) {
        for (var key in object) {
            if (!object[key]) {
                delete object[key];
            }
        }
    };

    $scope.getResource = function (params, paramsObj) {
        paramsObj.sortOrder = paramsObj.sortOrder == 'dsc' ? "DESC" : "ASC";
        $scope.loading = true;
        $scope.config.pagination.page = paramsObj.page;
        $scope.config.pagination.count = paramsObj.count;
        if (paramsObj.filters) {
            $scope.deleteUndefinedValues(paramsObj.filters);
        }
        console.log("que le envia: ");
        console.log(paramsObj);
        return this.service.listar(paramsObj)
            .then(function (response) {
                console.log("que recibe: ");
                console.log(response.data);
                $scope.loading = false;
                $scope.config.rows = response.data.rows;
                $scope.config.pagination.size = response.data.count;
                $scope.config.pagination.pages = Math.ceil(response.data.count / $scope.config.pagination.count);
                $scope.config.pagination.count = paramsObj.cantidad;
                return $scope.config;
            }, function (response) {
                $scope.loading = null;
                $scope.config.rows = [];
                $scope.config.pagination.size = 0;
                $scope.config.pagination.pages = 0;
                return $scope.config;
            });
    };







    /*
        * Se encarga de eliminar el recurso
         * @function
         */
    $scope.eliminarNuevo = function (recurso) {
        
        if (window.confirm("¿Está seguro de eliminar el material?"))
            this.service.eliminar(this.getPrimaryKey(recurso))
            .then(eliminarRecursoSuccessNuevo, eliminarRecursoErrorNuevo);
    };

    function eliminarRecursoSuccessNuevo(response) {
        $location.url($scope.path);
        Message.ok("El alumno se ha eliminado exitosamente.");

    }

    function eliminarRecursoErrorNuevo(data) {
        Message.error("No se pudo realizar la operación");
    };

    /**
     * Retorna el primary key del recurso
     * Por defecto el atributo id
     * Puede ser sobreescrito en el controlador del recurso 
     * @function
     */
    $scope.getPrimaryKey = function (recurso) {
        return recurso.id;
    };


    /**
     * Constructor / Entrypoint
     * @constructor
     */
    (function initialize() {
      
        // se hereda del controller base
       /* angular.extend(this, $controller('BaseListCtrl', {
            "$scope": $scope
        }));*/
        $scope.config = {
            "rows": [],
            "pagination": {
                "count": 5,
                "page": $scope.init.page,
                "pages": 0,
                "size": 0
            },
            "sortBy": $scope.init.sortBy,
            "sortOrder": $scope.init.sortOrder,
            "inicio": 1,
            "cantidad": 5,
            "count": 5
        };


        $scope.filtro = {
            inicio: 1,

        };
        $scope.filterBy = {};
        console.log("consola sortOrder_ " + $scope.config.sortOrder);
        $scope.config.header = header;
        $scope.config.recurso = 'material';
        $scope.config.count = 5;
        $scope.getResource($scope.config, $scope.config);            

    })();




}]);


