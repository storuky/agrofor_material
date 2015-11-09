app.service('Cache', [function () {
  var Cache = this;

  angular.extend(Cache, store.get('cache'))

  Cache.set = function (name, data) {
    if (!Cache[name] || JSON.stringify(data) != JSON.stringify(Cache.positions)) {
      Cache[name] = data;

      var cache = {};
      cache[name] = data;
      store.set('cache', cache)
    }
  }
}])