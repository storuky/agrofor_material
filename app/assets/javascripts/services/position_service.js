app.run(['Position', 'Search', '$mdDialog', '$location', '$state', 'Offer', function (Position, Search, $mdDialog, $location, $state, Offer) {
  Position.openModal = function (params) {
    var type = $location.search().type,
        Resource;

    if (type == 'Offer')
      Resource = Offer;
    else
      Resource = Position;

    Resource.get({id: params['id']}, function (res) {
      positionCallback(res, {ids: params['ids'], suitable: params['suitable']})
    })
  }

  

  Position.openClusterModal = function (ids) {
    $location.search({ids: ids});
    Position.query({ids: ids}, clusterCallback)
  }

  function positionCallback (res, params) {
    Search.blur = true;
    Position.modal = $mdDialog.show({
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
                  if (params['ids']) {
                    Position.openClusterModal(params['ids'])
                  }
                }, params);
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
      $location.search('id', undefined)
      if (!$location.search().ids)
        Search.blur = false;
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
      $location.search('ids', undefined)
      if (!$location.search().id)
        Search.blur = false;
    })
  }

  Position.closeModal = function () {
    $mdDialog.cancel();
  }

  Position.goTo = function (position, $event) {
    var search = {
      id: position.id, 
      type: position.type,
      suitable: position.suitable
    }

    $location.url('/search/map');
    $location.search(search)
    if ($event) $event.stopPropagation();
  }
}])