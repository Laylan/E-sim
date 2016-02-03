(function () {
  'use strict';

  angular
    .module('local-shouts-list.module')
    .controller('LocalShoutsListController', LocalShoutsListController);

  LocalShoutsListController.$inject = ['$scope', '$rootScope','$ionicScrollDelegate', '$ionicModal', '$state', 'Toast', 'LocalShoutsListData', 'LocalShoutsData', 'UserData', 'shout', 'comments'];

  /* @ngInject */
  function LocalShoutsListController($scope, $rootScope, $ionicScrollDelegate, $ionicModal, $state, Toast, LocalShoutsListData, LocalShoutsData, UserData, shout, comments) {

    // vars
    var vm = this;
    vm.property = 'LocalShoutsListController';
    vm.comments = comments;
    vm.shout = shout;
    var _commntPage = 1;
    var _blockFetchingNextPages = false;
    var _currentCommentsCount = comments.length;
    var _commentsPerPage = 5;
    var id = 0;
    vm.votes = {};
    vm.showChangeLog = false;
    vm.message = '';

    // definitions
    vm.writeComment = writeComment;
    vm.showProfile = showProfile;
    vm.showVotes = showVotes;
    vm.getMore = getMore;
    vm.canGetMoreComments = canGetMoreComments;
    vm.initModal = initModal;
    vm.showMore = showMore;

    //inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////
    function showMore() {
      vm.showChangeLog = !vm.showChangeLog;
    }

    function writeComment() {
      console.log('write comment');
      LocalShoutsData.sendShout(vm.shout.id, vm.message, false, false, false, false, '')
        .then(function Success() {
          console.log('napisano i wyslano');
          var date = new Date();
          var newComment = [{
            "citizen": $rootScope.loggedPlayer,
            "message": vm.message,
            "isPremium": $rootScope.loggedPlayer.premium,
            "time": date.getTime()
          }]
          vm.comments = vm.comments.concat(newComment);
          vm.message = '';
          vm.showChangeLog = false;
        }, function Error(msg) {
          console.log('lipa');
          Toast(msg);
        });
    }

    function showProfile(id) {
      $state.go('main.profile', {
        profileId: id
      });
    }

    function showVotes() {
      _commntPage = 0;
      LocalShoutsListData.fetchVotes(vm.shout.id)
        .then(function FetchJobOffersSuccess(data) {
          vm.votes = data;
        }, function FetchJobOffersError(error) {
          Toast(error);
          console.log(error);
        });
    }

    function getMore() {
      console.log('----------GetMore-----------');
      LocalShoutsListData.fetchComments(shout.id, ++_commntPage)
        .then(function FetchJobOffersSuccess(data) {
          vm.comments = vm.comments.concat(data);
          _currentCommentsCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function canGetMoreComments() {
      console.log('############getMoreComments');
      return _currentCommentsCount === _commentsPerPage && !_blockFetchingNextPages;
    }

    /* ------------ Modal ------------ */
    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/localShouts/localShoutsList/votes-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.openVotesModal = function () {
        vm.showVotes();
        if (vm.votes.length === 0) {
          Toast('No votes!');
        } else {
          vm.modal.show();
        }

      };
      vm.closeVotesModal = function () {
        vm.modal.hide();
      };
      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }

})();
