app.controller('ProfileCtrl', ['$scope', 'action', 'Profile', function ($scope, action, Profile) {
  var ctrl = this;

  ctrl.tabs = [{id: 0, title: 'Личные данные'}, {id: 1, title: "Местоположение"}, {id: 2, title: "Контактные данные"}]

  ctrl.currentTab = 0;

  ctrl.querySearch = function (query) {
    
    return _.select(gon.data.categories, function (category) {
      return category.title.toLowerCase().indexOf(query.toLowerCase()) != -1
    })
  }
  
  action('show', function (params) {
    ctrl.user = Profile.get({id: params.id})

    ctrl.save = Profile.update;
  })
}])