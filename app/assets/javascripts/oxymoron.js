(function() {
  angular.module('oxymoron', ['ngNotify', 'ui.router', 'ngResource'])

  .config(['$httpProvider', '$locationProvider', '$stateProvider', function($httpProvider, $locationProvider, $stateProvider) {
    /*
     *  Set token for AngularJS ajax methods
    */
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest'
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';

    /*
     *  Enable HTML5 History API
    */
    $locationProvider.html5Mode(true).hashPrefix('!');

    /*
     *  $stateProvider Rails
    */

    var resolve = function (action, $stateParams) {
      return function (actionNames, callback) {
        try {
          var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];
          
          if (actionNames.indexOf(action)!=-1) {
            callback($stateParams);
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
            params['ng-view']='';
            
            return Routes['root_path'](params);
          },
          controller: 'ApplicationCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_user_session_path', {
          url: '/users/sign_in',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_user_session_path'](params);
          },
          controller: 'UsersSessionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('new_user_password_path', {
          url: '/users/password/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_user_password_path'](params);
          },
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_password_path', {
          url: '/users/password/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_user_password_path'](params);
          },
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('cancel_user_registration_path', {
          url: '/users/cancel',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['cancel_user_registration_path'](params);
          },
          controller: 'UsersRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('cancel', $stateParams)
            }]
          }
        })
      
        .state('new_user_registration_path', {
          url: '/users/sign_up',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_user_registration_path'](params);
          },
          controller: 'UsersRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_registration_path', {
          url: '/users/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_user_registration_path'](params);
          },
          controller: 'UsersRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('map_path', {
          url: '/search/map',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['map_path'](params);
          },
          controller: 'SearchCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('map', $stateParams)
            }]
          }
        })
      
        .state('list_path', {
          url: '/search/list',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['list_path'](params);
          },
          controller: 'SearchCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('list', $stateParams)
            }]
          }
        })
      
        .state('between_positions_path', {
          url: '/correspondences/between_positions',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['between_positions_path'](params);
          },
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('between_positions', $stateParams)
            }]
          }
        })
      
        .state('translations_path', {
          url: '/translations',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['translations_path'](params);
          },
          controller: 'ApplicationCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('translations', $stateParams)
            }]
          }
        })
      
        .state('user_currency_path', {
          url: '/user_currency',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['user_currency_path'](params);
          },
          controller: 'ApplicationCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('user_currency', $stateParams)
            }]
          }
        })
      
        .state('counters_path', {
          url: '/counters',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['counters_path'](params);
          },
          controller: 'ApplicationCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('counters', $stateParams)
            }]
          }
        })
      
        .state('analytics_path', {
          url: '/analytics',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['analytics_path'](params);
          },
          controller: 'AnalyticsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('support_path', {
          url: '/support',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['support_path'](params);
          },
          controller: 'SupportCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('help_path', {
          url: '/help',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['help_path'](params);
          },
          controller: 'HelpCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('settings_path', {
          url: '/settings',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['settings_path'](params);
          },
          controller: 'SettingsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('images_path', {
          url: '/images',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['images_path'](params);
          },
          controller: 'ImagesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_image_path', {
          url: '/images/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_image_path'](params);
          },
          controller: 'ImagesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_image_path', {
          url: '/images/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_image_path'](params);
          },
          controller: 'ImagesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('image_path', {
          url: '/images/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['image_path'](params);
          },
          controller: 'ImagesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('documents_path', {
          url: '/documents',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['documents_path'](params);
          },
          controller: 'DocumentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_document_path', {
          url: '/documents/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_document_path'](params);
          },
          controller: 'DocumentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_document_path', {
          url: '/documents/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_document_path'](params);
          },
          controller: 'DocumentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('document_path', {
          url: '/documents/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['document_path'](params);
          },
          controller: 'DocumentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('files_path', {
          url: '/files',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['files_path'](params);
          },
          controller: 'FilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_file_path', {
          url: '/files/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_file_path'](params);
          },
          controller: 'FilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_file_path', {
          url: '/files/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_file_path'](params);
          },
          controller: 'FilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('file_path', {
          url: '/files/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['file_path'](params);
          },
          controller: 'FilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('positions_path', {
          url: '/positions',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['positions_path'](params);
          },
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_position_path', {
          url: '/positions/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_position_path'](params);
          },
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_position_path', {
          url: '/positions/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_position_path'](params);
          },
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('position_path', {
          url: '/positions/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['position_path'](params);
          },
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('offers_path', {
          url: '/offers',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['offers_path'](params);
          },
          controller: 'OffersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_offer_path', {
          url: '/offers/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_offer_path'](params);
          },
          controller: 'OffersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_offer_path', {
          url: '/offers/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_offer_path'](params);
          },
          controller: 'OffersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('offer_path', {
          url: '/offers/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['offer_path'](params);
          },
          controller: 'OffersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('favorites_path', {
          url: '/favorites',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['favorites_path'](params);
          },
          controller: 'FavoritesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_favorite_path', {
          url: '/favorites/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_favorite_path'](params);
          },
          controller: 'FavoritesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_favorite_path', {
          url: '/favorites/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_favorite_path'](params);
          },
          controller: 'FavoritesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('favorite_path', {
          url: '/favorites/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['favorite_path'](params);
          },
          controller: 'FavoritesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('templates_path', {
          url: '/templates',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['templates_path'](params);
          },
          controller: 'TemplatesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_template_path', {
          url: '/templates/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_template_path'](params);
          },
          controller: 'TemplatesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_template_path', {
          url: '/templates/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_template_path'](params);
          },
          controller: 'TemplatesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('template_path', {
          url: '/templates/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['template_path'](params);
          },
          controller: 'TemplatesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('correspondences_path', {
          url: '/correspondences',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['correspondences_path'](params);
          },
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_correspondence_path', {
          url: '/correspondences/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_correspondence_path'](params);
          },
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_correspondence_path', {
          url: '/correspondences/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_correspondence_path'](params);
          },
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('correspondence_path', {
          url: '/correspondences/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['correspondence_path'](params);
          },
          controller: 'CorrespondencesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('positions_profile_path', {
          url: '/profile/:id/positions',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['positions_profile_path'](params);
          },
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('positions', $stateParams)
            }]
          }
        })
      
        .state('feedbacks_profile_path', {
          url: '/profile/:id/feedbacks',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['feedbacks_profile_path'](params);
          },
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('feedbacks', $stateParams)
            }]
          }
        })
      
        .state('profile_index_path', {
          url: '/profile',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['profile_index_path'](params);
          },
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_profile_path', {
          url: '/profile/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_profile_path'](params);
          },
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_profile_path', {
          url: '/profile/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_profile_path'](params);
          },
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('profile_path', {
          url: '/profile/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['profile_path'](params);
          },
          controller: 'ProfileCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('users_path', {
          url: '/users',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['users_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_user_path', {
          url: '/users/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['new_user_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_path', {
          url: '/users/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['edit_user_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('user_path', {
          url: '/users/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['user_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('suitable_position_path', {
          url: '/positions/:id/suitable',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['suitable_position_path'](params);
          },
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('suitable', $stateParams)
            }]
          }
        })
      
        .state('offers_position_path', {
          url: '/positions/:id/offers',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['offers_position_path'](params);
          },
          controller: 'PositionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('offers', $stateParams)
            }]
          }
        })
      
        .state('rails_info_properties_path', {
          url: '/rails/info/properties',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['rails_info_properties_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('properties', $stateParams)
            }]
          }
        })
      
        .state('rails_info_routes_path', {
          url: '/rails/info/routes',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['rails_info_routes_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('routes', $stateParams)
            }]
          }
        })
      
        .state('rails_info_path', {
          url: '/rails/info',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['rails_info_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('rails_mailers_path', {
          url: '/rails/mailers',
          templateUrl: function(params) {
            params['ng-view']='';
            
            return Routes['rails_mailers_path'](params);
          },
          controller: 'RailsMailersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
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

  .run(['$rootScope', 'ngNotify', 'Validate', '$state', '$http', function ($rootScope, ngNotify, Validate, $state, $http) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info'
    });

    $rootScope.$on('loading:finish', function (h, res) {
      if (res.headers()['x-csrf-token']) {
        $http.defaults.headers.common['X-CSRF-Token'] = res.headers()['x-csrf-token'];
      }

      if (res.data && res.data.msg) {
        ngNotify.set(res.data.msg, 'success');
      }

      if (res.data && res.data.redirect_to) {
        $state.go(res.data.redirect_to, res.data.redirect_options || {})
      }
    })

    $rootScope.$on('loading:error', function (h, res, p) {
      if (angular.isObject(res.data)) {
        if (res.data.msg) {
          ngNotify.set(res.data.msg, 'error');
        }
        if (res.data.errors) {
          Validate(res.data.form_name || res.config.data.form_name, res.data.errors)
        }
        if (res.data && res.data.redirect_to) {
          $state.go(res.data.redirect_to)
        }
      } else {
        if ([-1, 304].indexOf(res.status) == -1) {
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

  
    Resources['Image'] = {"new":{"method":"GET","url":"/images/:id/new.json"},"edit":{"method":"GET","url":"/images/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"avatar":{"url":"/images/avatar.json","isArray":null,"method":"POST"}};
    angular.module('oxymoron').factory('Image', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/images/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/images/:id/new.json"},"edit":{"method":"GET","url":"/images/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"avatar":{"url":"/images/avatar.json","isArray":null,"method":"POST"}}));
    }])
  
    Resources['Document'] = {"new":{"method":"GET","url":"/documents/:id/new.json"},"edit":{"method":"GET","url":"/documents/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Document', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/documents/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/documents/:id/new.json"},"edit":{"method":"GET","url":"/documents/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['File'] = {"new":{"method":"GET","url":"/files/:id/new.json"},"edit":{"method":"GET","url":"/files/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('File', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/files/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/files/:id/new.json"},"edit":{"method":"GET","url":"/files/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Position'] = {"new":{"method":"GET","url":"/positions/:id/new.json"},"edit":{"method":"GET","url":"/positions/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"suitable":{"url":"/positions/:id/suitable.json","isArray":true,"method":"GET"},"offers":{"url":"/positions/:id/offers.json","isArray":true,"method":"GET"},"send_offer":{"url":"/positions/:id/send_offer.json","isArray":null,"method":"PUT"},"toggle_favorite":{"url":"/positions/:id/toggle_favorite.json","isArray":true,"method":"PUT"},"make_deal":{"url":"/positions/:id/make_deal.json","isArray":null,"method":"PUT"},"shipping":{"url":"/positions/:id/shipping.json","isArray":null,"method":"PUT"},"receiving":{"url":"/positions/:id/receiving.json","isArray":null,"method":"PUT"}};
    angular.module('oxymoron').factory('Position', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/positions/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/positions/:id/new.json"},"edit":{"method":"GET","url":"/positions/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"suitable":{"url":"/positions/:id/suitable.json","isArray":true,"method":"GET"},"offers":{"url":"/positions/:id/offers.json","isArray":true,"method":"GET"},"send_offer":{"url":"/positions/:id/send_offer.json","isArray":null,"method":"PUT"},"toggle_favorite":{"url":"/positions/:id/toggle_favorite.json","isArray":true,"method":"PUT"},"make_deal":{"url":"/positions/:id/make_deal.json","isArray":null,"method":"PUT"},"shipping":{"url":"/positions/:id/shipping.json","isArray":null,"method":"PUT"},"receiving":{"url":"/positions/:id/receiving.json","isArray":null,"method":"PUT"}}));
    }])
  
    Resources['Offer'] = {"new":{"method":"GET","url":"/offers/:id/new.json"},"edit":{"method":"GET","url":"/offers/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"reset_counter":{"url":"/offers/reset_counter.json","isArray":null,"method":"DELETE"}};
    angular.module('oxymoron').factory('Offer', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/offers/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/offers/:id/new.json"},"edit":{"method":"GET","url":"/offers/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"reset_counter":{"url":"/offers/reset_counter.json","isArray":null,"method":"DELETE"}}));
    }])
  
    Resources['Favorite'] = {"new":{"method":"GET","url":"/favorites/:id/new.json"},"edit":{"method":"GET","url":"/favorites/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Favorite', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/favorites/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/favorites/:id/new.json"},"edit":{"method":"GET","url":"/favorites/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Template'] = {"new":{"method":"GET","url":"/templates/:id/new.json"},"edit":{"method":"GET","url":"/templates/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('Template', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/templates/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/templates/:id/new.json"},"edit":{"method":"GET","url":"/templates/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    Resources['Correspondence'] = {"new":{"method":"GET","url":"/correspondences/:id/new.json"},"edit":{"method":"GET","url":"/correspondences/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"between_positions":{"url":"/correspondences/between_positions.json","isArray":null,"method":"GET"},"reset_counter":{"url":"/correspondences/reset_counter.json","isArray":null,"method":"DELETE"},"send_message":{"url":"/correspondences/:id/send_message.json","isArray":null,"method":"POST"}};
    angular.module('oxymoron').factory('Correspondence', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/correspondences/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/correspondences/:id/new.json"},"edit":{"method":"GET","url":"/correspondences/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"between_positions":{"url":"/correspondences/between_positions.json","isArray":null,"method":"GET"},"reset_counter":{"url":"/correspondences/reset_counter.json","isArray":null,"method":"DELETE"},"send_message":{"url":"/correspondences/:id/send_message.json","isArray":null,"method":"POST"}}));
    }])
  
    Resources['Profile'] = {"new":{"method":"GET","url":"/profile/:id/new.json"},"edit":{"method":"GET","url":"/profile/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"positions":{"url":"/profile/:id/positions.json","isArray":null,"method":"GET"},"feedbacks":{"url":"/profile/:id/feedbacks.json","isArray":true,"method":"GET"}};
    angular.module('oxymoron').factory('Profile', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/profile/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/profile/:id/new.json"},"edit":{"method":"GET","url":"/profile/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"},"positions":{"url":"/profile/:id/positions.json","isArray":null,"method":"GET"},"feedbacks":{"url":"/profile/:id/feedbacks.json","isArray":true,"method":"GET"}}));
    }])
  
    Resources['User'] = {"new":{"method":"GET","url":"/users/:id/new.json"},"edit":{"method":"GET","url":"/users/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}};
    angular.module('oxymoron').factory('User', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/users/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/users/:id/new.json"},"edit":{"method":"GET","url":"/users/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
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

  .directive("contentFor", [
    "$compile", function($compile) {
      return {
        compile: function(el, attrs, transclude) {
          var template = el.html();

          return {
            pre: function(scope, iElement, iAttrs, controller) {
              var DOMElements = angular.element(document.querySelectorAll('[ng-yield="'+iAttrs.contentFor+'"]'));
              DOMElements.html(template)
              $compile(DOMElements)(scope);

              
              return iElement.remove();
            }
          };
        }
      };
    }
  ])

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

  .directive('fileupload', ['$http', '$timeout', function ($http, $timeout) {
    return {
      scope: {
        fileupload: "=",
        ngModel: "=",
        hash: "=",
        percentCompleted: "="
      },
      restrict: 'A',
      link: function($scope, element, attrs) {
        $scope.percentCompleted = undefined;

        element.bind('change', function(){
          var fd = new FormData();

          angular.forEach(element[0].files, function (file) {
            fd.append("attachments[]", file);
          })

          var xhr = new XMLHttpRequest;

          xhr.upload.onprogress = function(e) {
              // Event listener for when the file is uploading
              $scope.$apply(function() {
                  var percentCompleted;
                  if (e.lengthComputable) {
                      $scope.percentCompleted = Math.round(e.loaded / e.total * 100);
                  }
              });
          };

          xhr.onload = function() {
              var res = JSON.parse(this.responseText)

              $scope.$apply(function() {
                if (!$scope.hash) {
                  if (attrs.multiple) {
                    $scope.ngModel = $scope.ngModel || [];
                    angular.forEach(res, function (attachment) {
                      $scope.ngModel.push(attachment);
                    });
                  } else {
                    $scope.ngModel = res[0];
                  }
                } else {
                  $scope.ngModel = $scope.ngModel || {};
                  angular.forEach(res, function(value, key) {
                    $scope.ngModel[key] = $scope.ngModel[key] || [];
                    angular.forEach(value, function (attachment) {
                      $scope.ngModel[key].push(attachment);
                    });
                  });
                }

                $scope.percentCompleted = undefined;
              });
          };


          xhr.open('POST', $scope.fileupload);
          xhr.setRequestHeader('X-CSRF-Token', $http.defaults.headers.common['X-CSRF-Token']);
          xhr.send(fd);
          element[0].value = '';
        })
      }
    }
  }])

  .directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
    // contains
    function contains(arr, item, comparator) {
      if (angular.isArray(arr)) {
        for (var i = arr.length; i--;) {
          if (comparator(arr[i], item)) {
            return true;
          }
        }
      }
      return false;
    }

    // add
    function add(arr, item, comparator) {
      arr = angular.isArray(arr) ? arr : [];
        if(!contains(arr, item, comparator)) {
            arr.push(item);
        }
      return arr;
    }  

    // remove
    function remove(arr, item, comparator) {
      if (angular.isArray(arr)) {
        for (var i = arr.length; i--;) {
          if (comparator(arr[i], item)) {
            arr.splice(i, 1);
            break;
          }
        }
      }
      return arr;
    }

    // http://stackoverflow.com/a/19228302/1458162
    function postLinkFn(scope, elem, attrs) {
       // exclude recursion, but still keep the model
      var checklistModel = attrs.checklistModel;
      attrs.$set("checklistModel", null);
      // compile with `ng-model` pointing to `checked`
      $compile(elem)(scope);
      attrs.$set("checklistModel", checklistModel);

      // getter / setter for original model
      var getter = $parse(checklistModel);
      var setter = getter.assign;
      var checklistChange = $parse(attrs.checklistChange);
      var checklistBeforeChange = $parse(attrs.checklistBeforeChange);

      // value added to list
      var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;


      var comparator = angular.equals;

      if (attrs.hasOwnProperty('checklistComparator')){
        if (attrs.checklistComparator[0] == '.') {
          var comparatorExpression = attrs.checklistComparator.substring(1);
          comparator = function (a, b) {
            return a[comparatorExpression] === b[comparatorExpression];
          };
          
        } else {
          comparator = $parse(attrs.checklistComparator)(scope.$parent);
        }
      }

      // watch UI checked change
      scope.$watch(attrs.ngModel, function(newValue, oldValue) {
        if (newValue === oldValue) { 
          return;
        } 

        if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
          scope[attrs.ngModel] = contains(getter(scope.$parent), value, comparator);
          return;
        }

        setValueInChecklistModel(value, newValue);

        if (checklistChange) {
          checklistChange(scope);
        }
      });

      function setValueInChecklistModel(value, checked) {
        var current = getter(scope.$parent);
        if (angular.isFunction(setter)) {
          if (checked === true) {
            setter(scope.$parent, add(current, value, comparator));
          } else {
            setter(scope.$parent, remove(current, value, comparator));
          }
        }
        
      }

      // declare one function to be used for both $watch functions
      function setChecked(newArr, oldArr) {
        if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
          setValueInChecklistModel(value, scope[attrs.ngModel]);
          return;
        }
        scope[attrs.ngModel] = contains(newArr, value, comparator);
      }

      // watch original model change
      // use the faster $watchCollection method if it's available
      if (angular.isFunction(scope.$parent.$watchCollection)) {
          scope.$parent.$watchCollection(checklistModel, setChecked);
      } else {
          scope.$parent.$watch(checklistModel, setChecked, true);
      }
    }

    return {
      restrict: 'A',
      priority: 1000,
      terminal: true,
      scope: true,
      compile: function(tElement, tAttrs) {
        if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') && (tElement[0].tagName !== 'MD-CHECKBOX') && (!tAttrs.btnCheckbox)) {
          throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
        }

        if (!tAttrs.checklistValue && !tAttrs.value) {
          throw 'You should provide `value` or `checklist-value`.';
        }

        // by default ngModel is 'checked', so we set it if not specified
        if (!tAttrs.ngModel) {
          // local scope var storing individual checkbox model
          tAttrs.$set("ngModel", "checked");
        }

        return postLinkFn;
      }
    };
  }]);
}).call(this);

