app.run(['Position', 'Search', '$mdDialog', '$location', function (Position, Search, $mdDialog, $location) {
  Position.openModal = function (id) {

    Position.get({id: id}, function (res) {
      Search.blur = true;
      $mdDialog.show({
        controller: 'PositionsCtrl as ctrl',
        templateUrl: 'position.tmpl.html',
        parent: angular.element(document.querySelector('.page')),
        clickOutsideToClose: true,
        resolve: {
          action: function () {
            return function (actionNames, callback) {
              try {
                var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];
                
                if (actionNames.indexOf('modal')!=-1) {
                  callback(res);
                }
              } catch (e) {
                console.error(e);
              }
            }
          }
        }
      }).then(function () {
        // body...
      }, function () {
        Search.blur = false;
        $location.search('id', undefined)
      })
    })
  }

  Position.closeModal = function () {
    $mdDialog.cancel();
  }
}])