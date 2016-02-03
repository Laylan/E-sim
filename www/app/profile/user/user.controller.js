(function () {
  'use strict';

  angular
    .module('user.module')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$ionicScrollDelegate', '$ionicModal', 'UserData', 'profileData'];

  /* @ngInject */
  function UserController($scope, $state, $ionicScrollDelegate, $ionicModal, UserData, profileData) {

    // vars
    var vm = this;
    vm.property = 'UserController';
    var _friendsPage = 1;
    var _blockFetchingNextPages = false;
    var _currentFriendsCount = 0;
    var _friendsPerPage = 5;
    vm.showChangeLog = false;
    vm.profileData = profileData;
    vm.friends = {};

    // definitions
    vm.showProfile = showProfile;
    vm.showFriends = showFriends;
    vm.getMore = getMore;
    vm.canGetMoreFriends = canGetMoreFriends;
    vm.initModal = initModal;
    vm.showMore = showMore;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////

    function showProfile(id) {
      $state.go('main.profile', {
        profileId: id
      });
    }

    function showMore() {
      vm.showChangeLog = !vm.showChangeLog;
    }

    function showFriends() {
      console.log('showFriends');
      UserData.fetchFriends(vm.profileData.id, _friendsPage)
        .then(function FetchJobOffersSuccess(data) {
          console.log('###################');
          console.log(data);
          vm.friends = data;
          _currentFriendsCount = vm.friends.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          console.log(error);
        });
    }

    function getMore() {
      UserData.fetchFriends(vm.profileData.id, ++_friendsPage)
        .then(function FetchJobOffersSuccess(data) {
          vm.friends = vm.friends.concat(data);
          _currentFriendsCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function canGetMoreFriends() {
      return _currentFriendsCount === _friendsPerPage && !_blockFetchingNextPages;
    }

    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/profile/user/friends-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.openFriendsModal = function () {
        vm.showFriends();
        if (vm.friends.length === 0) {
          Toast('No friends!');
        } else {
          vm.modal.show();
        }
      };
      vm.closeFriendsModal = function () {
        _friendsPage = 1;
        _currentFriendsCount = 0;
        vm.modal.hide();

      };
      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }

})();
