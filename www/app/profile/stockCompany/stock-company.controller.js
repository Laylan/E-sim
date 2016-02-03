(function () {
  'use strict';

  angular
    .module('stock-company.module')
    .controller('StockCompanyController', StockCompanyController);

  StockCompanyController.$inject = ['$scope', '$state', '$ionicScrollDelegate', 'UserData', 'stockCompanyData'];

  /* @ngInject */
  function StockCompanyController($scope, $state, $ionicScrollDelegate, UserData, stockCompanyData) {

    // vars
    var vm = this;
    vm.property = 'StockCompanyController';
    vm.stockCompanyData = stockCompanyData;

    // definitions
    vm.getLiderProfile = getLiderProfile;
    vm.showProfile = showProfile;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.getLiderProfile();

    ////////////////

    function getLiderProfile() {
      console.log('get lider profile');
      UserData.fetchProfile(stockCompanyData.ceoId)
        .then(function FetchJobOffersSuccess(data) {
          vm.liderProfile = data;
          console.log(data);
          //   _currentProductCount = data.length;
        }, function FetchJobOffersError(error) {
          console.log(error);
          Toast(error);
          //   _blockFetchingNextPages = true;
        });
    }

    function showProfile(id) {
      console.log('show profile of lider');
      $state.go('main.profile', {
        profileId: id
      });
    }
  }

})();
