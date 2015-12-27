app.run(['Position', 'Search', '$mdDialog', '$location', '$state', function (Position, Search, $mdDialog, $location, $state) {
  Position.openModal = function (id, ids) {
    $location.search({id: id});

    Position.get({id: id}, function (res) {
      positionCallback(res, ids)
    })
  }

  Position.openClusterModal = function (ids) {
    $location.search({ids: ids});
    Position.query({ids: ids}, clusterCallback)
  }

  function positionCallback (res, ids) {
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
                callback(res, function () {
                  if (ids) {
                    Position.openClusterModal(ids)
                  }
                });
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
  }

  function clusterCallback (res) {
    Search.blur = true;
    $mdDialog.show({
      controller: 'PositionsCtrl as ctrl',
      templateUrl: 'position_cluster.tmpl.html',
      parent: angular.element(document.querySelector('.page')),
      clickOutsideToClose: true,
      resolve: {
        action: function () {
          return function (actionNames, callback) {
            try {
              var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];
              
              if (actionNames.indexOf('cluster')!=-1) {
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
      $location.search('ids', undefined)
    })
  }

  Position.closeModal = function () {
    $mdDialog.cancel();
  }

  Position.goTo = function (id, $event) {
    $location.url('/search/map?id='+id)
  }
}])