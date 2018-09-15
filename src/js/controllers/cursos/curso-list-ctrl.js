
app.controller('CursoListCtrl', ['$scope', 'CursoService', '$controller',
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
            "key": "nombre",
            "name": "Nombre"
        }, {
            "key": "descripcion",
            "name": "Descripción"
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
        
       
        angular.extend(this, $controller('BaseListCtrl', {
            "$scope": $scope
        }));
        
        $scope.config.header = header;
        $scope.config.recurso = 'curso';
        
       
    })();
}]);


