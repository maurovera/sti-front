/**
 * @class
 * Controller que implementa el formulario 
 * de estilo de aprendizajes asociado a un alumno.
 *</a>
 */
app.controller('EstiloAprendizajeFormCtrl', ['$scope', 'EstiloAprendizajeService', '$controller',
    function ($scope, service, $controller) {



        $scope.service = service;
        $scope.uri = "/alumno/";
        /*variable que guarda el resultado del test**/
        /*$scope.varkPrueba = {
            "v": 0,
            "a": 0,
            "r": 0,
            "k": 0

        };*/

        /**Variable que guarda el nombre y resultado
         */
        $scope.vark = [{
                "nombre": "v",
                "valor": 0
            },
            {
                "nombre": "a",
                "valor": 0
            },
            {
                "nombre": "r",
                "valor": 0
            },
            {
                "nombre": "k",
                "valor": 0
            }
                       ];



        /**Funcion encargada de contar cuantas veces 
         * se elige una letra dentro del cuestionario. 
         * VARK
         * OBS: No contempla que se vuelva a hacer el test. Solo una vez.
         * Una vez oprimido guardar ya se queda asi.
         **/
        $scope.guardarEA = function () {
            $scope.listaPregunta.forEach(function (valor, llave) {
                valor.respuestas.forEach(function (value, key) {

                    if (value.habilitado === true) {
                        if (value.valor === "v") {
                            //$scope.vark.v += 1;
                            $scope.vark["0"].valor += 1;

                        } else if (value.valor === "a") {
                            //$scope.vark.a += 1;
                            $scope.vark["1"].valor += 1;
                        } else if (value.valor === "r") {
                            //$scope.vark.r += 1;
                            $scope.vark["2"].valor += 1;
                        } else if (value.valor === "k") {
                            //$scope.vark.k += 1;
                            $scope.vark["3"].valor += 1;
                        } else {

                        }
                    }
                });
            });

            //Imprime los resultados
            console.log("variable vark.v: " + $scope.vark["0"].valor);
            console.log("variable vark.a: " + $scope.vark["1"].valor);
            console.log("variable vark.r: " + $scope.vark["2"].valor);
            console.log("variable vark.k: " + $scope.vark["3"].valor);

            //Se le asigna los resultados al recurso.
            $scope.recurso.resultadoV = $scope.vark["0"].valor;
            $scope.recurso.resultadoA = $scope.vark["1"].valor;
            $scope.recurso.resultadoR = $scope.vark["2"].valor;
            $scope.recurso.resultadoK = $scope.vark["3"].valor;




            //Ordena el array Vark de mayor a menor, luego de cargar con sus valores.
            $scope.vark.sort(function (obj1, obj2) {
                // Ascending: first age less than the previous
                return obj2.valor - obj1.valor;
            });

            //Imprime el array ordenado
            console.log($scope.vark);

            //faltaria asignar el primerEstilo. Se le asigna el mayor.
            $scope.recurso.primerEstilo = $scope.vark["0"].nombre;

            /***Para el segundo estilo se calcula el factor de distancia
             * 1- Si se puede llegar al siguiente ovalo con un valor igual o menor al factor
             * distancia obtenido en la tabla, entonces tambien se marca ese ovalo
             *
             **/
            //Factor distancia. La suma de todo los valor da el rango donde cae el factor de distancia.
            $scope.factorDistancia = [
                {
                    "nombre": "10 a 16",
                    "minimo": 10,
                    "maximo": 16,
                    "valor": 1
                },
                {
                    "nombre": "17 a 22",
                    "minimo": 17,
                    "maximo": 22,
                    "valor": 2
                },
                {
                    "nombre": "23 a 26",
                    "minimo": 23,
                    "maximo": 26,
                    "valor": 3
                },
                {
                    "nombre": "mas de 26",
                    "minimo": 26,
                    "maximo": 1000,
                    "valor": 4
                }];


            // suma de todo los valores.
            $scope.rango = $scope.vark["0"].valor + $scope.vark["1"].valor + $scope.vark["2"].valor + $scope.vark["3"].valor;
            console.log("rango: " + $scope.rango);
            $scope.factor = 0;

            //comprobamos en que rango cae.
            if (($scope.rango >= $scope.factorDistancia["0"].minimo) && ($scope.rango <= $scope.factorDistancia["0"].maximo)) {
                console.log($scope.factorDistancia["0"].nombre);
                $scope.factor = 1;
            } else if (($scope.rango >= $scope.factorDistancia["1"].minimo) && ($scope.rango <= $scope.factorDistancia["1"].maximo)) {
                console.log($scope.factorDistancia["1"].nombre);
                $scope.factor = 2;
            } else if (($scope.rango >= $scope.factorDistancia["2"].minimo) && ($scope.rango <= $scope.factorDistancia["2"].maximo)) {
                console.log($scope.factorDistancia["2"].nombre);
                $scope.factor = 3;
            } else if (($scope.rango >= $scope.factorDistancia["3"].minimo) && ($scope.rango <= $scope.factorDistancia["3"].maximo)) {
                console.log($scope.factorDistancia["3"].nombre);
                $scope.factor = 4;
            } else {
                console.log("no es nada");
            }


            // ahora vamos a calcular la distancia
            //para ver si es multimodal o monomodal
            // se resta el mayor valor obtenido con el rango para comprobar si es factible la distancia. Se guarda en diferencia
            $scope.diferencia = $scope.vark["0"].valor - $scope.factor;
            
            /**Si la diferencia es igual o menor al siguiente valor del vark, entonces tiene un
            * estilo mas. Que seria el segundo. Esto se puede ir haciendo con los otros
            * pero nosotros solo utilizaremos dos.
            * Se le asigna el segundo estilo si cumple. si no se imprime que solo es monomodal
            */
            if($scope.diferencia  <= $scope.vark["1"].valor ){
                $scope.recurso.segundoEstilo = $scope.vark["1"].nombre; 
                console.log("multimodal");
            }else{
                console.log("monomodal");
            }
            
                

            //y llama a la funcion guardar.
            $scope.guardar();


        };




        //Lista de preguntas que se desplega en el front
        $scope.listaPregunta = [
            {
                id: "pregunta1",
                pregunta: "Recuerde la vez cuando aprendió cómo hacer algo nuevo. Evite elegir una destreza física, como montar bicicleta. ¿Cómo aprendió mejor?:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "a",
                        id: "res1",
                        titulo: "escuchando la explicación de alguien y haciendo preguntas."
                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res2",
                        titulo: "viendo una demostración."
                    }, {

                        habilitado: false,
                        valor: "r",
                        id: "res3",
                        titulo: "siguiendo instrucciones escritas en un manual o libro de texto."
                    }, {
                        habilitado: false,
                        valor: "v",
                        id: "res4",
                        titulo: "siguiendo pistas visuales en diagramas y gráficas."
                    }
                ]
            },
            {
                id: "pregunta2",
                pregunta: "Un sitio web tiene un video que muestra cómo hacer un gráfico especial. Hay una persona que habla, algunas listas y palabras que describen lo que debe hacer y algunos diagramas. Se podría aprender más de:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "v",
                        id: "res1",
                        titulo: "ver los diagramas."
                    }, {

                        habilitado: false,
                        valor: "r",
                        id: "res2",
                        titulo: "la lectura de las palabras."
                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res3",
                        titulo: "viendo las acciones."
                    }, {
                        habilitado: false,
                        valor: "a",
                        id: "res4",
                        titulo: "escuchando."
                    }
                ]
            },
            {
                id: "pregunta3",
                pregunta: "Tiene un problema con su rodilla. Preferiría que el doctor:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "r",
                        id: "res1",
                        titulo: "le diera una dirección web o algo para leer sobre el asunto.",

                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res2",
                        titulo: "utilizara el modelo plástico de una rodilla para mostrarle qué está mal."
                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res3",
                        titulo: "le mostrara con un diagrama qué es lo que está mal."
                    }, {
                        habilitado: false,
                        valor: "a",
                        id: "res4",
                        titulo: "le describiera qué está mal."
                    }
                ]

            }, {
                id: "pregunta4",
                pregunta: "Está ayudando a una persona que desea ir al aeropuerto, al centro de la ciudad o a la estación del ferrocarril. Ud.:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "r",
                        id: "res1",
                        titulo: "le daría las indicaciones por escrito (sin un mapa).",

                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res2",
                        titulo: "iría con ella."
                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res3",
                        titulo: "le daría un mapa."
                    }, {
                        habilitado: false,
                        valor: "a",
                        id: "res4",
                        titulo: "le diría cómo llegar."
                    }
                ]

            }, {
                id: "pregunta5",
                pregunta: "Ha acabado una competencia o una prueba y quisiera una retroalimentación. Quisiera tener la retroalimentación:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "k",
                        id: "res1",
                        titulo: "utilizando ejemplos de lo que ha hecho.",

                    }, {

                        habilitado: false,
                        valor: "a",
                        id: "res2",
                        titulo: "escuchando a alguien haciendo una revisión detallada de su desempeño."
                    }, {

                        habilitado: false,
                        valor: "r",
                        id: "res3",
                        titulo: "utilizando una descripción escrita de sus resultados."
                    }, {
                        habilitado: false,
                        valor: "v",
                        id: "res4",
                        titulo: "utilizando gráficas que muestren lo que ha conseguido."
                    }
                ]


            }, {
                id: "pregunta6",
                pregunta: "Le gustan los sitios web que tienen:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "r",
                        id: "res1",
                        titulo: "descripciones escritas interesantes, características  y explicaciones.",

                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res2",
                        titulo: "cosas que se pueden picar, mover o probar."
                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res3",
                        titulo: "un diseño interesante y características visuales."
                    }, {
                        habilitado: false,
                        valor: "a",
                        id: "res4",
                        titulo: "canales de audio para oír música, programas o entrevistas."
                    }
                ]
            }, {
                id: "pregunta7",
                pregunta: "Está utilizando un libro, CD o sitio web para aprender cómo tomar fotografías con su nueva cámara digital. Le gustaría tener:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "a",
                        id: "res1",
                        titulo: "la oportunidad de hacer preguntas y que le hablen sobre la cámara y sus características.",

                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res2",
                        titulo: "diagramas que muestren la cámara y qué hace cada una de sus partes."
                    }, {

                        habilitado: false,
                        valor: "r",
                        id: "res3",
                        titulo: "instrucciones escritas con claridad, con características y puntos sobre qué hacer."
                    }, {
                        habilitado: false,
                        valor: "k",
                        id: "res4",
                        titulo: "muchos ejemplos de fotografías buenas y malas y cómo mejorar éstas."
                    }
                ]
            }, {
                id: "pregunta8",
                pregunta: "Va a cocinar algún platillo especial para su familia. Ud.:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "a",
                        id: "res1",
                        titulo: "pediría sugerencias a sus amigos.",

                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res2",
                        titulo: "cocinaría algo que conoce sin la necesidad de instrucciones."
                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res3",
                        titulo: "hojearía un libro de cocina para tomar ideas de las fotografías."
                    }, {
                        habilitado: false,
                        valor: "r",
                        id: "res4",
                        titulo: "utilizaría un libro de cocina donde sabe que hay una buena receta."
                    }
                ]
            }, {
                id: "pregunta9",
                pregunta: "Desea aprender un nuevo programa, habilidad o juego de computadora. Ud. debe:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "k",
                        id: "res1",
                        titulo: "utilizar los controles o el teclado.",

                    }, {

                        habilitado: false,
                        valor: "r",
                        id: "res2",
                        titulo: "leer las instrucciones escritas que vienen con el programa."
                    }, {

                        habilitado: false,
                        valor: "a",
                        id: "res3",
                        titulo: "platicar con personas que conocen el programa."
                    }, {
                        habilitado: false,
                        valor: "v",
                        id: "res4",
                        titulo: "seguir los diagramas del libro que vienen con el programa."
                    }
                ]
            }, {
                id: "pregunta10",
                pregunta: "Está planeando unas vacaciones para un grupo de personas y desearía la retroalimentación de ellos sobre el plan. Ud.:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "a",
                        id: "res1",
                        titulo: "les llamaría por teléfono, les escribiría o les enviaría un e-mail.",

                    }, {

                        habilitado: false,
                        valor: "r",
                        id: "res2",
                        titulo: "les daría una copia del itinerario impreso."
                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res3",
                        titulo: "utilizaría un mapa o un sitio web para mostrar los lugares."
                    }, {
                        habilitado: false,
                        valor: "k",
                        id: "res4",
                        titulo: "describiría algunos de los atractivos del viaje."
                    }
                ]
            }, {
                id: "pregunta11",
                pregunta: "Va a elegir sus alimentos en un restaurante o café. Ud.:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "r",
                        id: "res1",
                        titulo: "elegiría a partir de las descripciones del menú.",

                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res2",
                        titulo: "elegiría algo que ya ha probado en ese lugar."
                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res3",
                        titulo: "observaría lo que otros están comiendo o las fotografías de cada platillo."
                    }, {
                        habilitado: false,
                        valor: "a",
                        id: "res4",
                        titulo: "escucharía al mesero o pediría recomendaciones a sus amigos."
                    }
                ]
            }, {
                id: "pregunta12",
                pregunta: "Un grupo de turistas desea aprender sobre los parques o las reservas de vida salvaje en su área. Ud.:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "a",
                        id: "res1",
                        titulo: "les daría una plática acerca de parques o reservas de vida salvaje.",

                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res2",
                        titulo: "los llevaría a un parque o reserva y daría una caminata con ellos."
                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res3",
                        titulo: "les mostraría figuras de Internet, fotografías o libros con imágenes."
                    }, {
                        habilitado: false,
                        valor: "r",
                        id: "res4",
                        titulo: "les daría libros o folletos sobre parques o reservas de vida salvaje."
                    }
                ]
            }, {
                id: "pregunta13",
                pregunta: "Prefiere a un profesor o un expositor que utiliza:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "r",
                        id: "res1",
                        titulo: "folletos, libros o lecturas.",

                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res2",
                        titulo: "diagramas, esquemas o gráficas."
                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res3",
                        titulo: "demostraciones, modelos o sesiones prácticas."
                    }, {
                        habilitado: false,
                        valor: "a",
                        id: "res4",
                        titulo: "preguntas y respuestas, charlas, grupos de discusión u oradores invitados."
                    }
                ]
            }, {
                id: "pregunta14",
                pregunta: "Además del precio, ¿qué influiría más en su decisión de comprar un nuevo libro de no ficción?",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "a",
                        id: "res1",
                        titulo: "un amigo le habla del libro y se lo recomienda.",

                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res2",
                        titulo: "tiene historias, experiencias y ejemplos de la vida real."
                    }, {

                        habilitado: false,
                        valor: "r",
                        id: "res3",
                        titulo: "una lectura rápida de algunas partes del libro."
                    }, {
                        habilitado: false,
                        valor: "v",
                        id: "res4",
                        titulo: "la apariencia le resulta atractiva."
                    }
                ]
            }, {
                id: "pregunta15",
                pregunta: "Está a punto de comprar una cámara digital o un teléfono móvil. ¿Además del precio, qué más influye en su decisión?",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "r",
                        id: "res1",
                        titulo: "la lectura de los detalles acerca de las características del aparato.",

                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res2",
                        titulo: "el diseño del aparato es moderno y parece bueno."
                    }, {

                        habilitado: false,
                        valor: "k",
                        id: "res3",
                        titulo: "lo utiliza o lo prueba."
                    }, {
                        habilitado: false,
                        valor: "a",
                        id: "res4",
                        titulo: "los comentarios del vendedor acerca de las características del aparato."
                    }
                ]
            }, {
                id: "pregunta16",
                pregunta: "Tiene que hacer un discurso importante para una conferencia o una ocasión especial. Ud.:",
                respuestas: [
                    {
                        habilitado: false,
                        valor: "r",
                        id: "res1",
                        titulo: "escribiría su discurso y se lo aprendería leyéndolo varias veces.",

                    }, {

                        habilitado: false,
                        valor: "v",
                        id: "res2",
                        titulo: "elaboraría diagramas o conseguiría gráficos que le ayuden a explicar las ideas."
                    }, {

                        habilitado: false,
                        valor: "a",
                        id: "res3",
                        titulo: "escribiría algunas palabras clave y práctica su discurso repetidamente."
                    }, {
                        habilitado: false,
                        valor: "k",
                        id: "res4",
                        titulo: "conseguiría muchos ejemplos e historias para hacer la charla real y práctica."
                    }
                ]
            }
        ];







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




    }


]);
