(function() {
  'use strict';

  angular
    .module('esim-app')
    .run(runFn);

  runFn.$inject = ['$ionicPlatform', '$ionicAnalytics', '$cordovaSplashscreen', '$rootScope', '$log', '$state', '$ionicPopup', 'Toast'];

  /* @ngInject */
  function runFn($ionicPlatform, $ionicAnalytics, $cordovaSplashscreen, $rootScope, $log, $state, $ionicPopup, Toast) {
    $ionicPlatform.ready(function (){

        /*----- Toast i ver<4  -----*/
        if (ionic.Platform.isAndroid()){
        var currentPlatformVersion = ionic.Platform.version();
          if(currentPlatformVersion < 14 && localStorage.getItem("alreadyLogged")){ //android 4.0
            $state.go('login');
          }else{
          if(confirm('e-Sim Application can work wrong on Android less than Android 4.0.')){
            localStorage.setItem("alreadyLogged","true"); // zapisz do storage
            }
          }
        }else{}

    $ionicPlatform.ready(function() {
        /*----- Analytics  -----*/

        // $ionicAnalytics.register({silent: true});

        /*----- AdMob inicjalizacja -----*/
        if (window.plugins) {
          var admobid = {};
          if (/(android)/i.test(navigator.userAgent)) { // for android
            admobid = {
              banner: 'ca-app-pub-7561623930514913/9310831791', // or DFP format "/6253334/dfp_example_ad"
            };
          } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
            admobid = {
              banner: 'ca-app-pub-7561623930514913/1196758192', // or DFP format "/6253334/dfp_example_ad"
            };
          } else { // for windows phone
            admobid = {
              banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
            };
          }
          if (!AdMob) {
            console.log('admob plugin not ready');
            return;
          }
          /*----- AdMob Dodanie reklam  -----*/
          AdMob.createBanner({
            adId: admobid.banner,
            isTesting: false,
            overlap: false,
            offsetTopBar: false,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            bgColor: 'black'
          });


        }
      })
      .then(function GeneralConfig() {

        $log.debug("GeneralConfig fired");
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
          Toast(error);
        });
        //$cordovaSplashscreen.hide(); wywala error - trzeba zbadac
      })
      .then(function() {
        $log.debug("BackButtonConfig fired");
        $ionicPlatform.registerBackButtonAction(function() {
          //Wylaczamy standardowe zachowanie przycisku zeby kontrolowac go troche precyzyjniej
        }, 100);
        $ionicPlatform.onHardwareBackButton(function() {
          $log.debug("Back button: currentState: " + $state.current.name);
          $log.debug("Back button: $state.includes('login'): " + $state.includes('login'));
          $log.debug("Back button: $state.includes('main.main'): " + $state.includes('main.main'));
          if ($state.includes('login') || $state.includes('main.main')) {
            $ionicPopup.confirm({
              title: 'Quit e-Sim?'
            }).then(function(res) {
              if (res) {
                ionic.Platform.exitApp();
              }
            });
          } else {
            $state.go('main.main');
          }
        });
      });
  }

})();
