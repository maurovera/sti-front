/**
 * @class
 * Controller que implementa la lógica del header del portal y maneja la interacción 
 * con la sesión del keycloak
 * 
 * @name angular-keycloak-seed.controller#HeaderCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.controller('HeaderCtrl', ['$scope', '$timeout', 'SessionService', '$location',
    function ($scope, $timeout, service, $location) {

        /**
         * Si existe el user logeedIn true
         * de lo contrario false
         */
        $scope.loggedIn = false;

        /**
        * Service utilizdo para recuperar los datos y realizar las operaciones.
        * @field
        * @type {Object}
        */
        $scope.service = service;


        /**
         * Credenciales de formulario login
         */
        $scope.credenciales = {
            "username": "",
            "password": ""
        };

        /**
         * Contiene la información del usuario logeado en el sistema
         */
        $scope.user = null;

        

        //////SECCION DE STORAGE 
        /** 
                 * Guarda el usuario logueado en el local storage 
        */
        $scope.guardarLocalStorage = function (user) {

            if (window.localStorage) {

                // transformo a string para guardar
                var userAGuardar = JSON.stringify(user);
                localStorage.setItem("user", userAGuardar);
                //RECUPERO LA INFORMACIÓN
                var userGuardado = localStorage.getItem("user");
                var userGuardado = JSON.parse(userGuardado);
                console.log("user id del usuario: " + userGuardado.userId);
                console.log("nombre del usuario: " + userGuardado.usuario);
            }
            else {
                throw new Error('Tu Navegador no soporta LocalStorage!');
            }

        };

        /**
         * Borra el local storage cuando se deslogea
         */
        $scope.borrarLocalStorage = function () {

            if (window.localStorage) {
                var user = localStorage.getItem("user");
                var userGuardado = JSON.parse(user);
                console.log("nombre del localStorage borrada : " + userGuardado.usuario);
                localStorage.removeItem("user");
            }
            else {
                throw new Error('Tu Navegador no soporta LocalStorage!');
            }

        };

        /**Comprobar si existe un user en localStorage */
        $scope.isLocalStorage = function () {

            // como comprobar si esta logueado
            var user = localStorage.getItem("user");
            if (user != null) {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
            return $scope.loggedIn;
        };


        $scope.cantidadLocal = function(){

            console.log(localStorage.length);    
        };
        /// FIN DE LOCAL STORAGE


    
                
        /**
         * Se encarga de verificar si el usuario esta logeado.
         * @returns {boolean} true si esta logeado, false en caso contrario.
         */
        $scope.isLoggedIn = function () {
            
                        return $scope.isLocalStorage();
                    };
            
    
        /**
         * Se encarga de cerrar la sesión del usuario.
         */
        $scope.logout = function () {
            console.log("entre a logout");
            $scope.logoutUser();
            $scope.user = null;
            $scope.loggedIn = false;
            

        };  

    
        /**
         * Se encarga de invocar al login del keycloak
         */
        $scope.login = function () {
            //keycloakLauncher.keycloak.login();
            console.log("funcion login, credenciales");
            console.log($scope.credenciales);
            // llamamos a la funcion logear
            $scope.loginUser($scope.credenciales);
            // marcamos como usuario logeado
            //$scope.loggedIn = true;

            //console.log("usuario logeado: " + $scope.loggedIn);
            // se va dashboard
            
        };


        /**
         * funcion que se encarga de logearse
         */
        $scope.loginUser = function (params) {
            console.log("entre en loginUser");
            $scope.service.login(params)
                .then(function (response) {
                    $scope.respuesta = response.data;
                    /**
                     * Trae si es exitoso o no
                     ***/
                    console.log("exitoso: " + $scope.respuesta.exitoso);
                    console.log("mensaje: " + $scope.respuesta.mensaje);
                    console.log("userId: " + $scope.respuesta.userId);
                    console.log("usuario: " + $scope.respuesta.usuario);
                    /**
                     * Si la respuesta es exitosa. Se guarda el localStorage
                     */
                    if ($scope.respuesta.exitoso) {
                        $scope.guardarLocalStorage($scope.respuesta);
                        $scope.loggedIn = true;
                        console.log("ahora en login llamo  initSession");
                        console.log("ahora en login llamo a recargar pagina");
                        $scope.reload();
                    }

                }, function (data, code) {
                    
                        Message.error("no se pudo obtener el usuario");
                    
                    
                });
        };



        /**Recargar la pagina porque no se como
         * cargar todo de nuevo cuando se loguea un usuario
         */
        $scope.reload = function()
        {
           location.reload(); 
        }

        /**
         * funcion que se encarga del logout
         */

        $scope.logoutUser = function () {
            console.log("entre en logoutUser");
            $scope.service.logout()
                .then(function (response) {
                    $scope.respuesta = response.data;
                    /**
                     * Trae si es exitoso o no
                     ***/
                    console.log("exitoso: " + $scope.respuesta.exitoso + ", " + $scope.respuesta.mensaje);
                    /**
                     * Si la respuesta es exitosa. Se guarda el localStorage
                     */
                    if ($scope.respuesta.exitoso) {
                        $scope.borrarLocalStorage();
                        $location.url("/");
                    }
                }, function (data, code) {
                    Message.error("no se pudo realizar la peticion de logout");
                });
        };


        /**
         * Se recupera los datos del usuario logeado y se injecta en la variable user. 
         */
        function initSession() {
            //false o //true
            if (!$scope.isLoggedIn()) {

                console.log("retorna si loggedIn es false: " + $scope.loggedIn);
                return;
            }
            // si ya esta logeado entonces si llama a userinfo
            console.log("llama a getUserInfo si loggedIn es true" + $scope.loggedIn);
            $scope.getUserInfo();
            
        };

        /**
        * Se recupera los datos del usuario logeado y se injecta en la variable user. 
        */
        $scope.getUserInfo = function () {
            console.log("entre en USERINFO");
            $scope.service.userInfo()
                .then(function (response) {
                    $scope.user = response.data;
                    /**
                     * Trae si es exitoso o no
                     ***/
                    console.log("user: " + $scope.user.nombre);
                    $scope.loggedIn = true;
                    //$scope.$apply();
                    //$location.path("/dashboard");
                    
                }, function (data, code) {
                    $scope.user = null;
                    $scope.loggedIn = false;
                    //Message.error("no se pudo obtener el usuarioLogeado");
                });
        };


        $scope.mostrar = function () {
            var resultado = false;
            if($scope.user!=null && $scope.user.idProfesor != null){
                resultado = true;
            }
                

            return resultado;    
        };

        $scope.mostrarEstilo = function () {
            var resultado = false;
            if($scope.user!=null && $scope.user.idAlumno != null){
                resultado = true;
            }
                

            return resultado;    
        };


        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            initSession();
            $scope.$watch('user', function () {
                if (!$scope.isLoggedIn()) {
                    initSession();
                }
            });
        })();
    }
]);
