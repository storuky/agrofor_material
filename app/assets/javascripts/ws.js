app.run(['$rootScope', '$location', 'Correspondence', function ($rootScope, $location, Correspondence) {
  if (gon.current_user) {
    PrivatePub.sign(gon.current_user.channel);
    
    PrivatePub.subscribe("/stream/" + gon.current_user.id, function(data, channel) {
      if ($location.search().id == data.correspondence_id && $location.path()=='/correspondences') {
        Correspondence.active.messages.push(data)
      } else {
        gon.current_user.counters.new_messages_count+=1;

        var correspondence = _.find(Correspondence.correspondences, function (correspondence) {
          return correspondence.id == data.correspondence_id
        })
        correspondence.updated_at = new Date();
        correspondence.timestamp = (new Date()).getTime();
        correspondence.new_messages[gon.current_user.id].push(data.id)
      }

      $rootScope.$apply();
    });
  }
}])