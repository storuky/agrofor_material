app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .rails()

  $urlRouterProvider.otherwise('/search');
}])