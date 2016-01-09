app.service('Action', [function () {
  var Action = this;

  Action.confirm = function (message, callback) {
    Action.description = message;
    Action.showConfirm = true;

    Action.callback = callback;
  }

  Action.alert = function () {
    Action.showAlert = true;
  }
}])