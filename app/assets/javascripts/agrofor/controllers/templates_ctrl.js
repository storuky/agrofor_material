app.controller('TemplatesCtrl', ['$scope', 'action', 'Template', function ($scope, action, Template) {
  var ctrl = this;

  action('edit', function (params) {
    ctrl.position = Template.edit({id: params['id']})

    ctrl.save = function (form) {
      Template.update({form_name: 'position', id: ctrl.position.id, template: ctrl.position})
    }
  })
}])