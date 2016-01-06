app.service('Counter', ['$http', function ($http) {
  var Counter = this;

  Counter.update = function () {
    $http.get(Routes.counters_path())
      .then(function (res) {
        angular.extend(Counter, res.data)
      })
  }

  
}])