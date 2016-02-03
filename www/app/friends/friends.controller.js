(function () {
  'use strict';

  angular
    .module('friends.module')
    .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['$scope', '$state', '$stateParams', '$ionicScrollDelegate', 'Toast', 'FriendsData', 'friendsList'];

  /* @ngInject */
  function FriendsController($scope, $state, $stateParams, $ionicScrollDelegate, Toast, FriendsData, friendsList) {


    var vm = this;
    vm.property = 'MessagesController';

    // variables
    var _nextPage = 2;
    var _blockFetchingNextPages = false;
    var _loadedFriends = friendsList.length;
    vm.showScrollTo = false;
    vm.position = $ionicScrollDelegate.getScrollPosition().top;
    vm.friendsList = friendsList;

    // functions definitions
    vm.initPosition = initPosition;
    vm.scrollToTop = scrollToTop;
    vm.showProfile = showProfile;
    vm.fetchMoreFriends = fetchMoreFriends;
    vm.canFetchMoreFriends = canFetchMoreFriends;

    // init functions
    vm.initPosition();
    vm.scrollToTop();

    ////////////////

    function initPosition() {
      if (vm.position >= 250) {
        vm.showScrollTo = true;
      } else if (vm.position < 250) {
        vm.showScrollTo = false;
      }
    }

    function scrollToTop() {
      $ionicScrollDelegate.scrollTop();
    }
    function showProfile(id) {
      $state.go('main.profile', {
        profileId: id
      });
    }
    function fetchMoreFriends() {
      FriendsData.fetchFriends($stateParams.friendId, _nextPage)
        .then(function FetchFriendsSuccess(data) {
          vm.friendsList = vm.friendsList.concat(data);
          _loadedFriends = data.length;
        }, function FetchFriendsError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      _nextPage += 1;
    }

    function canFetchMoreFriends() {
      return !_blockFetchingNextPages && _loadedFriends === 5;
    }
  }
})();
