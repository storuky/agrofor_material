app.service('Sign', ['$http', '$state', function ($http, $state) {
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
      .success(function (res) {
        gon.current_user = res.current_user;
        gon.settings = res.settings;
        Sign.isShow = false;
        if (Sign.redirectTo) {
          $state.go(Sign.redirectTo);
          Sign.redirectTo = undefined;
        }

      })
  }

  Sign.up = function (form) {
    $http.post(Routes.user_registration_path(), {user: form})
      .success(function (res) {
        gon.current_user = res;
        Sign.isShow = false;
      })
  }
}])