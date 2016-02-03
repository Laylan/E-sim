(function() {
  'use strict';

  angular
    .module('local-shouts.module')
    .controller('LocalShoutsController', LocalShoutsController);

  LocalShoutsController.$inject = ['$scope', '$state', '$rootScope', 'Toast', 'LocalShoutsData', 'shouts'];

  /* @ngInject */
  function LocalShoutsController($scope, $state, $rootScope, Toast, LocalShoutsData, shouts) {

    // vars
    var vm = this;
    vm.property = 'LocalShoutsController';
    vm.shouts = shouts;
    var _currntPage = 1;
    var _blockFetchingNextPages = false;
    var _currentOffersCount = shouts.length;
    var _currentShoutComments = 0;
    var _offersPerPage = 5;
    var id = 0;
    vm.showChangeLog = false;
    vm.message = '';

    // definitions
    vm.showMore = showMore;
    vm.showProfile = showProfile;
    vm.likeIt = likeIt;
    vm.writeShout = writeShout;
    vm.getMore = getMore;
    vm.canGetMoreShouts = canGetMoreShouts;

    ////////////////

    function showMore() {
      vm.showChangeLog = !vm.showChangeLog;
    }

    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }

    function likeIt(shout) {
      if (!shout.votedAlready) {
        LocalShoutsData.voteShout(shout.id)
          .then(function Success() {
            shout.votes++;
            shout.votedAlready = true;
          }, function Error(msg) {
            Toast(msg);
          });
      } else {
        Toast('You have already voted');
      }
    }

    function writeShout() {
      console.log('send shout');
      LocalShoutsData.sendShout('', vm.message, false, true, false, false, '')
        .then(function Success() {
          console.log('napisano i wyslano');
          var date = new Date();
          var newShout = [{
            "citizen": $rootScope.loggedPlayer,
            "message": vm.message,
            "isPremium": $rootScope.loggedPlayer.premium,
            "replies": 0,
            "votes": 0,
            "time": date.getTime()
          }]
          vm.shouts = newShout.concat(vm.shouts);
          vm.message = '';
          vm.showChangeLog = false;
        }, function Error(msg) {
          console.log('lipa');
          Toast(msg);
        });
    }

    function getMore() {
      LocalShoutsData.fetchLocalShouts(++_currntPage)
        .then(function FetchJobOffersSuccess(data) {
          vm.shouts = vm.shouts.concat(data);
          _currentOffersCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function canGetMoreShouts() {
      return _currentOffersCount === _offersPerPage && !_blockFetchingNextPages;
    }
  }

})();
