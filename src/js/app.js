/*
 * Se configuran las rutas de la aplicación
 */
app.config(['$routeProvider', '$httpProvider', 'keycloakLauncherProvider',
    function ($routeProvider, $httpProvider, keycloakLauncherProvider) {
        /*
         * Se registran los interceptors de keycloak.
         */
        $httpProvider.interceptors.push('errorInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
        /*
         * Route resolver que se utiliza para restringir las páginas que necesitan 
         * que el usuario este logeado en el sistema para acceder a al misma. 
         */
        var resolve = {
            init: ['keycloakLauncher', '$location', function (keycloakLauncher, $location) {
                if (!keycloakLauncher.loggedIn) {
                    $location.url("/");
                }
            }]
        };

        /*
         * Route resolver que se utiliza para evitar que se accedan a páginas de caracter público
         * cuando el usuario está logeado.
         */
        var publicResolve = {
            init: ['keycloakLauncher', '$location', function (keycloakLauncher, $location) {
                if (keycloakLauncher.loggedIn) {
                    $location.url("/dashboard");
                }
            }]
        };

        /*
         * Se definen las rutas de la aplicación
         */
        $routeProvider
            .when('/', {
                templateUrl: 'partials/public-partial.html',
                resolve: publicResolve
            })
            .when('/dashboard', {
                templateUrl: 'partials/dashboard-partial.html',
                resolve: resolve
            })
            .when('/empresas/', {
                templateUrl: 'partials/empresas/empresa-list-partial.html',
                controller: 'EmpresaListCtrl',
                resolve: resolve
            })
            .when('/empresas/crear', {
                templateUrl: 'partials/empresas/empresa-form-partial.html',
                controller: 'EmpresaFormCtrl',
                resolve: resolve
            })
            .when('/empresas/:id/editar', {
                templateUrl: 'partials/empresas/empresa-form-partial.html',
                controller: 'EmpresaFormCtrl',
                resolve: resolve
            })
            .when('/empresas/:id/ver', {
                templateUrl: 'partials/empresas/empresa-view-partial.html',
                controller: 'EmpresaViewCtrl',
                resolve: resolve
            })
            .when('/empresas-template/', {
                templateUrl: 'partials/empresas-template/empresa-list-partial.html',
                controller: 'EmpresaTemplateListCtrl',
                resolve: resolve
            })
            .when('/empresas-template/crear', {
                templateUrl: 'partials/empresas-template/empresa-form-partial.html',
                controller: 'EmpresaTemplateFormCtrl',
                resolve: resolve
            })
            .when('/empresas-template/:id/editar', {
                templateUrl: 'partials/empresas-template/empresa-form-partial.html',
                controller: 'EmpresaTemplateFormCtrl',
                resolve: resolve
            })
            .when('/empresas-template/:id/ver', {
                templateUrl: 'partials/empresas-template/empresa-view-partial.html',
                controller: 'EmpresaTemplateViewCtrl',
                resolve: resolve
            })
            .when('/profesor', {
                templateUrl: 'partials/profesores/profesor-list-partial.html',
                controller: 'ProfesorListCtrl',
                resolve: resolve
            })
            .when('/profesor/crear', {
                templateUrl: 'partials/profesores/profesor-form-partial.html',
                controller: 'ProfesorFormCtrl',
                resolve: resolve
            })
            .when('/profesor/:id/editar', {
                templateUrl: 'partials/profesores/profesor-form-partial.html',
                controller: 'ProfesorFormCtrl',
                resolve: resolve
            })
            .when('/profesor/:id/ver', {
                templateUrl: 'partials/profesores/profesor-view-partial.html',
                controller: 'ProfesorViewCtrl',
                resolve: resolve
            })
            .when('/profesor/:id/eliminar', {
                templateUrl: 'partials/profesores/profesor-form-partial.html',
                controller: 'ProfesorFormCtrl',
                resolve: resolve
            })
            .when('/asignatura', {
                templateUrl: 'partials/asignaturas/asignatura-list-partial.html',
                controller: 'AsignaturaListCtrl',
                resolve: resolve
            })
            .when('/asignatura/crear', {
                templateUrl: 'partials/asignaturas/asignatura-form-partial.html',
                controller: 'AsignaturaFormCtrl',
                resolve: resolve
            })
            .when('/asignatura/:id/editar', {
                templateUrl: 'partials/asignaturas/asignatura-form-partial.html',
                controller: 'AsignaturaFormCtrl',
                resolve: resolve
            })
            .when('/asignatura/:id/ver', {
                templateUrl: 'partials/asignaturas/asignatura-view-partial.html',
                controller: 'AsignaturaViewCtrl',
                resolve: resolve
            })
            .when('/asignatura/:id/eliminar', {
                templateUrl: 'partials/asignaturas/asignatura-form-partial.html',
                controller: 'AsignaturaFormCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/tema', {
                templateUrl: 'partials/temas/tema-list-partial.html',
                controller: 'TemaListCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/tema/crear', {
                templateUrl: 'partials/temas/tema-form-partial.html',
                controller: 'TemaFormCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/tema/:idTema/editar', {
                templateUrl: 'partials/temas/tema-form-partial.html',
                controller: 'TemaFormCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/tema/:idTema/ver', {
                templateUrl: 'partials/temas/tema-view-partial.html',
                controller: 'TemaViewCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/tema/:idTema/concepto', {
                templateUrl: 'partials/conceptos/concepto-list-partial.html',
                controller: 'ConceptoListCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/tema/:idTema/concepto/crear', {
                templateUrl: 'partials/conceptos/concepto-form-partial.html',
                controller: 'ConceptoFormCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/tema/:idTema/concepto/:idConcepto/editar', {
                templateUrl: 'partials/conceptos/concepto-form-partial.html',
                controller: 'ConceptoFormCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/tema/:idTema/concepto/:idConcepto/ver', {
                templateUrl: 'partials/conceptos/concepto-view-partial.html',
                controller: 'ConceptoViewCtrl',
                resolve: resolve
            })
            .when('/alumno', {
                templateUrl: 'partials/alumnos/alumno-list-partial.html',
                controller: 'AlumnoListCtrl',
                resolve: resolve
            }).when('/alumno/crear', {
                templateUrl: 'partials/alumnos/alumno-form-partial.html',
                controller: 'AlumnoFormCtrl',
                resolve: resolve
            })
            .when('/alumno/:id/editar', {
                templateUrl: 'partials/alumnos/alumno-form-partial.html',
                controller: 'AlumnoFormCtrl',
                resolve: resolve
            })
            .when('/alumno/:id/ver', {
                templateUrl: 'partials/alumnos/alumno-view-partial.html',
                controller: 'AlumnoViewCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/ejercicio', {
                templateUrl: 'partials/ejercicios/ejercicio-list-partial.html',
                controller: 'EjercicioListCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/ejercicio/:idEjercicio/ver', {
                templateUrl: 'partials/ejercicios/ejercicio-view-partial.html',
                controller: 'EjercicioViewCtrl',
                resolve: resolve
            })
            .when('/asignatura/:idAsig/ejercicio/:idEjercicio/editar', {
                templateUrl: 'partials/ejercicios/ejercicio-form-partial.html',
                controller: 'EjercicioFormCtrl',
                resolve: resolve
            }).when('/asignatura/:idAsig/ejercicio/crear', {
                templateUrl: 'partials/ejercicios/ejercicio-form-partial.html',
                controller: 'EjercicioFormCtrl',
                resolve: resolve
            })
            .when('/curso', {
                templateUrl: 'partials/cursos/curso-list-partial.html',
                controller: 'CursoListCtrl',
                resolve: resolve
            })
            .when('/curso/crear', {
                templateUrl: 'partials/cursos/curso-form-partial.html',
                controller: 'CursoFormCtrl',
                resolve: resolve
            })
            .when('/curso/:id/editar', {
                templateUrl: 'partials/cursos/curso-form-partial.html',
                controller: 'CursoFormCtrl',
                resolve: resolve
            })
            .when('/curso/:id/ver', {
                templateUrl: 'partials/cursos/curso-view-partial.html',
                controller: 'CursoViewCtrl',
                resolve: resolve
            })
            .when('/curso/:idCurso/tarea', {
                templateUrl: 'partials/tareas/tarea-list-partial.html',
                controller: 'TareaListCtrl',
                resolve: resolve
            })
            .when('/curso/:idCurso/tarea/crear', {
                templateUrl: 'partials/tareas/tarea-form-partial.html',
                controller: 'TareaFormCtrl',
                resolve: resolve
            })
            .when('/curso/:idCurso/tarea/:idTarea/editar', {
                templateUrl: 'partials/tareas/tarea-form-partial.html',
                controller: 'TareaFormCtrl',
                resolve: resolve
            })
            .when('/curso/:idCurso/tarea/:idTarea/ver', {
                templateUrl: 'partials/tareas/tarea-view-partial.html',
                controller: 'TareaViewCtrl',
                resolve: resolve
            })
            .when('/curso/:idCurso/tarea/:idTarea/tareaDetalle', {
                templateUrl: 'partials/tareaDetalles/tareaDetalle-list-partial.html',
                controller: 'TareaDetalleListCtrl',
                resolve: resolve
            })
            .when('/curso/:idCurso/tarea/:idTarea/tareaDetalle/crear', {
                templateUrl: 'partials/tareaDetalles/tareaDetalle-form-partial.html',
                controller: 'TareaDetalleFormCtrl',
                resolve: resolve
            })
            .when('/curso/:idCurso/tarea/:idTarea/tareaDetalle/:idTareaDet/editar', {
                templateUrl: 'partials/tareaDetalles/tareaDetalle-form-partial.html',
                controller: 'TareaDetalleFormCtrl',
                resolve: resolve
            })
            .when('/curso/:idCurso/tarea/:idTarea/tareaDetalle/:idTareaDet/ver', {
                templateUrl: 'partials/tareaDetalles/tareaDetalle-view-partial.html',
                controller: 'TareaDetalleViewCtrl',
                resolve: resolve
            })
            .when('/select', {
                templateUrl: 'partials/select2/select2.html',
                controller: 'select2Ctrl',
                resolve: resolve
            })

            //finaly
            .otherwise({
                redirectTo: '/dashboard'
            });
}]);


/**
 * Se configura para que google analytis que trackee las páginas visitadas.
 */
app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
    // initialise google analytics
    //$window.ga('create', 'UA-XXXXXXXX-X', 'auto');
    // track pageview on state change
    $rootScope.$on('$routeChangeStart', function (event) {
        //$window.ga('send', 'pageview', $location.path());
    });
}]);
