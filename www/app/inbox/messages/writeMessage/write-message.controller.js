(function () {
  'use strict';

  angular
    .module('write-message.module')
    .controller('WriteMessageController', WriteMessageController);

  WriteMessageController.$inject = ['$scope', '$ionicScrollDelegate', '$stateParams', 'Toast', 'WriteMessageData', 'MessagesData'];

  /* @ngInject */
  function WriteMessageController($scope, $ionicScrollDelegate, $stateParams, Toast, WriteMessageData, MessagesData) {


    var vm = this;
    vm.property = 'WriteMessageController';

    // variables
    vm.newMessageTitle = '';
    vm.newMessage = '';
    vm.receiverName = '';
    vm.writeNewMessage = true;
    vm.showScrollTo = false;
    vm.position = $ionicScrollDelegate.getScrollPosition().top;

    // functions definitions
    vm.initPosition = initPosition;
    vm.scrollToTop = scrollToTop;
    vm.sendMessage = sendMessage;
    // init functions
    vm.initPosition();
    vm.scrollToTop();

    ////////////////
    if ($stateParams.receiver) {
      vm.receiverName = $stateParams.receiver;
      vm.newMessageTitle = 'Re: ' + $stateParams.title;
      MessagesData.fetchConversation($stateParams.receiverId, 1)
      .then(function FetchJobOffersSuccess(data) {
        //console.log(data);
        vm.prevMessages = data;
      }, function FetchJobOffersError(error) {
        Toast(error);
        console.log(error);
      });
      vm.writeNewMessage = false;
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

    function sendMessage() {
      WriteMessageData.writeMessage(vm.newMessageTitle, vm.newMessage, vm.receiverName)
      .then(function Success() {
        vm.newMessageTitle = '';
        vm.newMessage = '';
        vm.receiverName = '';
      }, function Error(msg) {
        Toast(msg);
      });
    }
  }
})();
