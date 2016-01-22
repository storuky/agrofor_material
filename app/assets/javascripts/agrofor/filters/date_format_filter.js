app.filter('dateFormat', ['pluralize', '$filter', function (pluralize, $filter) {
    return function(date) {

      function days_between(date1, date2) {
        var ONE_DAY = 1000 * 60 * 60 * 24
        var date1_ms = date1.getTime()
        var date2_ms = date2.getTime()
        var difference_ms = Math.abs(date1_ms - date2_ms)
        return Math.round(difference_ms/ONE_DAY)
      }

      var date = new Date(date),
          today = new Date(),
          yesterday = new Date(new Date().setDate(new Date().getDate() - 1)),
          res;

      if (date.toDateString() == today.toDateString()) {
        res = ""
      } else if (date.toDateString() == yesterday.toDateString()) {
        res = "вчера"
      } else {
        res = days_between(date, today) + " " + pluralize(days_between(date, today), ['день', 'дня', 'дней']) + " назад"
      }
      return res + " в " + $filter('date')(date, 'HH:mm')
    };
}]);