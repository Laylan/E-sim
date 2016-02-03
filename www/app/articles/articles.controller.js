(function() {
  'use strict';

  angular
    .module('articles.module')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', '$rootScope', '$ionicScrollDelegate', 'Toast', 'ArticlesData', 'articlesList'];

  function ArticlesController($scope, $rootScope, $ionicScrollDelegate, Toast, ArticlesData, articlesList) {

    // vars
    var vm = this;

    vm.pageTitle = 'Local Articles'; //?
    var _currntPage = 1;
    var _offersPerPage = 5;
    var _blockFetchingNextPages = false;
    var _currentOffersCount = articlesList.length;
    var id = 0;
    vm.articles = articlesList;
    vm.countryId = $rootScope.loggedPlayer.citizenshipId;

    // definitions
    vm.getMore = getMore;
    vm.canGetMoreArticles = canGetMoreArticles;

    // inits
    activate();
    $ionicScrollDelegate.scrollTop();

    function activate() {
      console.log(articlesList);
    }

    function getMore() {
      ArticlesData.fetchArticles(++_currntPage, vm.countryId)
        .then(function FetchJobOffersSuccess(data) {
          vm.articles = vm.articles.concat(data);
          _currentOffersCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function canGetMoreArticles() {
      return _currentOffersCount === _offersPerPage && !_blockFetchingNextPages;
      // return false;
    }
  }
})();
