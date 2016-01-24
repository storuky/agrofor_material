app.service('Ws',  ['$rootScope', '$location', 'Correspondence', 'Offer', 'Position', 'Counter', function ($rootScope, $location, Correspondence, Offer, Position, Counter) {
  var Ws = this;

  Ws.connect = function () {
    if (gon.current_user) {
      
      PrivatePub.sign(gon.channel);
      var stream = "/stream/" + gon.current_company.name + '/' + gon.current_user.id;
      console.log(stream)
      PrivatePub.subscribe(stream, function(data, channel) {
        if (data.message)
          ws_message(data.message)
        if (data.offer)
          ws_offer(data.offer)

        $rootScope.$apply();
      });

      var resetMessageCount = _.debounce(Correspondence.reset_counter, 1000),
          resetOffersCount = _.debounce(Offer.reset_counter, 1000)

      function ws_message (data) {
        var inCorrespondence = $location.search().id == data.correspondence_id && $location.path()=='/correspondences';
        if (inCorrespondence) {
          if (data.message_type && gon.current_user.id == data.user_id || gon.current_user.id != data.user_id || !window.isActive) {
            Correspondence.active.messages.push(data);
            resetMessageCount({id: data.correspondence_id});
          }
        } else {
          Counter.new_messages_count+=1;
        }
        if (Correspondence.correspondences) {
          var correspondence = _.find(Correspondence.correspondences, function (correspondence) {
            return correspondence.id == data.correspondence_id
          })
          correspondence.updated_at = new Date();
          correspondence.timestamp = (new Date()).getTime();
          if (!inCorrespondence) {
            correspondence.new_messages[gon.current_user.id].push(data.id)
          }
          correspondence.last_message = data.body;
        }
      }

      function ws_offer (data) {
        if ($location.path()=='/positions') {
          var position = _.findWhere(Position.positions, {id: data.id})
          if (position) {
            resetOffersCount();
            position.offers.push(data);
          }
        } else {
          Counter.new_offers_count+=1;
        }
      }

      window.isActive = true;
      
      window.onfocus = function () { 
        window.isActive = true; 
      }; 

      window.onblur = function () { 
        window.isActive = false; 
      }; 
    }

  }
}])