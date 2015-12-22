(function(){angular.module("oxymoron",["ngNotify","ui.router","ngResource"]).config(["$httpProvider","$locationProvider","$stateProvider",function(e,t,r){e.defaults.headers.common["X-Requested-With"]="AngularXMLHttpRequest",e.defaults.paramSerializer="$httpParamSerializerJQLike",t.html5Mode(!0).hashPrefix("!");var o=function(e,t){return function(r,o){try{var r=angular.isArray(r)?r:[r];-1!=r.indexOf(e)&&o(t)}catch(n){console.error(n)}}};r.rails=function(){return r.state("root_path",{url:"/",templateUrl:function(e){return Routes.root_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ApplicationCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_user_session_path",{url:"/users/sign_in",templateUrl:function(e){return Routes.new_user_session_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"UsersSessionsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("new_user_password_path",{url:"/users/password/new",templateUrl:function(e){return Routes.new_user_password_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"DevisePasswordsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_user_password_path",{url:"/users/password/edit",templateUrl:function(e){return Routes.edit_user_password_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"DevisePasswordsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("cancel_user_registration_path",{url:"/users/cancel",templateUrl:function(e){return Routes.cancel_user_registration_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"UsersRegistrationsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("cancel",e)}]}}).state("new_user_registration_path",{url:"/users/sign_up",templateUrl:function(e){return Routes.new_user_registration_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"UsersRegistrationsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_user_registration_path",{url:"/users/edit",templateUrl:function(e){return Routes.edit_user_registration_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"UsersRegistrationsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("map_path",{url:"/search/map",templateUrl:function(e){return Routes.map_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"SearchCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("map",e)}]}}).state("list_path",{url:"/search/list",templateUrl:function(e){return Routes.list_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"SearchCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("list",e)}]}}).state("analytics_path",{url:"/analytics",templateUrl:function(e){return Routes.analytics_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"AnalyticsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("support_path",{url:"/support",templateUrl:function(e){return Routes.support_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"SupportCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("help_path",{url:"/help",templateUrl:function(e){return Routes.help_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"HelpCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("settings_path",{url:"/settings",templateUrl:function(e){return Routes.settings_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"SettingsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("images_path",{url:"/images",templateUrl:function(e){return Routes.images_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ImagesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_image_path",{url:"/images/new",templateUrl:function(e){return Routes.new_image_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ImagesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_image_path",{url:"/images/:id/edit",templateUrl:function(e){return Routes.edit_image_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ImagesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("image_path",{url:"/images/:id",templateUrl:function(e){return Routes.image_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ImagesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("documents_path",{url:"/documents",templateUrl:function(e){return Routes.documents_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"DocumentsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_document_path",{url:"/documents/new",templateUrl:function(e){return Routes.new_document_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"DocumentsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_document_path",{url:"/documents/:id/edit",templateUrl:function(e){return Routes.edit_document_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"DocumentsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("document_path",{url:"/documents/:id",templateUrl:function(e){return Routes.document_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"DocumentsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("positions_path",{url:"/positions",templateUrl:function(e){return Routes.positions_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"PositionsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_position_path",{url:"/positions/new",templateUrl:function(e){return Routes.new_position_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"PositionsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_position_path",{url:"/positions/:id/edit",templateUrl:function(e){return Routes.edit_position_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"PositionsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("position_path",{url:"/positions/:id",templateUrl:function(e){return Routes.position_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"PositionsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("offers_path",{url:"/offers",templateUrl:function(e){return Routes.offers_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"OffersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_offer_path",{url:"/offers/new",templateUrl:function(e){return Routes.new_offer_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"OffersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_offer_path",{url:"/offers/:id/edit",templateUrl:function(e){return Routes.edit_offer_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"OffersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("offer_path",{url:"/offers/:id",templateUrl:function(e){return Routes.offer_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"OffersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("favorites_path",{url:"/favorites",templateUrl:function(e){return Routes.favorites_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"FavoritesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_favorite_path",{url:"/favorites/new",templateUrl:function(e){return Routes.new_favorite_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"FavoritesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_favorite_path",{url:"/favorites/:id/edit",templateUrl:function(e){return Routes.edit_favorite_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"FavoritesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("favorite_path",{url:"/favorites/:id",templateUrl:function(e){return Routes.favorite_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"FavoritesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("templates_path",{url:"/templates",templateUrl:function(e){return Routes.templates_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"TemplatesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_template_path",{url:"/templates/new",templateUrl:function(e){return Routes.new_template_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"TemplatesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_template_path",{url:"/templates/:id/edit",templateUrl:function(e){return Routes.edit_template_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"TemplatesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("template_path",{url:"/templates/:id",templateUrl:function(e){return Routes.template_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"TemplatesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("messages_path",{url:"/messages",templateUrl:function(e){return Routes.messages_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"MessagesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_message_path",{url:"/messages/new",templateUrl:function(e){return Routes.new_message_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"MessagesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_message_path",{url:"/messages/:id/edit",templateUrl:function(e){return Routes.edit_message_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"MessagesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("message_path",{url:"/messages/:id",templateUrl:function(e){return Routes.message_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"MessagesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("correspondences_path",{url:"/correspondences",templateUrl:function(e){return Routes.correspondences_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"CorrespondencesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_correspondence_path",{url:"/correspondences/new",templateUrl:function(e){return Routes.new_correspondence_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"CorrespondencesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_correspondence_path",{url:"/correspondences/:id/edit",templateUrl:function(e){return Routes.edit_correspondence_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"CorrespondencesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("correspondence_path",{url:"/correspondences/:id",templateUrl:function(e){return Routes.correspondence_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"CorrespondencesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("positions_profile_path",{url:"/profile/:id/positions",templateUrl:function(e){return Routes.positions_profile_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ProfileCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("positions",e)}]}}).state("feedbacks_profile_path",{url:"/profile/:id/feedbacks",templateUrl:function(e){return Routes.feedbacks_profile_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ProfileCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("feedbacks",e)}]}}).state("profile_index_path",{url:"/profile",templateUrl:function(e){return Routes.profile_index_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ProfileCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_profile_path",{url:"/profile/new",templateUrl:function(e){return Routes.new_profile_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ProfileCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_profile_path",{url:"/profile/:id/edit",templateUrl:function(e){return Routes.edit_profile_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ProfileCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("profile_path",{url:"/profile/:id",templateUrl:function(e){return Routes.profile_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"ProfileCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("users_path",{url:"/users",templateUrl:function(e){return Routes.users_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"UsersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_user_path",{url:"/users/new",templateUrl:function(e){return Routes.new_user_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"UsersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_user_path",{url:"/users/:id/edit",templateUrl:function(e){return Routes.edit_user_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"UsersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("user_path",{url:"/users/:id",templateUrl:function(e){return Routes.user_path(e)+"?ng-view"},reloadOnSearch:!1,controller:"UsersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}),r}}]).config(["$provide",function(e){e.decorator("$state",["$delegate",function(e){var t=e;t.baseGo=t.go;var r=function(e,r,o){if(t.defaultParams){var n=angular.copy(t.defaultParams);r=angular.extend(n,r)}t.baseGo(e,r,o)};return t.go=r,e}])}]).run(["$rootScope","ngNotify","Validate","$state","$http",function(e,t,r,o,n){t.config({theme:"pure",position:"top",duration:2e3,type:"info"}),e.$on("loading:finish",function(e,r){r.headers()["x-csrf-token"]&&(n.defaults.headers.common["X-CSRF-Token"]=r.headers()["x-csrf-token"]),r.data&&r.data.msg&&t.set(r.data.msg,"success"),r.data&&r.data.redirect_to&&o.go(r.data.redirect_to,r.data.redirect_options||{})}),e.$on("loading:error",function(e,n,a){angular.isObject(n.data)?(n.data.msg&&t.set(n.data.msg,"error"),n.data.errors&&r(n.data.form_name||n.config.data.form_name,n.data.errors),n.data&&n.data.redirect_to&&o.go(n.data.redirect_to)):-1==n.status?t.set("\u0421\u0435\u0440\u0432\u0435\u0440 \u043d\u0435 \u043e\u0442\u0432\u0435\u0447\u0430\u0435\u0442","error"):304!=n.status&&t.set(n.statusText,"error")})}]),window.Resources={},angular.module("oxymoron").factory("resourceDecorator",[function(){return function(e){return e}}]),Resources.Image={"new":{method:"GET",url:"/images/:id/new.json"},edit:{method:"GET",url:"/images/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("Image",["$resource","resourceDecorator",function(e,t){return t(e("/images/:id.json",{id:"@id"},{"new":{method:"GET",url:"/images/:id/new.json"},edit:{method:"GET",url:"/images/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),Resources.Document={"new":{method:"GET",url:"/documents/:id/new.json"},edit:{method:"GET",url:"/documents/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("Document",["$resource","resourceDecorator",function(e,t){return t(e("/documents/:id.json",{id:"@id"},{"new":{method:"GET",url:"/documents/:id/new.json"},edit:{method:"GET",url:"/documents/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),Resources.Position={"new":{method:"GET",url:"/positions/:id/new.json"},edit:{method:"GET",url:"/positions/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("Position",["$resource","resourceDecorator",function(e,t){return t(e("/positions/:id.json",{id:"@id"},{"new":{method:"GET",url:"/positions/:id/new.json"},edit:{method:"GET",url:"/positions/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),Resources.Offer={"new":{method:"GET",url:"/offers/:id/new.json"},edit:{method:"GET",url:"/offers/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("Offer",["$resource","resourceDecorator",function(e,t){return t(e("/offers/:id.json",{id:"@id"},{"new":{method:"GET",url:"/offers/:id/new.json"},edit:{method:"GET",url:"/offers/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),Resources.Favorite={"new":{method:"GET",url:"/favorites/:id/new.json"},edit:{method:"GET",url:"/favorites/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("Favorite",["$resource","resourceDecorator",function(e,t){return t(e("/favorites/:id.json",{id:"@id"},{"new":{method:"GET",url:"/favorites/:id/new.json"},edit:{method:"GET",url:"/favorites/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),Resources.Template={"new":{method:"GET",url:"/templates/:id/new.json"},edit:{method:"GET",url:"/templates/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("Template",["$resource","resourceDecorator",function(e,t){return t(e("/templates/:id.json",{id:"@id"},{"new":{method:"GET",url:"/templates/:id/new.json"},edit:{method:"GET",url:"/templates/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),Resources.Message={"new":{method:"GET",url:"/messages/:id/new.json"},edit:{method:"GET",url:"/messages/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("Message",["$resource","resourceDecorator",function(e,t){return t(e("/messages/:id.json",{id:"@id"},{"new":{method:"GET",url:"/messages/:id/new.json"},edit:{method:"GET",url:"/messages/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),Resources.Correspondence={"new":{method:"GET",url:"/correspondences/:id/new.json"},edit:{method:"GET",url:"/correspondences/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("Correspondence",["$resource","resourceDecorator",function(e,t){return t(e("/correspondences/:id.json",{id:"@id"},{"new":{method:"GET",url:"/correspondences/:id/new.json"},edit:{method:"GET",url:"/correspondences/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),Resources.Profile={"new":{method:"GET",url:"/profile/:id/new.json"},edit:{method:"GET",url:"/profile/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"},positions:{url:"/profile/:id/positions.json",isArray:!0,method:"GET"},feedbacks:{url:"/profile/:id/feedbacks.json",isArray:!0,method:"GET"}},angular.module("oxymoron").factory("Profile",["$resource","resourceDecorator",function(e,t){return t(e("/profile/:id.json",{id:"@id"},{"new":{method:"GET",url:"/profile/:id/new.json"},edit:{method:"GET",url:"/profile/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"},positions:{url:"/profile/:id/positions.json",isArray:!0,method:"GET"},feedbacks:{url:"/profile/:id/feedbacks.json",isArray:!0,method:"GET"}}))}]),Resources.User={"new":{method:"GET",url:"/users/:id/new.json"},edit:{method:"GET",url:"/users/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}},angular.module("oxymoron").factory("User",["$resource","resourceDecorator",function(e,t){return t(e("/users/:id.json",{id:"@id"},{"new":{method:"GET",url:"/users/:id/new.json"},edit:{method:"GET",url:"/users/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),angular.module("oxymoron").factory("httpInterceptor",["$q","$rootScope","$log",function(e,t,r){return{request:function(r){return t.$broadcast("loading:progress"),r||e.when(r)},response:function(r){return t.$broadcast("loading:finish",r),r||e.when(r)},responseError:function(r){return t.$broadcast("loading:error",r),e.reject(r)}}}]).config(["$httpProvider",function(e){e.interceptors.push("httpInterceptor")}]).factory("Validate",[function(){return function(e,t){var r=angular.element(document.querySelector('[name="'+e+'"]')).scope()[e];angular.element(document.querySelectorAll(".rails-errors")).remove(),angular.forEach(r,function(e,t){0!=t.indexOf("$")&&angular.forEach(e.$error,function(t,r){e.$setValidity(r,null)})}),angular.forEach(t,function(t,o){var n=e+"["+o+"]";try{r[n]&&(r[n].$setTouched(),r[n].$setDirty(),r[n].$setValidity("server",!1)),angular.element(document.querySelector('[name="'+n+'"]')).parent().append('<div class="rails-errors" ng-messages="'+n+'.$error"><div ng-message="server">'+t[0]+"</div></div>")}catch(a){console.log(a),console.warn("Element with name "+n+" not found for validation.")}})}}]).service("Sign",["$http",function(e){var t=this;t.out=function(){e["delete"](Routes.destroy_user_session_path()).success(function(){window.location="/"})},t["in"]=function(t){e.post(Routes.user_session_path(),{user:t}).success(function(){window.location.reload()})},t.up=function(t){e.post(Routes.user_registration_path(),{user:t}).success(function(){window.location.reload()})}}]).directive("contentFor",["$compile",function(e){return{compile:function(t,r,o){var n=t.html();return{pre:function(t,r,o,a){var s=angular.element(document.querySelectorAll('[ng-yield="'+o.contentFor+'"]'));return s.html(n),e(s)(t),r.remove()}}}}}]).directive("clickOutside",["$document",function(e){return{restrict:"A",scope:{clickOutside:"&"},link:function(t,r,o){var n=function(e){r!==e.target&&!r[0].contains(e.target)&&document.body.contains(e.target)&&t.$apply(function(){t.$eval(t.clickOutside)})};e.bind("click",n),t.$on("$destroy",function(){e.unbind("click",n)})}}}]).directive("fileupload",["$http",function(e){return{scope:{fileupload:"=",ngModel:"=ngModel"},restrict:"A",link:function(t,r,o){r.bind("change",function(){var n=new FormData;angular.forEach(r[0].files,function(e){n.append("attachments[]",e)}),console.log(t.fileupload),e.post(t.fileupload,n,{headers:{"Content-Type":void 0}}).success(function(e){o.multiple?(t.ngModel=t.ngModel||[],angular.forEach(e,function(e){t.ngModel.push(e)})):t.ngModel=e[0]}),r[0].value=""})}}}]).directive("checklistModel",["$parse","$compile",function(e,t){function r(e,t,r){if(angular.isArray(e))for(var o=e.length;o--;)if(r(e[o],t))return!0;return!1}function o(e,t,o){return e=angular.isArray(e)?e:[],r(e,t,o)||e.push(t),e}function n(e,t,r){if(angular.isArray(e))for(var o=e.length;o--;)if(r(e[o],t)){e.splice(o,1);break}return e}function a(a,s,i){function l(e,t){var r=d(a.$parent);angular.isFunction(p)&&(t===!0?p(a.$parent,o(r,e,_)):p(a.$parent,n(r,e,_)))}function u(e,t){return h&&h(a)===!1?void l(m,a[i.ngModel]):void(a[i.ngModel]=r(e,m,_))}var c=i.checklistModel;i.$set("checklistModel",null),t(s)(a),i.$set("checklistModel",c);var d=e(c),p=d.assign,f=e(i.checklistChange),h=e(i.checklistBeforeChange),m=i.checklistValue?e(i.checklistValue)(a.$parent):i.value,_=angular.equals;if(i.hasOwnProperty("checklistComparator"))if("."==i.checklistComparator[0]){var g=i.checklistComparator.substring(1);_=function(e,t){return e[g]===t[g]}}else _=e(i.checklistComparator)(a.$parent);a.$watch(i.ngModel,function(e,t){if(e!==t){if(h&&h(a)===!1)return void(a[i.ngModel]=r(d(a.$parent),m,_));l(m,e),f&&f(a)}}),angular.isFunction(a.$parent.$watchCollection)?a.$parent.$watchCollection(c,u):a.$parent.$watch(c,u,!0)}return{restrict:"A",priority:1e3,terminal:!0,scope:!0,compile:function(e,t){if(("INPUT"!==e[0].tagName||"checkbox"!==t.type)&&"MD-CHECKBOX"!==e[0].tagName&&!t.btnCheckbox)throw'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';if(!t.checklistValue&&!t.value)throw"You should provide `value` or `checklist-value`.";return t.ngModel||t.$set("ngModel","checked"),a}}}])}).call(this),function(){var e=function(){var e=this,t={root:{defaults:{},path:"/"},new_user_session:{defaults:{},path:"/users/sign_in"},user_session:{defaults:{},path:"/users/sign_in"},destroy_user_session:{defaults:{},path:"/users/sign_out"},user_password:{defaults:{},path:"/users/password"},new_user_password:{defaults:{},path:"/users/password/new"},edit_user_password:{defaults:{},path:"/users/password/edit"},cancel_user_registration:{defaults:{},path:"/users/cancel"},user_registration:{defaults:{},path:"/users"},new_user_registration:{defaults:{},path:"/users/sign_up"},edit_user_registration:{defaults:{},path:"/users/edit"},map:{defaults:{},path:"/search/map"},list:{defaults:{},path:"/search/list"},analytics:{defaults:{},path:"/analytics"},support:{defaults:{},path:"/support"},help:{defaults:{},path:"/help"},settings:{defaults:{},path:"/settings"},images:{defaults:{},path:"/images"},new_image:{defaults:{},path:"/images/new"},edit_image:{defaults:{},path:"/images/:id/edit"},image:{defaults:{},path:"/images/:id"},documents:{defaults:{},path:"/documents"},new_document:{defaults:{},path:"/documents/new"},edit_document:{defaults:{},path:"/documents/:id/edit"},document:{defaults:{},path:"/documents/:id"},positions:{defaults:{},path:"/positions"},new_position:{defaults:{},path:"/positions/new"},edit_position:{defaults:{},path:"/positions/:id/edit"},position:{defaults:{},path:"/positions/:id"},offers:{defaults:{},path:"/offers"},new_offer:{defaults:{},path:"/offers/new"},edit_offer:{defaults:{},path:"/offers/:id/edit"},offer:{defaults:{},path:"/offers/:id"},favorites:{defaults:{},path:"/favorites"},new_favorite:{defaults:{},path:"/favorites/new"},edit_favorite:{defaults:{},path:"/favorites/:id/edit"},favorite:{defaults:{},path:"/favorites/:id"},templates:{defaults:{},path:"/templates"},new_template:{defaults:{},path:"/templates/new"},edit_template:{defaults:{},path:"/templates/:id/edit"},template:{defaults:{},path:"/templates/:id"},messages:{defaults:{},path:"/messages"},new_message:{defaults:{},path:"/messages/new"},edit_message:{defaults:{},path:"/messages/:id/edit"},message:{defaults:{},path:"/messages/:id"},correspondences:{defaults:{},path:"/correspondences"},new_correspondence:{defaults:{},path:"/correspondences/new"},edit_correspondence:{defaults:{},path:"/correspondences/:id/edit"},correspondence:{defaults:{},path:"/correspondences/:id"},positions_profile:{defaults:{},path:"/profile/:id/positions"},feedbacks_profile:{defaults:{},path:"/profile/:id/feedbacks"},profile_index:{defaults:{},path:"/profile"},new_profile:{defaults:{},path:"/profile/new"},edit_profile:{defaults:{},path:"/profile/:id/edit"},profile:{defaults:{},path:"/profile/:id"},users:{defaults:{},path:"/users"},new_user:{defaults:{},path:"/users/new"},edit_user:{defaults:{},path:"/users/:id/edit"},user:{defaults:{},path:"/users/:id"}};e.defaultParams={};var r=function(e,t){var o=[];for(var n in e)if(e.hasOwnProperty(n)){var a=t?t+"["+n+"]":n,s=e[n];o.push("object"==typeof s?r(s,a):encodeURIComponent(a)+"="+encodeURIComponent(s))}return o.join("&")},o=function(e,t){var e=angular.copy(e);return delete e[t],e};angular.forEach(t,function(t,n){var a="",s=function(e){e.format&&(a+="."+e.format);var e=o(e,"format");return angular.forEach(e,function(t,r){var n=":"+r;-1!=a.search(n)&&(a=a.replace(n,t),e=o(e,r))}),Object.keys(e).length&&(a+="?"+r(e)),a};e[n+"_path"]=function(r){var r=angular.extend(angular.copy(t.defaults),r||{});a=t.path;var o=angular.copy(e.defaultParams);return s(angular.extend(o,r))}})};window.Routes=new e}.call(this);