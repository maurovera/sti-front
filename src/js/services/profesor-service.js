/**
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios 
 * para realizar las operaciones sobre el recurso Empresa.
 *
 * @name gfd.service#UsuarioService
 * @author <a href="mailto:juan.benitez@konecta.com.py">Juan Benitez</a>
 */
app.service('ProfesorService', ['$http', 'StiBaseService', function ($http, BaseService) {
        return angular.extend({}, BaseService, {
            recurso: "/profesor/" 
        });
    }]);
    