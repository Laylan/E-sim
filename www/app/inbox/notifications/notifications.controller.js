(function () {
  'use strict';

  angular
    .module('notifications.module')
    .controller('NotificationsController', NotificationsController);

  NotificationsController.$inject = ['$scope', '$ionicScrollDelegate', 'NotificationsData', 'baseNotifications', 'baseNotificationCount', 'notificationTypes'];

  /* @ngInject */
  function NotificationsController($scope, $ionicScrollDelegate, NotificationsData, baseNotifications, baseNotificationCount, notificationTypes) {


    var vm = this;
    vm.property = 'NotificationsController';
    // variables
    var _nextPage = 2;
    var _blockFetchingNextPages = false;
    var _notificationCount = baseNotificationCount;
    var _totalPages = Math.ceil(_notificationCount / 5);
    vm.notifications = baseNotifications;

    // functions definitions
    vm.addNotifications = addNotifications;
    vm.canFetchMoreNotifications = canFetchMoreNotifications;
    vm.fetchMoreNotifications = fetchMoreNotifications;

    ////////////////
    vm.addNotifications();

    function fetchMoreNotifications() {
      NotificationsData.fetchNotifications(_nextPage)
        .then(function FetchNotificationsSuccess(data) {
          angular.forEach(data, function (notification) {
            notification.type = notificationTypes[notification.alertType];
          });
          vm.notifications = vm.notifications.concat(data);
        }, function FetchNotificationsError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      _nextPage += 1;
    }

    function canFetchMoreNotifications() {
      return !_blockFetchingNextPages && _nextPage <= _totalPages;
    }

    function addNotifications() {
      angular.forEach(baseNotifications, function (notification) {
        notification.type = notificationTypes[notification.alertType];
      });
    }
  }
})();
