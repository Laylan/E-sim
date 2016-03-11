(function() {
  'use strict';

  angular
    .module('login.module')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$http', '$scope', '$rootScope', '$ionicUser', '$ionicPush', '$ionicModal', '$state', 'Login', 'Toast'];

  /* @ngInject */
  function LoginController($http, $scope, $rootScope, $ionicUser, $ionicPush, $ionicModal, $state, Login, Toast) {

    // vars
    var vm = this;
    vm.property = 'LoginController';
    vm.loginParameters = {};
    vm.servers = {};
// vm.servers = [
//   {
//   "name": "Testura",
//   "address": "http://testura.e-sim.org:8091/mobile"
// },{
//   "name": "Primera",
//   "address": "http://primera.e-sim.org/mobile"
// }];
    vm.selectedServer = '';
    $rootScope.loggedPlayer = null;

    // definitions
    vm.successfulLoginCallback = successfulLoginCallback;
    vm.login = login;
    vm.setServer = setServer;
    vm.initAutoLogin = initAutoLogin;
    vm.goAbout = goAbout;
    vm.initModal =initModal;
    vm.getServers = getServers;

    // inits
    vm.initAutoLogin();
    vm.initModal();
    vm.getServers();
    ////////////////

    function successfulLoginCallback(loggedPlayerData) {
      // var ionicUser = {
      //   user_id: loggedPlayerData.loggedCitizen.id + '@' + loggedPlayerData.server.name,
      //   name: loggedPlayerData.loggedCitizen.username,
      //   image: loggedPlayerData.loggedCitizen.avatar.NORMAL,
      //   citizenshipId: loggedPlayerData.loggedCitizen.citizenshipId,
      //   countryName: loggedPlayerData.loggedCitizen.countryName,
      //   level: loggedPlayerData.loggedCitizen.level,
      //   premium: loggedPlayerData.loggedCitizen.premium,
      //   strength: loggedPlayerData.loggedCitizen.strength,
      //   economySkill: loggedPlayerData.loggedCitizen.economySkill,
      //   server: loggedPlayerData.server.name
      // };
      // $ionicUser.identify(ionicUser)
      //   .then(
      //     function() {
      //       var config = null;
      //       config = {
      //         "badge": "true",
      //         "sound": "true",
      //         "alert": "true"
      //       };
      //       $ionicPush.register(config, $ionicUser.get())
      //         .then(
      //           function(result) {
      //
      //             console.log("Register success " + result);
      //
      //             $scope.registerDisabled = true;
      //             // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
      //             // if (ionic.Platform.isIOS()) {
      //               // $scope.regId = result;
      //               // alert(storeDeviceToken("ios"));
      //             // }
      //           },
      //           function(err) {
      //             console.log("Register error " + err);
      //           }
      //         );
      //     },
      //     function(err) {
      //       console.log("User Error " + err);
      //     });

      $rootScope.loggedPlayer = loggedPlayerData.loggedCitizen;
      $rootScope.token = loggedPlayerData.token;
      $rootScope.server = loggedPlayerData.server;
      console.log(loggedPlayerData);
      if (loggedPlayerData.rememberMeToken) {
        window.localStorage.rememberedLogin = JSON.stringify({
          token: '"' + loggedPlayerData.rememberMeToken + '"',
          server: loggedPlayerData.server
        });
      }
      $state.go('main.main');
    }

    function initAutoLogin() {
      Login
        .autoLogin()
        .then(successfulLoginCallback);
    }

    function setServer(selectedServer) {
      vm.selectedServer = selectedServer;
    }

    function login() {
      Login
        .login(vm.loginParameters, vm.selectedServer)
        .then(successfulLoginCallback, Toast);
    }

    function goAbout() {
      vm.modal.show();

    }

    function getServers(){
      Login.getServerList()
        .then(function FetchServersSuccess(data) {
          vm.servers = data;
          vm.selectedServer = vm.servers[0];
          console.log('pobrane dane');
        }, function FetchServersError(error) {
          Toast(error);

        });
    }


    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/about/index.tpl.html', {
        scope: $scope
      }).then(function(modal) {
        vm.modal = modal;
      });
      vm.openModal = function() {
        vm.modal.show();
      };
      vm.closeModal = function() {
        vm.modal.hide();
      };
      $scope.$on('$destroy', function() {
        vm.modal.remove();
      });
    }

  }

})();
