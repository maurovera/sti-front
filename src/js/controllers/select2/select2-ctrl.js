app.controller('select2Ctrl', ['$scope', 'AlumnoService', '$controller',
    function ($scope, service, $controller) {





        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */

        $(document).ready(function () {
            $('.js-example-basic-multiple').select2();
        });


        $(document).ready(function () {
            $("#basic").select2();


        });


        var results = [{
                "idt": 1,
                "text": "Group 1",
                "children": [
                    {
                        "id": 20,
                        "text": "Option 1.1"
                    },
                    {
                        "id": 5,
                        "text": "Option 1.2"
                                }
                              ]
                            },
            {
                "idt": 2,
                "text": "Group 2",
                "children": [
                    {
                        "id": 100,
                        "text": "Option 2.1"
                                },
                    {
                        "id": 15,
                        "text": "Option 2.2"
                                }
                              ]
                            }
                          ];



        $scope.dato3 = [];

        $scope.results2 = [{
                "idr": 1,
                "text": "Group 1",
                "children": [
                    {
                        "id": 1,
                        "text": "Option 1.1"
                    },
                    {
                        "id": 2,
                        "text": "Option 1.2"
                                }
                              ]
                            },
            {
                "idr": 2,
                "text": "Group 2",
                "children": [
                    {
                        "id": 3,
                        "text": "Option 2.1"
                                },
                    {
                        "id": 4,
                        "text": "Option 2.2"
                                }
                              ]
                            }
                          ];







        var Provincia23423 = ['Álava', 'Albacete', 'Alicante/Alacant', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón/Castelló', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Las Palmas', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Illes Balears', 'Jaén', 'A Coruña', 'La Rioja', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia/Valéncia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'];

        $("#Provincia").select2({
           
            data: results

        });

        $scope.datopro = ["20"];






        $("#mauroSelect").select2({


        });



        $scope.provincias = [
            {
                idProvincia: 2,
                nombre: "Castellón"
            },
            {
                idProvincia: 3,
                nombre: "Alicante"
            },
            {
                idProvincia: 1,
                nombre: "Valencia"
            },
            {
                idProvincia: 7,
                nombre: "Teruel"
            },
            {
                idProvincia: 5,
                nombre: "Tarragona"
            }
          ];

        $scope.miProvinciaSeleccionada = [];


        $("#mauro3").select2({


        });


        $("#mauro2").select2({});

        $scope.values = [
            {
                name: "Daily",
                id: 1
            },
            {
                name: "Weekly",
                id: 2
            },
            {
                name: "Monthly",
                id: 3
            },
            {
                name: "Yearly",
                id: 4
            }];
        $scope.selectedItem = [4];





        $("#selectM").select2({

        });


        $scope.itemsM = [{
            id: 1,
            label: 'aLabel',
            subItemM: [
                {
                    idg: 500,
                    name: 'aSubItem'
            },
                {
                    idg: 3000,
                    name: 'xSubItem'
            }]
        }, {
            id: 2,
            label: 'bLabel',
            subItemM: [
                {
                    idg: 200,
                    name: 'bSubItem'
            }, {
                    idg: 54,
                    name: 'ySubItem'
            }]
        }];

        $scope.selectedM = $scope.itemsM[0];









        $scope.nombre = "mauro";

        $scope.service = service;

        $scope.uri = '/alumno/';

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseViewCtrl', {
                "$scope": $scope
            }));

            /**
             * Inicializacion de objeto
             */
            $scope.atras = "1";
            $scope.filterBy = {};
            // Se le pasa el id de asignatura para listar sus temas. 
            $scope.filterBy.asignatura = parseInt($scope.atras);
            $scope.listaConceptos=[];
            
            
            


        })();
    }
]);
