app.controller('MaterialesViewCtrl', ['$scope', '$controller', '$sce',
    function ($scope, $controller, $sce) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        //Trae el id de alumno y id tarea
        var userGuardado = localStorage.getItem("user");
        var userGuardado = JSON.parse(userGuardado);
        console.log("user id del usuario: " + userGuardado.userId);
        console.log("nombre del usuario: " + userGuardado.usuario);
        $scope.idAlu = userGuardado.idAlumno;




        //funciona control2 y control 3
        $scope.valor = "control3";

        //funciona para youtube y para todo.
        // funcion principal
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.youtubeLink = "https://youtu.be/xE2VLXwZiw8";
        $scope.videoUrlYoutube = function(){
            var embedUrl = "https://www.youtube.com/embed/";
            var youTubeLinkParts = $scope.youtubeLink.split("/");
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            console.log(embedUrl);
            return embedUrl;
    
        }


        $scope.movie = {
            src: $scope.videoUrlYoutube(),
            title: "Carajo web"
        };

        $scope.pdfContent = "http://www3.uah.es/pramos/Blog/Profesor-Primero-A-1-8-print.pdf";

        $scope.lectorUrl = function () {

            var parteIncial = "http://docs.google.com/gview?url=";
            var parteFinal = "&embedded=true";
            var retorno = parteIncial + $scope.pdfContent + parteFinal;
            console.log("retorno :" + retorno)
            return retorno;
        };

        $scope.lecto = {
            src: $scope.lectorUrl(),
            title: "Lector pdf"
        };


        //funciona para youtube fin


       



        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {



        })();
    }
]);



