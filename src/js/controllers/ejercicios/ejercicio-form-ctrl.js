/**
 * @class
 * Controller que implementa el formulario administración de Temas
 *</a>
 */
app.controller('EjercicioFormCtrl', ['$scope', '$routeParams', 'EjercicioService', 'TemaService', '$controller',
    function ($scope, $routeParams, service, serviceTema, $controller) {


        $scope.respuesta = {
            "respuesta1": "",
            "respuesta2": "",
            "respuesta3": "",
            "respuesta4": "",
            "respuestaCorrecta": ""
        };




        // servicio ejercicio
        $scope.service = service;
        // servicio tema
        $scope.serviceTema = serviceTema;
        /**imprime el idAsig**/
        console.log($routeParams);
        // le paso el id la asignatura para volver atras.
        $scope.atras = $routeParams.idAsig;
        // esto lo usa en base controller de view, el id es el recurso que consulta. 
        $routeParams.id = $routeParams.idEjercicio;
        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/asignatura/" + $scope.atras + "/ejercicio/";

        /**
         * Inicializacion de objeto
         */
        $scope.filterBy = {};
        // Se le pasa el id de asignatura para listar sus temas. 
        $scope.filterBy.asignatura = parseInt($scope.atras);





        //************************************Se utiliza para lista de conceptos**************************************
        $scope.listaFinal = [];
        $scope.recursoConceptos = [];
        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición. 
         * Trae los concepto asociados al ejercicio en si
         */
        $scope.getConceptosAsociados = function (parametros) {
            $scope.serviceTema.listar(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.recursoConceptos = response.data.rows;

                    // rellena la lista final
                    $scope.listaSelect($scope.recursoConceptos);
                    console.log("lista final de finales!!!!");
                    console.log($scope.listaFinal);

                    //se llena el select de conceptos. 
                    $("#selectConcepto").select2({
                        data: $scope.listaFinal
                        

                    });


                    return $scope.recursoConceptos;

                }, function (data, code) {
                    $scope.recursoConceptos = [];
                    Message.error("No se pudo realizar la operación de obtener el tema con los conceptos");
                    $scope.recursoConceptos;
                });
        };


        /**
         * funcion parseadora de la lista que llena el select2 de 
         * conceptos a seleccionar. 
         **/
        $scope.listaSelect = function (lista) {
            // for sobre tema
            angular.forEach(lista, function (value, key) {
                //copiamos el id y el nombre
                $scope.estructura = {};
                $scope.estructura.id = value.id.toString();
                $scope.estructura.text = value.nombre;
                $scope.estructura.children = [];
                console.log("primerfor");
                //for sobre la lista de conceptos
                angular.forEach(value.listaConceptos, function (valor, llave) {
                    console.log("hijo");
                    $scope.hijo = {};
                    $scope.hijo.id = valor.id.toString();
                    $scope.hijo.text = valor.nombre;
                   
                    console.log($scope.hijo);
                    $scope.estructura.children.push($scope.hijo);

                });
                $scope.listaFinal.push($scope.estructura);

            });

        };


        //******************************FIN DE LISTA DE CONCEPTOS *******************************************

        /************************************Inicio de guardar ********************
         * Funca. 10/04/2018
         * Practicamente seria el boton del formulario guardar
         * Guarda la lista de conceptos selecionados en la vista y 
         * llama al final a guardar.
         **/
        $scope.guardarAsociados = function () {
            $scope.recurso.nivelDificultad = 0.0;
            $scope.recurso.adivinanza = 0.0;
            $scope.recurso.listaConceptos = [];
            console.log("guardados asociados");
            // guardar solo los codigos de los conceptos asociados.
            angular.forEach($scope.recurso.conceptosAsociados, function (valor, llave) {
                console.log(valor);
                $scope.conceptoA = {};
                $scope.conceptoA.id = parseInt(valor);
                // guardar como un concepto su id
                $scope.recurso.listaConceptos.push($scope.conceptoA);
            });
            //y llama a la funcion guardar.

            // si es crear si le asigna los numeros 1,2,3,4
            if (this.isCrear()) {
                $scope.recurso.listaRespuesta[0].id = 1;
                $scope.recurso.listaRespuesta[1].id = 2;
                $scope.recurso.listaRespuesta[2].id = 3;
                $scope.recurso.listaRespuesta[3].id = 4;

                //Nivel de Dificultad
                $scope.recurso.nivelDificultad = parseFloat($scope.recurso.dificultad);
                //Nivel de Adivinanza
                $scope.recurso.adivinanza = parseFloat($scope.recurso.nivelAdivinanza);

            } else {
                // nivel de dificultad
                $scope.recurso.nivelDificultad = parseFloat($scope.recurso.dificultad);
                //Nivel de Adivinanza
                $scope.recurso.adivinanza = parseFloat($scope.recurso.nivelAdivinanza);

            }



            $scope.guardar();
        };

        /**
         * Elimina los elementos del objeto que son nulos. Utiliza guardar ejercicio
         * @function 
         */
        $scope.deleteUndefinedValues = function (object) {
            for (var key in object) {
                if (!object[key]) {
                    delete object[key];
                }
            }
        };



        console.log("Niveles actual de dificultad");




        //***********************************FIN DE GUARDAR ****************************************

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseFormCtrl', {
                "$scope": $scope
            }));

            $scope.serviceTema = serviceTema;

            //Datos para la lista
            $scope.inicial = {
                'count': 100,
                'page': 1,
                'sortBy': "id",
                'sortOrder': 'DESC',
                'filters': $scope.filterBy

            };

            $scope.datos = $scope.getConceptosAsociados($scope.inicial);
            console.log("datos");
            console.log($scope.datos);


            //Estructura de la lista de respuestas
            $scope.recurso.listaRespuesta = [];
            var datos = {
                "id": null,
                "descripcion": ""
            };
            var datos1 = {
                "id": null,
                "descripcion": ""
            };
            var datos2 = {
                "id": null,
                "descripcion": ""
            };
            var datos3 = {
                "id": null,
                "descripcion": ""
            };
            $scope.recurso.listaRespuesta.push(datos);
            $scope.recurso.listaRespuesta.push(datos1);
            $scope.recurso.listaRespuesta.push(datos2);
            $scope.recurso.listaRespuesta.push(datos3);


            // valores de nivel de dificultad
            $scope.nivelesDificultad = [
                {
                    valor: "1.0",
                    nivel: "Fácil"
                },
                {
                    valor: "2.0",
                    nivel: "Normal"
                },
                {
                    valor: "3.0",
                    nivel: "Dificil"
                }
             ];

            //valores de nivel de adivinanza
            $scope.nivelesAdivinanza = [
                {
                    valor: "0.1",
                    nivel: "Bajo"
                }, {
                    valor: "0.2",
                    nivel: "Medio"
                }, {
                    valor: "0.3",
                    nivel: "Alto"
                }
            ];
            
            //valores de nivel de respuesta
            $scope.nivelesRespuesta = [
                {
                    valor: "1",
                    nivel: "Respuesta 1"
                }, {
                    valor: "2",
                    nivel: "Respuesta 2"
                }, {
                    valor: "3",
                    nivel: "Respuesta 3"
                }, {
                    valor: "4",
                    nivel: "Respuesta 4"
                }
            ];
            
            


        })();

    }
]);
