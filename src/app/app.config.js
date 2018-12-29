let app_config = function($compileProvider, $stateProvider, $urlRouterProvider, $httpProvider, GlobalConfigFactoryProvider, $translateProvider, $translatePartialLoaderProvider) {
    const login_state = {
        "name": "login",
        "url": "/login",
        "component": "login"
    };

    const index_state = {
        "name": "index",
        "url": "/index",
        "component": "index"
    };

    const settings_state = {
        "name": "settings",
        "url": "/settings",
        "component": "settings"
    };

    $stateProvider
        .state(login_state)
        .state(index_state)
        .state(settings_state)

    $urlRouterProvider.otherwise("/login");
    
    // Config  I18N
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useLoader("$translatePartialLoader",{
        urlTemplate: "asset/i18n/{lang}.json"
    });
    $translatePartialLoaderProvider.addPart('app');
    $translateProvider.preferredLanguage('fr'); 
    $translateProvider.forceAsyncReload(true);

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('HttpErrorInterceptorFactory');
    
    // CORS options necessary to enable session cookie
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
};

app_config.$inject = ["$compileProvider", "$stateProvider", "$urlRouterProvider", "$httpProvider", "GlobalConfigFactoryProvider", "$translateProvider", "$translatePartialLoaderProvider"];

module.exports = app_config;
