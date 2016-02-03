(function() {
  'use strict';

  angular
    .module('open-article.module')
    .controller('OpenArticleController', OpenArticleController);

  OpenArticleController.$inject = ['$scope','$rootScope', '$ionicScrollDelegate', 'Toast', 'OpenArticleData', 'articleData', 'articleCommentsData'];

  function OpenArticleController($scope, $rootScope, $ionicScrollDelegate, Toast, OpenArticleData, articleData, articleCommentsData) {

    // vars
    var vm = this;
    vm.pageTitle = 'Open articles'; //?
    vm.article = articleData;
    vm.comments = articleCommentsData;
    var _currntPage = 1;
    var _blockFetchingNextPages = false;
    var _currentCommentsCount = articleCommentsData.length;
    var _commentsPerPage = 5;
    vm.message = '';
    vm.showChangeLog = false;

    // definitions
    vm.showProfile = showProfile;
    vm.showMore = showMore;
    vm.writeComment = writeComment;
    vm.getMore = getMore;
    vm.canGetMoreComments = canGetMoreComments;

    // inits
    activate();

    function activate() {
      console.log(articleCommentsData);
    }

    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }

    function showMore() {
      vm.showChangeLog = !vm.showChangeLog;
    }

    function writeComment() {
        OpenArticleData.sendComment(vm.article.id, vm.message)
        .then(function Success() {
          var date = new Date();
          var newComment = [{
            "citizen": $rootScope.loggedPlayer,
            "message": vm.message,
            "isPremium": $rootScope.loggedPlayer.premium,
            "time": date.getTime()
          }];
          vm.comments = newComment.concat(vm.comments);
          vm.message = '';
          vm.showChangeLog = false;
          $ionicScrollDelegate.scrollTop();
        }, function Error(msg) {
          Toast(msg);
        });
     }

    function getMore() {
      OpenArticleData.fetchComments(++_currntPage, vm.article.id)
        .then(function fetchComments(data) {
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
      return _currentCommentsCount === _commentsPerPage && !_blockFetchingNextPages;
    }
  }
})();
