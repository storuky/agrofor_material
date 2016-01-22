app.service('Sidebar', [function () {
  var Sidebar = this;

  Sidebar.open = function () {
    Sidebar.isOpen = true;
  }

  Sidebar.close = function () {
    Sidebar.isOpen = false;
  }
}])