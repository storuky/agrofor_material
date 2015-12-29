app.service('Map', ['pluralize', '$location', 'Position', function (pluralize, $location, Position) {
  var Map = this;

  ymaps.ready(function () {
    registerFilters();
    registerTemplates();
  })

  Map.measure = function (lat1, lon1, lat2, lon2) {
    var r = 6378137,
        dLat = (lat2 - lat1) * Math.PI / 180,
        dLon = (lon2 - lon1) * Math.PI / 180;

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return r * c
  }


  var registerFilters = function () {
    ymaps.template.filtersStorage.add('position_pluralize', function (data, count, filterValue) {
      return pluralize(count, ["позиция", "позиции", "позиций"]);
    });
  }

  var registerTemplates = function () {
      Map.markerLayout = ymaps.templateLayoutFactory.createClass(
        "<a class='marker-label'>"
            + "<div class='marker-label__head'>{{ properties.trade_type }} {{ properties.weight }} {{ properties.weight_dimension }}, {{ properties.price }} {{ properties.currency }}/{{ properties.price_weight_dimension }}</div>"
            + "<div class='marker-label__body'>{{ properties.title }}</div>"
        + "</a>",
        {
          build: function () {
            Map.markerLayout.superclass.build.call(this);
            this._events = ymaps.domEvent.manager.group(this.getElement());
            this._events.add('click', function (event) {
              var id = this.getData().properties.get('id');
              if (id) {
                Position.openModal(id);
              }
            }, this);
          },
          
          clear: function () {
            this._events.removeAll();
            Map.markerLayout.superclass.clear.call(this);
          }
        }
      );

      Map.clustererLayout = ymaps.templateLayoutFactory.createClass(
        "<div class='marker-label cluster cluster__{{properties.geoObjects.length | marker_color}}'>"
            + "<div class='marker-label__body'>{{properties.geoObjects.length}} {{properties.geoObjects.length | position_pluralize}}</div>"
        + "</div>", {
        build: function () {
          Map.clustererLayout.superclass.build.call(this);
          
          this._parentElement.querySelector('.cluster').click = function (event) {
            alert(1);
            event.stopPropagation();
          }
        },
        getShape: function () {
          if (!this.getParentElement()) return null;
          var width = this.getParentElement().querySelector('.marker-label__body').offsetWidth;


          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([[0, -14], [width, 11]]));
        }
      });
    }

}])