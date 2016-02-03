(function () {
  'use strict';

  angular
    .module('sent-messages.module')
    .controller('SentMessagesController', SentMessagesController);

  SentMessagesController.$inject = ['$scope', '$ionicScrollDelegate', 'Toast', 'SentMessagesData', 'sent'];

  /* @ngInject */
  function SentMessagesController($scope, $ionicScrollDelegate, Toast, SentMessagesData, sent) {


    var vm = this;
    vm.property = 'SentMessagesController';

    // variables
    var _nextPage = 2;
    var _blockFetchingNextPages = false;
    var _loadedMessages = SentMessagesData.length;
    vm.showScrollTo = false;
    vm.position = $ionicScrollDelegate.getScrollPosition().top;
    vm.messages = SentMessagesData;
    vm.sent = sent;

    // functions definitions
    vm.showProfile = showProfile;
    vm.initPosition = initPosition;
    vm.scrollToTop = scrollToTop;
    vm.fetchMoreSentMessages = fetchMoreSentMessages;
    vm.canFetchMoreSentMessages = canFetchMoreSentMessages;

    // init functions
    vm.initPosition();
    vm.scrollToTop();

    ////////////////
    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }

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

    function fetchMoreSentMessages() {
      SentMessagesData.fetchSentMessages(_nextPage)
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

    function canFetchMoreSentMessages() {
      return !_blockFetchingNextPages && _loadedMessages === 5;
    }
  }
})();
