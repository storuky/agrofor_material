app.run(['$rootScope', 'Sign', function ($rootScope, Sign) {
  $rootScope.$on('loading:error', function (h, res, p) {
    if (res.status == 401) {
      Sign.isShow = true;
    }
  })
}])