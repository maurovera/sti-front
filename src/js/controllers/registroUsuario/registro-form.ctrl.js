/**
 * @class
 * Controller que implementa el formulario administración de Alumnos
 *</a>
 */
app.controller('RegistroFormCtrl', ['$scope', 'SessionService', '$controller','registerUsers',
function ($scope, service, $controller, registerUsers) {


    $scope.hola = "hola controller";

    $scope.registerUser = function(){
        registerUsers.nuevoRegister($scope.user);
    }
    /**
     * Service utilizado para recuperar los datos y realizar las operaciones.
     * @field
     * @type {Object}
     */
    $scope.service = service;

    /**
     * Url del recurso
     * @field
     * @type {Object}
     */
    $scope.uri = "";

    /**
     * Constructor / Entrypoint
     * @constructor
     */
    (function initialize() {
        // se hereda del controller base
        angular.extend(this, $controller('BaseFormCtrl', {
            "$scope": $scope
        }));
    })();
    
    console.log($scope.recurso);
    
    
    
}
]);
