app.controller('ProfileCtrl', ['$scope', 'action', 'Profile', function ($scope, action, Profile) {
  var ctrl = this;

  ctrl.tabs = [{id: 0, title: 'Общая информация'}, {id: 1, title: "Активность"}]

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