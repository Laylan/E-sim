(function () {
  'use strict';

  angular
    .module('job-market.module')
    .controller('JobMarketController', JobMarketController);

  JobMarketController.$inject = ['$rootScope', '$ionicScrollDelegate', '$scope', '$q', '$ionicPopup', '$state', 'JobMarketData', 'Toast', 'baseJobOffers', 'baseJobOfferCount', 'countries', 'workData'];

  /* @ngInject */
  function JobMarketController($rootScope, $ionicScrollDelegate, $scope, $q, $ionicPopup, $state, JobMarketData, Toast, baseJobOffers, baseJobOfferCount, countries, workData) {

    // vars
    var vm = this;
    vm.property = 'JobMarketController';
    var _nextPage = 2;
    var _blockFetchingNextPages = false;
    var _jobOfferCount = baseJobOfferCount;
    var _minimalEcoSkill = 0;
    var _countryId = $rootScope.loggedPlayer.citizenshipId;
    vm.jobOffers = baseJobOffers;
    vm.countryId = $rootScope.loggedPlayer.citizenshipId;
    vm.minimalEcoSkill = 0;
    vm.countries = countries;
    console.log(countries);
    vm.hideFilter = true;
    vm.workData = workData;

    // definitions
    vm.toggleFilter = toggleFilter;
    vm.fetchMoreOffers = fetchMoreOffers;
    vm.canFetchMoreOffers = canFetchMoreOffers;
    vm.showToast = showToast;
    vm.applyForm = applyForm;
    vm.applyForJob = applyForJob;
    vm.showConfirm = showConfirm;

    //inits
    $ionicScrollDelegate.scrollTop();

    ////////////////


    function toggleFilter(toggle) {
      vm.hideFilter = !toggle;
    }

    function fetchMoreOffers() {
      JobMarketData.fetchJobOffers(_nextPage, _countryId, _minimalEcoSkill)
        .then(function FetchJobOffersSuccess(data) {
          vm.jobOffers = vm.jobOffers.concat(data);
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      _nextPage += 1;
    }

    function canFetchMoreOffers() {
      return _blockFetchingNextPages || Math.ceil(_jobOfferCount / 5) + 1 !== _nextPage;
    }

    function showToast() {
      Toast("You already have a job!");
    }

    function applyForm() {
      _minimalEcoSkill = vm.minimalEcoSkill;
      _countryId = vm.countryId;
      _nextPage = 2;
      var countPromise = JobMarketData.fetchJobOfferCount(_countryId, _minimalEcoSkill);
      var offerPromise = JobMarketData.fetchJobOffers(1, _countryId, _minimalEcoSkill);
      $q.all({
          count: countPromise,
          offer: offerPromise
        })
        .then(function FormUpdateSuccess(data) {
          //  console.log(data);
          _jobOfferCount = data['count'];
          vm.jobOffers = data['offer'];
        }, function FormUpdateFailure(msg) {
          Toast(msg);
          _blockFetchingNextPages = true;
        });
    }

    function applyForJob(offerId) {
      JobMarketData.applyForJob(offerId)
        .then(function Success() {
          $state.go('main.work');
        }, function Error(msg) {
          Toast(msg);
        });
    }

    function showConfirm(jobId) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Apply to job.',
        template: 'Are you sure you want to apply?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          vm.applyForJob(jobId);
        }
      });
    }
  }

})();
