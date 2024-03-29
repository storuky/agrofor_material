app.controller('ProfileCtrl', ['$scope', 'action', 'Profile', 'Position', 'Correspondence', '$location', 'Translation', 'Currency', '$timeout', function ($scope, action, Profile, Position, Correspondence, $location, Translation, Currency, $timeout) {
  var ctrl = this;

  ctrl.profileInfoTabs = [{id: 0, title: 'Личные данные'}, {id: 1, title: "Местоположение"}, {id: 2, title: "Контактные данные"}]
  ctrl.profilePositionsTabs = [{id: 0, title: 'Совершенные сделки'}, {id: 1, title: 'Открытые позиции'}]

  ctrl.profileInfoTab = 0;
  ctrl.profilePositionsTab = 0;

  $scope.Position = Position;

  ctrl.querySearch = function (query) {
    var  interest_ids = _.pluck(ctrl.user.interests, 'id')
    return _.select(gon.data.categories, function (category) {
      return category.title.toLowerCase().indexOf(query.toLowerCase()) != -1 && interest_ids.indexOf(category.id) == -1
    })
  }
  
  action('show', function (params) {
    ctrl.disabled = gon.current_user && params.id != gon.current_user.id;
    
    if (gon.current_user && params.id == gon.current_user.id) {
      $scope.$watch('ctrl.user.avatar', function (avatar) {
        if (avatar)
          gon.current_user.avatar = avatar;
      })

      ctrl.wasChanged = false;

      $scope.$watch('ctrl.user', function (user, old) {
        if (user && user.id && old) {
          ctrl.wasChanged = true;
        }
      }, true)
    }

    ctrl.send_message = function () {
      Correspondence.create({user_id: ctrl.user.id}, function (res) {
        $location.url('/correspondences?id='+res.id)
      })
    }

    ctrl.resetProfile = function () {
      Profile.get({id: params.id}, function (res) {
        ctrl.user = res;
        $timeout(function () {
          ctrl.wasChanged = false;
        })
      })
    }

    ctrl.resetProfile();

    ctrl.feedbacks = Profile.feedbacks({id: params.id})


    ctrl.save = function () {
      Profile.update({form_name: 'user', id: ctrl.user.id, user: ctrl.user}, function (res) {
        ctrl.user = res.user;
        gon.current_user = angular.copy(res.user);

        if (res.update_translations) {
          Translation.update();
        }

        if (res.update_currency) {
          Currency.update_user_currency();
          Currency.update_rates();
        }

        $timeout(function () {
          ctrl.wasChanged = false;
        })
      })
    }

    ctrl.order = "created_at";

    $scope.$watch('ctrl.order', function () {
      Profile.positions({id: params.id, order: ctrl.order}, function (res) {
        ctrl.positions = res;
      })
    })
  })
}])