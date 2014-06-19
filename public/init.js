'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    console.log(angular.bootstrap);
    angular.bootstrap(document, ['flyService']);
});

// Dynamically add angular modules declared by packages
var packageModules = [];
for (var index in window.modules) {
    angular.module(window.modules[index].module, (window.modules[index].angularDependencies?window.modules[index].angularDependencies:[]));
    packageModules.push(window.modules[index].module);
}

var modules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router',
    'flyService.system', 'flyService.auth', 'flyService.tests'];

modules = modules.concat(packageModules);

// Combined modules
angular.module('flyService', modules);
