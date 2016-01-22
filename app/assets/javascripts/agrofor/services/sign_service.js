app.service('Sign', ['$http', '$state', 'Counter', 'Ws', function ($http, $state, Counter, Ws) {
  var Sign = this;

  Sign.out = function () {
    $http.delete(Routes.destroy_user_session_path())
      .then(function (res) {
        window.location = "/"
      })
  }
}])