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
        $scope.servidor1 = true;
        $scope.valorRetorno = 3;
        $scope.servidorValor = function (){
            return $scope.valorRetorno;
        };
        $scope.valor = "control1115";
        /**Control111 es para pdf
         * control112 es par video
         * control113 es par audio
         * control114 es para imagen
         */
        //funciona para youtube y para todo.
        // funcion principal
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.youtubeLink = "https://youtu.be/xE2VLXwZiw8";
        $scope.videoUrlYoutube = function () {
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

        //funcion para imagen url
        //$scope.imagenUrl = "https://image.slidesharecdn.com/definiciondeconceptosweb-120320141148-phpapp02/95/definicion-de-conceptosweb-5-728.jpg?cb=1332252934";
        //gif $scope.imagenUrl = "https://66.media.tumblr.com/9e8d99bbcfa15dcf8013d34d35ac4468/tumblr_onbnb2iMBO1vavl9go1_r1_1280.gif";
        //gifd $scope.imagenUrl = "https://media.giphy.com/media/IemGmMYQaDiIE/giphy.gif";
        $scope.imagenUrl = "https://es.wikipedia.org/wiki/Intranet";
        $scope.urlMate = {
            src: $scope.imagenUrl,
            title: "imagen url"
        };

        //funcion para imagen servidor
        $scope.fileName = "/home/mauro/Escritorio/tesis/intranet/imagenes/intranet02.png";
        $scope.imagenServidor = {
            src: $scope.fileName,
            title: "imagen servidor"
        };


        //funciona para youtube fin
        $scope.materialPdfServidor = {
            "id": 1,
            "concepto": "intranet",
            "urlMaterial": "../materiales",
            "nivel":"bajo",
            "estilo":"lector",
            "asignatura":1,
            "fuente":"servidor",//servidor o url
            "tipo":"pdf",
            "nombreEnlace":"Enlace_presupuesto_tazas.pdf",
            "posicionReal":""

        };

        $scope.pdfServidor = "../materiales/intranet/pdf/Enlace_presupuesto_tazas.pdf";
        $scope.funcionPdfServidor = function () {

            var todoRet = "../materiales/"+
            $scope.materialPdfServidor.concepto+"/"+
            $scope.materialPdfServidor.nivel+"/"+
            $scope.materialPdfServidor.tipo+"/"+
            $scope.materialPdfServidor.nombreEnlace;
            
            console.log("retorno :" + todoRet)
            return todoRet;
        };

        $scope.pdfServidorLector = {
            src: $scope.funcionPdfServidor(),
            titulo: "Lector pdf servidor"
        };
        //fin pdf servidor

        //inicio video servidor
        $scope.materialVideoServidor = {
            "id": 1,
            "concepto": "intranet",
            "urlMaterial": "../materiales/",
            "nivel":"bajo",
            "estilo":"visual",
            "asignatura":1,
            "fuente":"servidor",//servidor o url
            "tipo":"video",
            "nombreEnlace":"Enlace_Que_es_Intranet.mp4"

        };

        $scope.videoServidor = ".. /materiales/intranet/video/Enlace_Que_es_Intranet.mp4";
        $scope.funcionVideoServidor = function () {

            var todoRet = $scope.materialPdfServidor.urlMaterial+"/"+
            $scope.materialVideoServidor.concepto+"/"+
            $scope.materialVideoServidor.nivel+"/"+
            $scope.materialVideoServidor.tipo+"/"+
            $scope.materialVideoServidor.nombreEnlace;
            
            console.log("retorno video servidor:" + todoRet)
            return todoRet;
        };

        $scope.videoServidorVisual = {
            src: $scope.funcionVideoServidor(),
            titulo: "visual video servidor"
        };
        //fin servidor video
        
        //audio servidor inicio
        $scope.materialAudioServidor = {
            "id": 1,
            "concepto": "intranet",
            "urlMaterial": "../materiales",
            "nivel":"bajo",
            "estilo":"auditivo",
            "asignatura":1,
            "fuente":"servidor",//servidor o url
            "tipo":"audio",
            "nombreEnlace":"Enlace_que_es_la_INTRANET.mp3"

        };

        $scope.audioServidor = "../materiales/intranet/audio/Enlace_que_es_la_INTRANET.mp3";
        $scope.funcionAudioServidor = function () {

            var todoRet = $scope.materialAudioServidor.urlMaterial+"/"+
            $scope.materialAudioServidor.concepto+"/"+
            $scope.materialAudioServidor.nivel+"/"+
            $scope.materialAudioServidor.tipo+"/"+
            $scope.materialAudioServidor.nombreEnlace;
            
            console.log("retorno audio servidor:" + todoRet)
            return todoRet;
        };

        $scope.audioServidorAuditivo = {
            src: $scope.funcionAudioServidor(),
            titulo: "auditivo audio servidor"
        };
        // fin audio servidor

        //inicio imagen servidor
        $scope.materialImagenServidor = {
            "id": 1,
            "concepto": "intranet",
            "urlMaterial": "../materiales",
            "nivel":"bajo",
            "estilo":"visual",
            "asignatura":1,
            "fuente":"servidor",//servidor o url
            "tipo":"imagen",
            "nombreEnlace":"Enlace_intranet.jpg"

        };

        $scope.imagenServidor = "../materiales/intranet/imagenes/Enlace_intranet.jpg";
        $scope.funcionImagenServidor = function () {

            var todoRet = $scope.materialImagenServidor.urlMaterial+"/"+
            $scope.materialImagenServidor.concepto+"/"+
            $scope.materialImagenServidor.nivel+"/"+
            $scope.materialImagenServidor.tipo+"/"+
            $scope.materialImagenServidor.nombreEnlace;
            
            console.log("retorno imagen servidor:" + todoRet)
            return todoRet;
        };

        $scope.imagenServidorVisual = {
            src: $scope.funcionImagenServidor(),
            titulo: "visual imagen servidor"
        };


        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {



        })();
    }
]);



