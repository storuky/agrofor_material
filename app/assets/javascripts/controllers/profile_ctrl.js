app.controller('ProfileCtrl', ['$scope', 'action', 'Profile', 'Position', 'Correspondence', function ($scope, action, Profile, Position, Correspondence) {
  var ctrl = this;

  ctrl.profileInfoTabs = [{id: 0, title: 'Личные данные'}, {id: 1, title: "Местоположение"}, {id: 2, title: "Контактные данные"}]
  ctrl.profilePositionsTabs = [{id: 0, title: 'Совершенные сделки'}, {id: 1, title: 'Открытые позиции'}]

  ctrl.profileInfoTab = 0;
  ctrl.profilePositionsTab = 0;

  $scope.Position = Position;
  $scope.Correspondence = Correspondence;

  ctrl.querySearch = function (query) {
    var  interest_ids = _.pluck(ctrl.user.interests, 'id')
    return _.select(gon.data.categories, function (category) {
      return category.title.toLowerCase().indexOf(query.toLowerCase()) != -1 && interest_ids.indexOf(category.id) == -1
    })
  }
  
  action('show', function (params) {
    ctrl.disabled = true;

    ctrl.user = Profile.get({id: params.id})

    ctrl.positions = Profile.positions({id: params.id})
    ctrl.feedbacks = Profile.feedbacks({id: params.id})

    ctrl.resetProfile = function () {
      Profile.get({id: params.id}, function (res) {
        ctrl.user = res;
      })
    }

    ctrl.save = function () {
      Profile.update({form_name: 'user', id: ctrl.user.id, user: ctrl.user}, function (res) {
        ctrl.disabled = true;
        ctrl.user = res.user;
      })
    }
  })
}])