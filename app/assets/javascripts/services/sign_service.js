app.service('Sign', ['$http', '$state', 'Counter', 'Ws', function ($http, $state, Counter, Ws) {
  var Sign = this;

  Sign.out = function () {
    $http.delete(Routes.destroy_user_session_path())
      .success(function (res) {
        gon.current_user = undefined;
        $state.go('map_path')
      })
  }

  Sign.in = function (form) {
    $http.post(Routes.user_session_path(), {user: form})
      .success(signCallback)
  }

  Sign.up = function (form) {
    $http.post(Routes.user_registration_path(), {user: form})
      .success(signCallback)
  }

  function signCallback (res) {
    gon.current_user = res.current_user;
    gon.settings = res.settings;
    gon.channel = res.channel;
    gon.favorite_ids = res.favorite_ids;

    Ws.connect()

    Sign.isShow = false;
    if (Sign.redirectTo) {
      $state.go(Sign.redirectTo);
      Sign.redirectTo = undefined;
    }
  }
}])