app.controller('CorrespondencesCtrl', ['$scope', 'action', '$state', '$timeout', 'Correspondence', '$location', function ($scope, action, $state, $timeout, Correspondence, $location) {
  var ctrl = this;

  action('index', function () {
    if (!gon.current_user) {
      $state.go('map_path');
      Sign.isShow = true;
    }

    ctrl.filter = {
      type: 'CorrespondencePosition'
    }

    $scope.Correspondence = Correspondence;


    Correspondence.query(function (res) {
      Correspondence.correspondences = res;
      setContact();
    });

    $scope.$watch(function () {
      return $location.search().id
    }, function (id) {
      if (id) {
        ctrl.form = {}
        Correspondence.active = Correspondence.get({id: id});
        setContact();
      }
    })

    $scope.$watch('Correspondence.active.messages', function (messages) {
      if (messages)
        scrollBottom()
    }, true)

    $scope.send = function () {
      if (ctrl.form.body.length) {
        ctrl.contact.last_message = ctrl.form.body;
        ctrl.contact.updated_at = new Date();
        ctrl.contact.timestamp = (new Date()).getTime();

        Correspondence.send_message({id: ctrl.contact.id, body: ctrl.form.body, document_ids: _.pluck(ctrl.form.documents, "id")})
        Correspondence.active.messages.push({
          correspondence_id: ctrl.contact.id,
          body: ctrl.form.body,
          user_id: gon.current_user.id,
          created_at: new Date(),
          documents: ctrl.form.documents
        })
        ctrl.form = {};
      }
    }

    $scope.opponent_user = function (users) {
      var user = _.find(users, function (user) {
        return user.id != gon.current_user.id
      })

      return user
    }

    $scope.opponent_position = function (positions) {
      return _.find(positions, function (position) {
        return position.user_id != gon.current_user.id
      });
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

    function setContact () {
      if ($location.search().id) {
        ctrl.contact = _.find(Correspondence.correspondences, function (corr) {
          return corr.id == $location.search().id
        });

        if (!ctrl.contact) {
          ctrl.contact = Correspondence.active;
          if (Correspondence.correspondences && ctrl.contact) {
            Correspondence.correspondences.push(ctrl.contact)
          }

        }
        ctrl.filter = {
          type: ctrl.contact.type
        }

        $timeout(function () {
          gon.current_user.counters.new_messages_count -= ctrl.contact.new_messages[gon.current_user.id].length;
          ctrl.contact.new_messages[gon.current_user.id] = []
        }, 500)
      }
    }
  })

  function scrollBottom () {
    $timeout(function () {
      var obj = document.querySelector('.message-page__messages');
      obj.scrollTop = obj.scrollHeight;
    })
  }
}])