(function () {
  var Routes = function () {
    var self = this,
        routes = {"root":{"defaults":{},"path":"/"},"new_user_session":{"defaults":{},"path":"/users/sign_in"},"user_session":{"defaults":{},"path":"/users/sign_in"},"destroy_user_session":{"defaults":{},"path":"/users/sign_out"},"user_password":{"defaults":{},"path":"/users/password"},"new_user_password":{"defaults":{},"path":"/users/password/new"},"edit_user_password":{"defaults":{},"path":"/users/password/edit"},"cancel_user_registration":{"defaults":{},"path":"/users/cancel"},"user_registration":{"defaults":{},"path":"/users"},"new_user_registration":{"defaults":{},"path":"/users/sign_up"},"edit_user_registration":{"defaults":{},"path":"/users/edit"},"map":{"defaults":{},"path":"/search/map"},"list":{"defaults":{},"path":"/search/list"},"between_positions":{"defaults":{},"path":"/correspondences/between_positions"},"avatar":{"defaults":{},"path":"/images/avatar"},"translations":{"defaults":{},"path":"/translations"},"user_currency":{"defaults":{},"path":"/user_currency"},"counters":{"defaults":{},"path":"/counters"},"analytics":{"defaults":{},"path":"/analytics"},"support":{"defaults":{},"path":"/support"},"help":{"defaults":{},"path":"/help"},"settings":{"defaults":{},"path":"/settings"},"images":{"defaults":{},"path":"/images"},"new_image":{"defaults":{},"path":"/images/new"},"edit_image":{"defaults":{},"path":"/images/:id/edit"},"image":{"defaults":{},"path":"/images/:id"},"documents":{"defaults":{},"path":"/documents"},"new_document":{"defaults":{},"path":"/documents/new"},"edit_document":{"defaults":{},"path":"/documents/:id/edit"},"document":{"defaults":{},"path":"/documents/:id"},"files":{"defaults":{},"path":"/files"},"new_file":{"defaults":{},"path":"/files/new"},"edit_file":{"defaults":{},"path":"/files/:id/edit"},"file":{"defaults":{},"path":"/files/:id"},"positions":{"defaults":{},"path":"/positions"},"new_position":{"defaults":{},"path":"/positions/new"},"edit_position":{"defaults":{},"path":"/positions/:id/edit"},"position":{"defaults":{},"path":"/positions/:id"},"offers":{"defaults":{},"path":"/offers"},"new_offer":{"defaults":{},"path":"/offers/new"},"edit_offer":{"defaults":{},"path":"/offers/:id/edit"},"offer":{"defaults":{},"path":"/offers/:id"},"favorites":{"defaults":{},"path":"/favorites"},"new_favorite":{"defaults":{},"path":"/favorites/new"},"edit_favorite":{"defaults":{},"path":"/favorites/:id/edit"},"favorite":{"defaults":{},"path":"/favorites/:id"},"templates":{"defaults":{},"path":"/templates"},"new_template":{"defaults":{},"path":"/templates/new"},"edit_template":{"defaults":{},"path":"/templates/:id/edit"},"template":{"defaults":{},"path":"/templates/:id"},"reset_counter_correspondences":{"defaults":{},"path":"/correspondences/reset_counter"},"send_message_correspondence":{"defaults":{},"path":"/correspondences/:id/send_message"},"correspondences":{"defaults":{},"path":"/correspondences"},"new_correspondence":{"defaults":{},"path":"/correspondences/new"},"edit_correspondence":{"defaults":{},"path":"/correspondences/:id/edit"},"correspondence":{"defaults":{},"path":"/correspondences/:id"},"reset_counter_offers":{"defaults":{},"path":"/offers/reset_counter"},"positions_profile":{"defaults":{},"path":"/profile/:id/positions"},"feedbacks_profile":{"defaults":{},"path":"/profile/:id/feedbacks"},"profile_index":{"defaults":{},"path":"/profile"},"new_profile":{"defaults":{},"path":"/profile/new"},"edit_profile":{"defaults":{},"path":"/profile/:id/edit"},"profile":{"defaults":{},"path":"/profile/:id"},"users":{"defaults":{},"path":"/users"},"new_user":{"defaults":{},"path":"/users/new"},"edit_user":{"defaults":{},"path":"/users/:id/edit"},"user":{"defaults":{},"path":"/users/:id"},"suitable_position":{"defaults":{},"path":"/positions/:id/suitable"},"offers_position":{"defaults":{},"path":"/positions/:id/offers"},"send_offer_position":{"defaults":{},"path":"/positions/:id/send_offer"},"toggle_favorite_position":{"defaults":{},"path":"/positions/:id/toggle_favorite"},"make_deal_position":{"defaults":{},"path":"/positions/:id/make_deal"},"shipping_position":{"defaults":{},"path":"/positions/:id/shipping"},"receiving_position":{"defaults":{},"path":"/positions/:id/receiving"},"rails_info_properties":{"defaults":{},"path":"/rails/info/properties"},"rails_info_routes":{"defaults":{},"path":"/rails/info/routes"},"rails_info":{"defaults":{},"path":"/rails/info"},"rails_mailers":{"defaults":{},"path":"/rails/mailers"}};

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
        var params = angular.extend(angular.copy(val.defaults), params || {});
        result = val.path;
        var defaultParams = angular.copy(self.defaultParams);
        return gsub(angular.extend(defaultParams, params));
      }
    })
  }

  window.Routes = new Routes();

}).call(this)