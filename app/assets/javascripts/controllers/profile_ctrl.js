app.controller('ProfileCtrl', ['$scope', 'action', 'Profile', 'Position', function ($scope, action, Profile, Position) {
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
    ctrl.user = Profile.get({id: params.id})

    ctrl.positions = Profile.positions({id: params.id})
    ctrl.feedbacks = Profile.feedbacks({id: params.id})

    ctrl.save = Profile.update;
  })
}])