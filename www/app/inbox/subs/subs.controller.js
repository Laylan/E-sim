(function () {
  'use strict';

  angular
    .module('subs.module')
    .controller('SubsController', SubsController);

  SubsController.$inject = ['$scope', 'SubsData', 'baseSubs', 'baseSubsCount'];

  /* @ngInject */
  function SubsController($scope, SubsData, baseSubs, baseSubsCount) {


    var vm = this;
    vm.property = 'SubsController';

    // variables
    var _nextPage = 2;
    var _blockFetchingNextPages = false;
    var _subsCount = baseSubsCount;
    var _totalPages = Math.ceil(_subsCount / 5);
    vm.subs = baseSubs;

    // functions definitions
    vm.fetchMoreSubs = fetchMoreSubs;
    vm.canFetchMoreSubs = canFetchMoreSubs;

    // init functions

    ////////////////

    function fetchMoreSubs() {
      SubsData.fetchSubs(_nextPage)
        .then(function FetchSubsSuccess(data) {
          vm.subs = vm.subs.concat(data);
        }, function FetchSubsError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      _nextPage += 1;
    }

    function canFetchMoreSubs() {
      return !_blockFetchingNextPages && _nextPage <= _totalPages;
    }
  }
})();
