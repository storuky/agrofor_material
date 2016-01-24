app.controller('CorrespondencesCtrl', ['$scope', 'action', '$state', '$timeout', 'Correspondence', '$location', 'Counter', 'Action', 'Position', function ($scope, action, $state, $timeout, Correspondence, $location, Counter, Action, Position) {
  var ctrl = this;

  action('index', function () {
    ctrl.filter = {
      type: 'CorrespondencePosition'
    }

    $scope.Correspondence = Correspondence;


    Correspondence.query(function (res) {
      Correspondence.correspondences = res;
      setContact();
    });

    $scope.$watch(function () {
      return Correspondence.correspondences
    }, function (correspondences) {
      if (correspondences)
        updateTabCount();
    }, true)

    $scope.$watch(function () {
      return $location.search().id
    }, function (id) {
      if (id && $location.path()=='/correspondences') {
        ctrl.form = {}
        Correspondence.active = Correspondence.get({id: id}, function (res) {
          if (res.positions.length) {
            $scope.positions = {
              my: _.findWhere(res.positions, {user_id: gon.current_user.id}),
              user: _.find(res.positions, function (position) {
                return position.user_id != gon.current_user.id
              })
            }
          } else {
            $scope.positions = undefined;
          }
          setContact();
          updateTabCount();
        });

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

  $scope.confirmMakeDeal = function () {
    Action.confirm("Вы уверены, что хотите заключить сделку? Действие не может быть отменено без участия администратора.", function (res) {
      if (res) {
        Position.make_deal({id: $scope.positions.my.id, offer_id: $scope.positions.user.id}, function (res) {
          $scope.positions.my = res.my;
          $scope.positions.user = res.user;
          Correspondence.active.deal = res.deal;
        })
      }
    })
  }

  $scope.confirmShipping = function () {
    Action.confirm("Требуется подтверждение действия", function (res) {
      if (res) {
        Position.shipping({id: $scope.positions.my.id}, function (res) {
          Correspondence.active.deal = res.deal;
        })
      }
    })
  }

  $scope.confirmReceiving = function () {
    Action.confirm("Требуется подтверждение действия", function (res) {
      if (res) {
        Position.receiving({id: $scope.positions.my.id}, function (res) {
          $scope.positions.my = res.my;
          $scope.positions.user = res.user;
          Correspondence.active.deal = res.deal;
        })
      }
    })
  }

  function setContact () {
    var id = parseInt($location.search().id);
    if (id) {
      ctrl.contact = _.findWhere(Correspondence.correspondences, {id: id});

      if (!ctrl.contact) {
        ctrl.contact = Correspondence.active;
        if (Correspondence.correspondences && ctrl.contact) {
          Correspondence.correspondences.push(ctrl.contact)
        }
      }

      ctrl.filter = {
        type: ctrl.contact.type
      }

      if (ctrl.contact.new_messages) {
        var count = Counter.new_messages - ctrl.contact.new_messages[gon.current_user.id].length;
        if (count < 0)
          count = 0;
        Counter.new_messages_count = 0;
        ctrl.contact.new_messages[gon.current_user.id] = []
      }
    }
  }

  function updateTabCount () {
    ctrl.CorrespondencePositionCount = calculateTabCount('CorrespondencePosition');
    ctrl.CorrespondenceUserCount = calculateTabCount('CorrespondenceUser');
  }

  function calculateTabCount (type) {
    return _.reduce(Correspondence.correspondences, function (memo, correspondence) {
      if (correspondence.type == type)
        return memo + correspondence.new_messages[gon.current_user.id].length
      else
        return memo
    }, 0)
  }

  function scrollBottom () {
    $timeout(function () {
      var obj = document.querySelector('.message-page__messages__wrapper');
      obj.scrollTop = obj.scrollHeight;
    })
  }
}])