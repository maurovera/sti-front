/**
 * @class
 * Controller que implementa la busqueda y listado de conceptos.
 *
 * @name angular-keycloak-seed.controller##EmpresaListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.controller('ConceptoListCtrl', ['$scope', 'ConceptoService', '$controller',
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
            "name": "Descripcion"
        }, {
            "key": "apriori",
            "name": "Ariori"
        }, {
            "key": "peso",
            "name": "Peso"
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
        // se hereda del controller base
        angular.extend(this, $controller('BaseListCtrl', {
            "$scope": $scope
        }));
        
        $scope.config.header = header;
        $scope.config.recurso = 'concepto';
    })();
}]);
