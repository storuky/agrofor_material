app.run(['$rootScope', 'Counter', function ($rootScope, Counter) {
  var counter = _.debounce(function () {
    Counter.update();
  }, 300)

  $rootScope.$on('loading:finish', function (h, res) {
    if (res.data.new_messages_count == undefined){
      counter();
    }
  })

}])