'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['flyService']);

});

angular.module('flyService', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router',
    'flyService.system', 'flyService.auth', 'flyService.tests']);