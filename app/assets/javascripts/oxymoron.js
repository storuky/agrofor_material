(function() {
  angular.module('oxymoron', ['ngNotify', 'ui.router', 'ngResource'])

  .config(['$httpProvider', '$locationProvider', '$stateProvider', function($httpProvider, $locationProvider, $stateProvider) {
    /*
     *  Set token for AngularJS ajax methods
    */
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest'
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').content;

    /*
     *  Enable HTML5 History API
    */
    $locationProvider.html5Mode(true).hashPrefix('!');

    /*
     *  $stateProvider Rails
    */

    var resolve = function (action) {
      return function (actionNames, callback) {
        try {
          var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];
          
          if (actionNames.indexOf(action)!=-1) {
            callback();
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    $stateProvider.rails = function () {
      $stateProvider
      
        .state('root_path', {
          url: '/',
          templateUrl: function(params) {
            return Routes['root_path'](params);
          },
          reloadOnSearch: false,
          controller: 'ApplicationCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('new_user_session_path', {
          url: '/users/sign_in',
          templateUrl: function(params) {
            return Routes['new_user_session_path'](params);
          },
          reloadOnSearch: false,
          controller: 'UsersSessionsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('new_user_password_path', {
          url: '/users/password/new',
          templateUrl: function(params) {
            return Routes['new_user_password_path'](params);
          },
          reloadOnSearch: false,
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_user_password_path', {
          url: '/users/password/edit',
          templateUrl: function(params) {
            return Routes['edit_user_password_path'](params);
          },
          reloadOnSearch: false,
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('cancel_user_registration_path', {
          url: '/users/cancel',
          templateUrl: function(params) {
            return Routes['cancel_user_registration_path'](params);
          },
          reloadOnSearch: false,
          controller: 'UsersRegistrationsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('cancel')
            }
          }
        })
      
        .state('new_user_registration_path', {
          url: '/users/sign_up',
          templateUrl: function(params) {
            return Routes['new_user_registration_path'](params);
          },
          reloadOnSearch: false,
          controller: 'UsersRegistrationsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_user_registration_path', {
          url: '/users/edit',
          templateUrl: function(params) {
            return Routes['edit_user_registration_path'](params);
          },
          reloadOnSearch: false,
          controller: 'UsersRegistrationsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('map_path', {
          url: '/search/map',
          templateUrl: function(params) {
            return Routes['map_path'](params);
          },
          reloadOnSearch: false,
          controller: 'SearchCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('map')
            }
          }
        })
      
        .state('list_path', {
          url: '/search/list',
          templateUrl: function(params) {
            return Routes['list_path'](params);
          },
          reloadOnSearch: false,
          controller: 'SearchCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('list')
            }
          }
        })
      
        .state('support_path', {
          url: '/support',
          templateUrl: function(params) {
            return Routes['support_path'](params);
          },
          reloadOnSearch: false,
          controller: 'SupportCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('help_path', {
          url: '/help',
          templateUrl: function(params) {
            return Routes['help_path'](params);
          },
          reloadOnSearch: false,
          controller: 'HelpCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('settings_path', {
          url: '/settings',
          templateUrl: function(params) {
            return Routes['settings_path'](params);
          },
          reloadOnSearch: false,
          controller: 'SettingsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('positions_path', {
          url: '/positions',
          templateUrl: function(params) {
            return Routes['positions_path'](params);
          },
          reloadOnSearch: false,
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('new_position_path', {
          url: '/positions/new',
          templateUrl: function(params) {
            return Routes['new_position_path'](params);
          },
          reloadOnSearch: false,
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_position_path', {
          url: '/positions/:id/edit',
          templateUrl: function(params) {
            return Routes['edit_position_path'](params);
          },
          reloadOnSearch: false,
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('position_path', {
          url: '/positions/:id',
          templateUrl: function(params) {
            return Routes['position_path'](params);
          },
          reloadOnSearch: false,
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('show')
            }
          }
        })
      
        .state('favorites_path', {
          url: '/favorites',
          templateUrl: function(params) {
            return Routes['favorites_path'](params);
          },
          reloadOnSearch: false,
          controller: 'FavoritesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('new_favorite_path', {
          url: '/favorites/new',
          templateUrl: function(params) {
            return Routes['new_favorite_path'](params);
          },
          reloadOnSearch: false,
          controller: 'FavoritesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_favorite_path', {
          url: '/favorites/:id/edit',
          templateUrl: function(params) {
            return Routes['edit_favorite_path'](params);
          },
          reloadOnSearch: false,
          controller: 'FavoritesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('favorite_path', {
          url: '/favorites/:id',
          templateUrl: function(params) {
            return Routes['favorite_path'](params);
          },
          reloadOnSearch: false,
          controller: 'FavoritesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('show')
            }
          }
        })
      
        .state('templates_path', {
          url: '/templates',
          templateUrl: function(params) {
            return Routes['templates_path'](params);
          },
          reloadOnSearch: false,
          controller: 'TemplatesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('new_template_path', {
          url: '/templates/new',
          templateUrl: function(params) {
            return Routes['new_template_path'](params);
          },
          reloadOnSearch: false,
          controller: 'TemplatesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_template_path', {
          url: '/templates/:id/edit',
          templateUrl: function(params) {
            return Routes['edit_template_path'](params);
          },
          reloadOnSearch: false,
          controller: 'TemplatesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('template_path', {
          url: '/templates/:id',
          templateUrl: function(params) {
            return Routes['template_path'](params);
          },
          reloadOnSearch: false,
          controller: 'TemplatesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('show')
            }
          }
        })
      
        .state('messages_path', {
          url: '/messages',
          templateUrl: function(params) {
            return Routes['messages_path'](params);
          },
          reloadOnSearch: false,
          controller: 'MessagesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('new_message_path', {
          url: '/messages/new',
          templateUrl: function(params) {
            return Routes['new_message_path'](params);
          },
          reloadOnSearch: false,
          controller: 'MessagesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_message_path', {
          url: '/messages/:id/edit',
          templateUrl: function(params) {
            return Routes['edit_message_path'](params);
          },
          reloadOnSearch: false,
          controller: 'MessagesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('message_path', {
          url: '/messages/:id',
          templateUrl: function(params) {
            return Routes['message_path'](params);
          },
          reloadOnSearch: false,
          controller: 'MessagesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('show')
            }
          }
        })
      
        .state('correspondences_path', {
          url: '/correspondences',
          templateUrl: function(params) {
            return Routes['correspondences_path'](params);
          },
          reloadOnSearch: false,
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('new_correspondence_path', {
          url: '/correspondences/new',
          templateUrl: function(params) {
            return Routes['new_correspondence_path'](params);
          },
          reloadOnSearch: false,
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_correspondence_path', {
          url: '/correspondences/:id/edit',
          templateUrl: function(params) {
            return Routes['edit_correspondence_path'](params);
          },
          reloadOnSearch: false,
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('correspondence_path', {
          url: '/correspondences/:id',
          templateUrl: function(params) {
            return Routes['correspondence_path'](params);
          },
          reloadOnSearch: false,
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('show')
            }
          }
        })
      
        .state('offers_path', {
          url: '/offers',
          templateUrl: function(params) {
            return Routes['offers_path'](params);
          },
          reloadOnSearch: false,
          controller: 'OffersCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('new_offer_path', {
          url: '/offers/new',
          templateUrl: function(params) {
            return Routes['new_offer_path'](params);
          },
          reloadOnSearch: false,
          controller: 'OffersCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_offer_path', {
          url: '/offers/:id/edit',
          templateUrl: function(params) {
            return Routes['edit_offer_path'](params);
          },
          reloadOnSearch: false,
          controller: 'OffersCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('offer_path', {
          url: '/offers/:id',
          templateUrl: function(params) {
            return Routes['offer_path'](params);
          },
          reloadOnSearch: false,
          controller: 'OffersCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('show')
            }
          }
        })
      
        .state('profile_index_path', {
          url: '/profile',
          templateUrl: function(params) {
            return Routes['profile_index_path'](params);
          },
          reloadOnSearch: false,
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('new_profile_path', {
          url: '/profile/new',
          templateUrl: function(params) {
            return Routes['new_profile_path'](params);
          },
          reloadOnSearch: false,
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('new')
            }
          }
        })
      
        .state('edit_profile_path', {
          url: '/profile/:id/edit',
          templateUrl: function(params) {
            return Routes['edit_profile_path'](params);
          },
          reloadOnSearch: false,
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('edit')
            }
          }
        })
      
        .state('profile_path', {
          url: '/profile/:id',
          templateUrl: function(params) {
            return Routes['profile_path'](params);
          },
          reloadOnSearch: false,
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('show')
            }
          }
        })
      
        .state('rails_info_properties_path', {
          url: '/rails/info/properties',
          templateUrl: function(params) {
            return Routes['rails_info_properties_path'](params);
          },
          reloadOnSearch: false,
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('properties')
            }
          }
        })
      
        .state('rails_info_routes_path', {
          url: '/rails/info/routes',
          templateUrl: function(params) {
            return Routes['rails_info_routes_path'](params);
          },
          reloadOnSearch: false,
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('routes')
            }
          }
        })
      
        .state('rails_info_path', {
          url: '/rails/info',
          templateUrl: function(params) {
            return Routes['rails_info_path'](params);
          },
          reloadOnSearch: false,
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
        .state('rails_mailers_path', {
          url: '/rails/mailers',
          templateUrl: function(params) {
            return Routes['rails_mailers_path'](params);
          },
          reloadOnSearch: false,
          controller: 'RailsMailersCtrl as ctrl',
          resolve: {
            action: function () {
              return resolve('index')
            }
          }
        })
      
      return $stateProvider;
    }
  }])

  .config(['$provide',
    function($provide) {
      $provide.decorator('$state', ['$delegate', function($delegate) {
        var state = $delegate;
        state.baseGo = state.go;

        var go = function(to, params, options) {
          if (state.defaultParams) {
            var defaultParams = angular.copy(state.defaultParams);
            params = angular.extend(defaultParams, params);
          }

          state.baseGo(to, params, options);
        };
        state.go = go;

        return $delegate;
      }]);
    }
  ])

  .run(['$rootScope', 'ngNotify', 'Validate', '$state', function ($rootScope, ngNotify, Validate, $state) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info'
    });

    $rootScope.$on('loading:finish', function (h, res) {
      if (res.data && res.data.msg) {
        ngNotify.set(res.data.msg, 'success');
      }

      if (res.data.redirect_to) {
        $state.go(res.data.redirect_to, res.data.redirect_options || {})
      }
    })

    $rootScope.$on('loading:error', function (h, res, p) {
      if (angular.isObject(res.data)) {
        if (res.data.msg)
          ngNotify.set(res.data.msg, 'error');
        if (res.data.errors) {
          Validate(res.data.form_name || res.config.data.form_name, res.data.errors)
        }

        if (res.data.redirect_to) {
          $state.go(res.data.redirect_to)
        }
      } else {
        if (res.status == -1) {
          ngNotify.set("Сервер не отвечает", 'error');
        } else {
          ngNotify.set(res.statusText, 'error');
        }
      }
    })
  }])

  /*
  * Services and factories
  */
  window.Resources = {}

  angular.module('oxymoron').factory('resourceDecorator', [function () {
    return function(resource) {
      return resource;
    };
  }]);

  
    Resources['Position'] = {"new":{"method":"GET","url":"/positions/:id/new.json"},"edit":{"method":"GET","url":"/positions/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Position', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/positions/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/positions/:id/new.json"},"edit":{"method":"GET","url":"/positions/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Favorite'] = {"new":{"method":"GET","url":"/favorites/:id/new.json"},"edit":{"method":"GET","url":"/favorites/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Favorite', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/favorites/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/favorites/:id/new.json"},"edit":{"method":"GET","url":"/favorites/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Template'] = {"new":{"method":"GET","url":"/templates/:id/new.json"},"edit":{"method":"GET","url":"/templates/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Template', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/templates/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/templates/:id/new.json"},"edit":{"method":"GET","url":"/templates/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Message'] = {"new":{"method":"GET","url":"/messages/:id/new.json"},"edit":{"method":"GET","url":"/messages/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Message', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/messages/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/messages/:id/new.json"},"edit":{"method":"GET","url":"/messages/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Correspondence'] = {"new":{"method":"GET","url":"/correspondences/:id/new.json"},"edit":{"method":"GET","url":"/correspondences/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Correspondence', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/correspondences/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/correspondences/:id/new.json"},"edit":{"method":"GET","url":"/correspondences/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Offer'] = {"new":{"method":"GET","url":"/offers/:id/new.json"},"edit":{"method":"GET","url":"/offers/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Offer', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/offers/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/offers/:id/new.json"},"edit":{"method":"GET","url":"/offers/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Profile'] = {"new":{"method":"GET","url":"/profile/:id/new.json"},"edit":{"method":"GET","url":"/profile/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Profile', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/profile/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/profile/:id/new.json"},"edit":{"method":"GET","url":"/profile/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  

  angular.module('oxymoron').factory('httpInterceptor', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    return {
      request: function (config) {
        $rootScope.$broadcast('loading:progress');
        return config || $q.when(config);
      },
      response: function (response) {
        $rootScope.$broadcast('loading:finish', response);
        return response || $q.when(response);
      },
      responseError: function (response) {
        $rootScope.$broadcast('loading:error', response);
        return $q.reject(response);
      }
    };
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }])

  .factory('Validate', [function(){
    return function (form, errors){
      var $form = angular.element(document.querySelector('[name="'+form+'"]')).scope()[form];

      angular
        .element(document.querySelectorAll('.rails-errors')).remove();

      angular.forEach($form, function(ctrl, name) {
        if (name.indexOf('$') != 0) {
          angular.forEach(ctrl.$error, function(value, name) {
            ctrl.$setValidity(name, null);
          });
        }
      });


      angular.forEach(errors, function(errors_array, key) {
        var form_key = form+'['+key+']';
        try {
          if ($form[form_key]) {
            $form[form_key].$setTouched();
            $form[form_key].$setDirty();
            $form[form_key].$setValidity('server', false);
          }
          
          angular
            .element(document.querySelector('[name="'+form_key+'"]'))
            .parent()
            .append('<div class="rails-errors" ng-messages="'+form_key+'.$error"><div ng-message="server">'+errors_array[0]+'</div></div>')
        } catch(e) {
          console.log(e)
          console.warn('Element with name ' + form_key + ' not found for validation.')
        }
      });
    };
  }])

  .service('Sign', ['$http', function ($http) {
    var Sign = this;

    Sign.out = function () {
      $http.delete(Routes.destroy_user_session_path())
        .success(function () {
          window.location = "/";
        })
    }

    Sign.in = function (form) {
      $http.post(Routes.user_session_path(), {user: form})
        .success(function () {
          window.location.reload();
        })
    }

    Sign.up = function (form) {
      $http.post(Routes.user_registration_path(), {user: form})
        .success(function () {
          window.location.reload();
        })
    }
  }])

  /*
  *  Directives
  */

  .directive('clickOutside', ['$document', function ($document) {
    return {
      restrict: 'A',
      scope: {
        clickOutside: '&'
      },
      link: function (scope, el, attr) {
        var handler = function (e) {
          if (el !== e.target && !el[0].contains(e.target) && document.body.contains(e.target)) {
            scope.$apply(function () {
                scope.$eval(scope.clickOutside);
            });
          }
        }

        $document.bind('click', handler);

        scope.$on('$destroy', function () {
          $document.unbind('click', handler)
        })
      }
    }
  }])

  .directive('fileupload', ['$http', function ($http) {
    return {
      scope: {
        fileupload: "=",
        ngModel: "=ngModel"
      },
      restrict: 'A',
      link: function($scope, element, attrs) {  

        element.bind('change', function(){
          var fd = new FormData();

          angular.forEach(element[0].files, function (file) {
            fd.append("attachments[]", file);
          })

          $http.post($scope.fileupload, fd, {headers: {'Content-Type': undefined}})
            .success(function (res) {
              if (attrs.multiple) {
                $scope.ngModel = $scope.ngModel || [];
                angular.forEach(res, function (attachment) {
                  $scope.ngModel.push(attachment);
                });
              } else {
                $scope.ngModel = res[0];
              }
            })

          element[0].value = '';
        });
      }
    };
  }])
}).call(this);

(function () {
  var Routes = function () {
    var self = this,
        routes = {"root":"/","new_user_session":"/users/sign_in","user_session":"/users/sign_in","destroy_user_session":"/users/sign_out","user_password":"/users/password","new_user_password":"/users/password/new","edit_user_password":"/users/password/edit","cancel_user_registration":"/users/cancel","user_registration":"/users","new_user_registration":"/users/sign_up","edit_user_registration":"/users/edit","map":"/search/map","list":"/search/list","support":"/support","help":"/help","settings":"/settings","positions":"/positions","new_position":"/positions/new","edit_position":"/positions/:id/edit","position":"/positions/:id","favorites":"/favorites","new_favorite":"/favorites/new","edit_favorite":"/favorites/:id/edit","favorite":"/favorites/:id","templates":"/templates","new_template":"/templates/new","edit_template":"/templates/:id/edit","template":"/templates/:id","messages":"/messages","new_message":"/messages/new","edit_message":"/messages/:id/edit","message":"/messages/:id","correspondences":"/correspondences","new_correspondence":"/correspondences/new","edit_correspondence":"/correspondences/:id/edit","correspondence":"/correspondences/:id","offers":"/offers","new_offer":"/offers/new","edit_offer":"/offers/:id/edit","offer":"/offers/:id","profile_index":"/profile","new_profile":"/profile/new","edit_profile":"/profile/:id/edit","profile":"/profile/:id","rails_info_properties":"/rails/info/properties","rails_info_routes":"/rails/info/routes","rails_info":"/rails/info","rails_mailers":"/rails/mailers"};

    self.defaultParams = {}

    var serialize = function(obj, prefix) {
      var str = [];
      for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(typeof v == "object" ?
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }

    var omit = function (hash, key) {
      var hash = angular.copy(hash);
      delete hash[key]
      return hash
    }


    angular.forEach(routes, function (val, key) {
      var result = '';

      var gsub = function(params) {
        if (params.format) {
          result += '.' + params.format
        }

        var params = omit(params, 'format');
        angular.forEach(params, function (v, k) {
          var subst = ':' + k;
          if (result.search(subst) != -1) {
            result = result.replace(subst, v);
            params = omit(params, k);
          }
        })
        
        if (Object.keys(params).length)
          result += '?'+serialize(params)

        return result;
      }

      self[key+'_path'] = function (params) {
        var params = params || {};
        result = val;
        var defaultParams = angular.copy(self.defaultParams);
        return gsub(angular.extend(defaultParams, params));
      }
    })
  }

  window.Routes = new Routes();

}).call(this)