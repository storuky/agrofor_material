app.controller('ProfileCtrl', ['$scope', 'action', 'Profile', function ($scope, action, Profile) {
  var ctrl = this;

  ctrl.tabs = [{id: 0, title: 'Личные данные'}, {id: 1, title: "Контактная информация"}, {id: 2, title: "Активность"}]

  ctrl.currentTab = 0;
  
  action('show', function (params) {
    ctrl.user = Profile.get({id: params.id})

    ctrl.save = Profile.update;
  })
}])