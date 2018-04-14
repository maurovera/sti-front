/**
 * @class
 * Controller que implementa el formulario administración de Temas
 *</a>
 */
app.controller('EjercicioFormCtrl', ['$scope', '$routeParams', 'EjercicioService', 'TemaService', '$controller',
    function ($scope, $routeParams, service, serviceTema, $controller) {


        /**Lista de conceptos auxiliares**/
        $scope.listaCon = [];
        /**Inicializacion de array**/


        /**
         * Agrega conceptos a la lista auxiliar
         **/
        $scope.addConcepto = function (concepto) {
            console.log("entre para agregar");
            $scope.listaCon.push(concepto);
            $scope.recurso.listaConceptos.push(concepto);

            console.log("recurso lista");
            console.log($scope.recurso);
        };

        /**
         * Quita conceptos. 
         **/
        $scope.delConcepto = function (concepto) {
            $scope.index = $scope.listaCon.indexOf(concepto);
            if ($scope.index > -1) {
                $scope.listaCon.splice($scope.index, 1);
                $scope.recurso.listaConceptos.splice($scope.index, 1);


            }
            //$scope.listaCon.pop(concepto);
        };



        /**
         * Verifica que este en la lista de conceptos nuevos.
         **/
        $scope.isLista = function (concepto) {
            $scope.sol = $scope.listaCon.lastIndexOf(concepto) === -1;
            if ($scope.sol === true) {
                $scope.listaCon.forEach(function (value, key) {
                    //console.log(key + " : "+ value.id + ": " + value.nombre );
                    if (value.id === concepto.id && $scope.sol === true) {
                        $scope.sol = false;
                    }

                });
            } else {

            }
            return $scope.sol;
        };




        console.log($scope.recursoMauro + "recurso");



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
         *Datos para la lista**/
        var header = [{
                "key": "nombre",
                "name": "Temas"
        }
        ];


        /**
         *Datos para la lista**/
        $scope.init = {
            'count': 20,
            'page': 1,
            'sortBy': "id",
            'sortOrder': 'DESC',
            'filterBase': 1
        };


        /**
         * Inicializacion de objeto
         */
        $scope.filterBy = {};
        // Se le pasa el id de asignatura para listar sus temas. 
        $scope.filterBy.asignatura = parseInt($scope.atras);



        /**
         * Array que contiene los datos de configuración de la grilla
         * @type Array
         * @field
         */
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
         */
        $scope.deleteUndefinedValues = function (object) {
            for (var key in object) {
                if (!object[key]) {
                    delete object[key];
                }
            }
        };

        /**
         * Inicializacion de objeto
         */
        $scope.filterBy = {};
        // Se le pasa el id de asignatura para listar sus temas. 
        $scope.filterBy.asignatura = parseInt($scope.atras);
        /**
         * Lista los temas pasandole como filtro el id de asignatura.
         * Se usa el listar normal de tema.
         **/
        $scope.getResourceTema = function (params, paramsObj) {
            paramsObj.sortOrder = paramsObj.sortOrder == 'dsc' ? "DESC" : "ASC";
            $scope.loading = true;
            $scope.config.pagination.page = paramsObj.page;
            $scope.config.pagination.count = paramsObj.count;
            if (paramsObj.filters) {
                $scope.deleteUndefinedValues(paramsObj.filters);
            }
            return $scope.serviceTema.listar(paramsObj)
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


        // select2
        $scope.results = [{
                "id": 1,
                "nombre": "Group 1",
                "children": [
                    {
                        "id": 20,
                        "nombre": "Option 1.1"
                    },
                    {
                        "id": 5,
                        "nombre": "Option 1.2"
                                }
                              ]
                            },
            {
                "id": 2,
                "text": "Group 2",
                "children": [
                    {
                        "id": 100,
                        "nombre": "Option 2.1"
                                },
                    {
                        "id": 15,
                        "nombre": "Option 2.2"
                                }
                              ]
                            }
                          ];



        $scope.listaPrueba = [{
            "fechaCreacion": 1523143869733,
            "fechaModificacion": null,
            "usuarioCreacion": 1,
            "usuarioModificacion": null,
            "ipCreacion": "127.0.0.1",
            "ipModificacion": null,
            "id": 4,
            "nombre": "tema1asig2",
            "text": "tema1asig2",
            "descripcion": "tema1asig2",
            "peso": 1,
            "asignatura": null,
            "listaConceptos": [{
                "fechaCreacion": 1523143892587,
                "fechaModificacion": null,
                "usuarioCreacion": 1,
                "usuarioModificacion": null,
                "ipCreacion": "127.0.0.1",
                "ipModificacion": null,
                "id": 5,
                "nombre": "concepto1Asig2",
                "text": "concepto1Asig2",
                "apriori": 22,
                "peso": 2,
                "tema": null,
                "listaEjercicio": []
            }],
            "datoCalculado": 2
        }];

        $scope.listaFinal = [];


        /**
         * funcion parseadora de la lista que llena el select2 de 
         * conceptos a seleccionar.
         **/
        $scope.listaSelect = function (lista) {
            // for sobre tema
            angular.forEach(lista, function (value, key) {
                //copiamos el id y el nombre
                $scope.estructura = {};
                $scope.estructura.id = value.id;
                $scope.estructura.text = value.nombre;
                $scope.estructura.children = [];
                console.log("primerfor");
                //$scope.listaFinal.push($scope.estructura);
                //$scope.listaFinal.id = value.id;
                //$scope.listaFinal.text = value.nombre;
                //for sobre la lista de conceptos
                angular.forEach(value.listaConceptos, function (valor, llave) {
                    console.log("hijo");
                    // esta la sub lista. Que tiene que ser nombrado children
                    //  $scope.listaFinal.children = [];
                    // este es el dato que vamos a introducir dentro de children. Que seria un concepto asociado
                    // al tema.
                    $scope.hijo = {};
                    $scope.hijo.id = valor.id;
                    $scope.hijo.text = valor.nombre;
                    console.log($scope.hijo);
                    $scope.estructura.children.push($scope.hijo);
                    //$scope.listaFinal.push($scope.estructura);




                });
                $scope.listaFinal.push($scope.estructura);

            });

        };





        $scope.recursoMauro = [];
        // $scope.recurso.datopro = ["2"];

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         */
        $scope.getConceptosAsociados = function (parametros) {
            $scope.serviceTema.listar(parametros)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.recursoMauro = response.data.rows;

                    // rellena la lista final
                    $scope.listaSelect($scope.recursoMauro);
                    //$scope.listaSelect($scope.listaPrueba2);
                    console.log("lista final de finales!!!!");
                    console.log($scope.listaFinal);
                   // $scope.mauroqq = $scope.recurso.conceptosAsociados;
                //    console.log("mauro");
                  //  console.log($scope.mauroqq);

                    //se llena el select de conceptos. 
                    $("#selectConcepto").select2({
                        data: $scope.listaFinal
                        
                    });


                    return $scope.RecursoMauro;

                }, function (data, code) {
                    $scope.recursoMauro = [];
                    Message.error("No se pudo realizar la operación de obtener el tema");
                    $scope.recursoMauro;
                });
        };

        //$scope.mauroqq = [];
        /**Veremos si funca
         * Funca. 10/04/2018
         **/
        $scope.guardarAsociados = function () {
            $scope.recurso.listaConceptos = [];
            console.log("guardados asociados");
            // guardar solo los codigos.
            angular.forEach($scope.recurso.conceptosAsociados, function (valor, llave) {
                console.log(valor);
                $scope.conceptoA = {};
                $scope.conceptoA.id = parseInt(valor);
                // guardar como un concepto su id
                $scope.recurso.listaConceptos.push($scope.conceptoA);
            });
            //y llama a la funcion guardar.
            $scope.guardar();
        };







        $scope.datopro = [];
        $scope.ma = "maurojkasndlfksdjndlf";

        $scope.listaPrueba2 = [{
            "id": 1,
            "nombre": "tema 1",
            "descripcion": "tema 1",
            "peso": 1,
            "asignatura": null,
            "listaConceptos": [{
                "id": 1,
                "nombre": "concepto 1 te1",
                "apriori": 1,
                "peso": 2,
                "tema": null,
                }, {
                "id": 4,
                "nombre": "concepto2 te1",
                "apriori": 6,
                "peso": 6,
                "tema": null

                }],
            "datoCalculado": 2
            }, {
            "id": 2,
            "nombre": "tema 2",
            "descripcion": "tema 2",
            "peso": 2,
            "asignatura": null,
            "listaConceptos": [{
                "id": 2,
                "nombre": "concepto 1 te2",
                "apriori": 3,
                "peso": 3,
                "tema": null
                }],
            "datoCalculado": 4
            }, {
            "id": 3,
            "nombre": "tema 3",
            "descripcion": "tema 3",
            "peso": 3,
            "asignatura": null,
            "listaConceptos": [{
                "id": 3,
                "nombre": "concepto 1 te3",
                "apriori": 4,
                "peso": 4,
                "tema": null
                }],
            "datoCalculado": 6
            }];







        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseFormCtrl', {
                "$scope": $scope
            }));

            // componentes del listado.
            $scope.config.header = header;
            $scope.config.recurso = 'tema';
            //$scope.recurso.listaConceptos = [];


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
         

        })();

    }
]);
