app.controller('PositionsCtrl', ['$scope', 'action', 'Position', 'Offer', 'Cache', '$timeout', '$mdDialog', '$location', 'Sign', '$state', '$location', 'Template',
                        function ($scope, action, Position, Offer, Cache, $timeout, $mdDialog, $location, Sign, $state, $location, Template) {
  
  var ctrl = this;

  ctrl.goTo = function (position) {
    Position.goTo(position)
  }

  $scope.edit_path = function (position) {
    var hash = "{id: "+position.id+"}"
    return "edit_"+position.type.toLowerCase()+"_path("+hash+")"
  }

  $scope.show_path = function (position) {
    return "/search/map?type=" + position.type.toLowerCase() + "&id=" + position.id
  }
  
  $scope.gon = gon;
  $scope.Position = Position;

  action(['new', 'edit', 'index'], function () {
    if (!gon.current_user) {
      $state.go('map_path');
      Sign.isShow = true;
    }

  })

  action('index', function () {
    $scope.Cache = Cache;

    ctrl.filter = {
      type: 0,
      positions: {
        status: "opened"
      },
      offers: {
        status: "new"
      }
    }

    $scope.$watch('ctrl.filter', function () {
      if (ctrl.filter) {
        if (ctrl.filter.type==0) {
          ctrl.positions = Position.query(ctrl.filter.positions);
        } else if (ctrl.filter.type==1) {
          ctrl.positions = Offer.query(ctrl.filter.offers);
        } else if (ctrl.filter.type==2) {
          ctrl.positions = Template.query();
          console.log(ctrl.positions)
        }
      }
    }, true)
  })


  action('new', function () {
    ctrl.position = Position.new();
    ctrl.save = Position.create;
    ctrl.templates = Template.query();

    $scope.$watch('ctrl.template_id', function (template_id) {
      if (template_id) {
        var position = angular.copy(_.find(ctrl.templates, function (template) {
          return template.id == template_id
        }))
        position.id = undefined;
        position.template_name = undefined;
        ctrl.position = position;
      }
    })
  })

  action('edit', function (params) {
    ctrl.position = Position.edit({id: params.id});
    ctrl.save = Position.update;
  })

  action('cluster', function (positions) {
    ctrl.close = function () {
      $mdDialog.cancel();

      $location.search('ids', undefined);
    }

    ctrl.goTo = function (position) {
      var ids = $location.search().ids;
      ctrl.close();
      Position.openModal({id: position.id, ids: ids})
    }
    
    ctrl.positions = positions;
  })


  action('modal', function (position, callback, params) {
    if ($location.search().suitable)
      $scope.isShowOfferOverlay = true;
    ctrl.close = function () {
      $mdDialog.cancel();
      $location.search({id: undefined, type: undefined});
      callback();
    }

    ctrl.deleteOffer = function () {
      ctrl.query = Offer.destroy({id: ctrl.yourOffer.id}, function () {
        get_offers();
        get_suitable();
        ctrl.yourOffer = undefined;
      });
    }

    ctrl.position = position;


    if (gon.current_user && gon.current_user.id!=ctrl.position.user_id) {
      get_offers();
      get_suitable();


      ctrl.send_offer = function (offer) {
        ctrl.query = Position.send_offer({offer_id: offer.id, id: ctrl.position.id}, function (res) {
          ctrl.yourOffer = res.offer;
          ctrl.offers.unshift(res.offer);
          updateSuitablePositions();
        })
      }

      function get_offers () {
        ctrl.query = Position.offers({id: ctrl.position.id}, function (res) {
          ctrl.offers = res;
          if (ctrl.suitable_positions_full) updateSuitablePositions();
          if (gon.current_user) {
            ctrl.yourOffer = _.findWhere(ctrl.offers, {user_id: gon.current_user.id});
          }
        })
      }

      function get_suitable () {
        ctrl.query = Position.suitable({id: ctrl.position.id}, function (res) {
          ctrl.suitable_positions_full = res;
          if (ctrl.offers) updateSuitablePositions();
        })
      }

      function updateSuitablePositions () {
        var offer_ids = _.pluck(ctrl.offers, "id");
        ctrl.suitable_positions = _.select(ctrl.suitable_positions_full, function (position) {
          return !_.contains(offer_ids, position.id)
        })
      }
    }

    // $scope.$watch('ctrl.position.price_weight_dimension_id', function (wd) {
    //   if (wd!==undefined) {
    //     ctrl.position.price = (ctrl.position.price_etalon * gon.data.by_index.weight_dimensions[wd].convert).toFixed(2);
    //   }
    // })

    // $scope.$watch('ctrl.position.weight_dimension_id', function (wd) {
    //   if (wd!==undefined) {
    //     ctrl.position.weight = (ctrl.position.weight_etalon / gon.data.by_index.weight_dimensions[wd].convert).toFixed(2);
    //   }
    // })

    // $scope.$watch('ctrl.position.weight_min_dimension_id', function (wd) {
    //   if (wd!==undefined) {
    //     ctrl.position.weight_min = (ctrl.position.weight_min_etalon / gon.data.by_index.weight_dimensions[wd].convert).toFixed(2);
    //   }
    // })
  })
}])