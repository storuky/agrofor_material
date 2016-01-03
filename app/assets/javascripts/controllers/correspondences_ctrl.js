app.controller('CorrespondencesCtrl', ['$scope', 'action', '$state', '$timeout', 'Correspondence', '$location', function ($scope, action, $state, $timeout, Correspondence, $location) {
  var ctrl = this;

  action('index', function () {
    if (!gon.current_user) {
      $state.go('map_path');
      Sign.isShow = true;
    }


    Correspondence.query(function (res) {
      ctrl.correspondences = res;
      ctrl.contact = _.find(ctrl.correspondences, function (corr) {
        return corr.id == $location.search().id
      });
    });

    $scope.$watch(function () {
      return $location.search().id
    }, function (id) {
      if (id) {
        ctrl.form = {}
        ctrl.correspondence = Correspondence.get({id: id});
        ctrl.contact = _.find(ctrl.correspondences, function (corr) {
          return corr.id == id
        });
      }
    })

    $scope.$watch('ctrl.correspondence.messages', function (messages) {
      if (messages)
        scrollBottom()
    }, true)

    $scope.send = function () {
      if (ctrl.form.body.length) {
        ctrl.contact.last_message = ctrl.form.body;
        Correspondence.send_message({id: ctrl.contact.id, body: ctrl.form.body, document_ids: _.pluck(ctrl.form.documents, "id")})
        ctrl.correspondence.messages.push({
          correspondence_id: ctrl.contact.id,
          body: ctrl.form.body,
          user: $scope.opponent_user(ctrl.contact.users),
          created_at: new Date(),
          documents: ctrl.form.documents
        })
        ctrl.form = {};
      }
    }

    $scope.opponent_user = function (users) {
      return _.findWhere(users, {id: gon.current_user.id})
    }

    $scope.opponent_position = function (positions) {
      return _.findWhere(positions, {user_id: gon.current_user.id});
    }


    $scope.$watch('ctrl.contact', function (contact) {
      scrollBottom()
    })

    angular.element(document.querySelector('.message-page__send__textarea textarea')).bind('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.keyCode == 13) {
        $scope.send();
        $scope.$apply();
      }
    });
  })

  function scrollBottom () {
    $timeout(function () {
      var obj = document.querySelector('.message-page__messages');
      obj.scrollTop = obj.scrollHeight;
    })
  }
}])