app.service('Counter', ['$http', function ($http) {
  var Counter = this;

  Counter.update = function () {
    $http.get(Routes.counters_path())
      .then(function (res) {
        angular.extend(Counter, res.data)
      })
  }

  Counter.sum = function () {
    return Counter.new_messages_count + Counter.new_offers_count
  }  
}])