(function () {
  'use strict';

  angular
    .module('messages.module')
    .controller('MessagesController', MessagesController);

  MessagesController.$inject = ['$scope', '$state', '$ionicScrollDelegate', 'Toast', 'MessagesData', 'baseMessages', 'baseMessageCount'];

  /* @ngInject */
  function MessagesController($scope, $state, $ionicScrollDelegate, Toast, MessagesData, baseMessages, baseMessageCount) {


    var vm = this;
    vm.property = 'MessagesController';

    // variables
    var _nextPage = 2;
    var _blockFetchingNextPages = false;
    var _messageCount = baseMessageCount;
    var _loadedMessages = baseMessages.length;
    vm.showScrollTo = false;
    vm.position = $ionicScrollDelegate.getScrollPosition().top;
    vm.messages = baseMessages;

    // functions definitions
    vm.initPosition = initPosition;
    vm.showProfile = showProfile;
    vm.scrollToTop = scrollToTop;
    vm.fetchMoreMessages = fetchMoreMessages;
    vm.canFetchMoreMessages = canFetchMoreMessages;
    vm.sentMessages = sentMessages;
    vm.newMessage = newMessage;

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

    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }

    function scrollToTop() {
      $ionicScrollDelegate.scrollTop();
    }

    function sentMessages() {
      $state.go('main.sentMessages');
    }
    function newMessage() {
      $state.go('main.writeMessage');
    }
    function fetchMoreMessages() {
      MessagesData.fetchMessages(_nextPage)
        .then(function FetchMessagesSuccess(data) {
          vm.messages = vm.messages.concat(data);
          _loadedMessages = data.length;
        }, function FetchMessagesError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      _nextPage += 1;
    }

    function canFetchMoreMessages() {
      return !_blockFetchingNextPages && _loadedMessages === 5;
    }
  }
})();
