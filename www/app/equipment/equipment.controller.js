(function () {
  'use strict';

  angular
    .module('equipment.module')
    .controller('EquipmentController', EquipmentController);

    EquipmentController.$inject = ['$scope', '$state', '$ionicScrollDelegate', '$ionicModal', '$ionicActionSheet', 'Toast', 'EquipmentData', 'equipped', 'equipmentList', 'battleStats'];

  /* @ngInject */
  function EquipmentController($scope, $state, $ionicScrollDelegate, $ionicModal, $ionicActionSheet, Toast, EquipmentData, equipped, equipmentList, battleStats) {


    var vm = this;
    vm.property = 'EquipmentController';

    // variables
    vm.showScrollTo = false;
    vm.position = $ionicScrollDelegate.getScrollPosition().top;
    vm.showChangeLog = false;
    vm.equipped = equipped;
    vm.equipmentList = equipmentList;
    vm.battleStats = battleStats;
    vm.selectedToMerge = [];
    vm.qualitySelected = false;
    vm.countSelected =  0;

    // functions definitions
    vm.initPosition = initPosition;
    vm.scrollToTop = scrollToTop;
    vm.showMore = showMore;
    vm.initModal = initModal;
    vm.equPutOn = equPutOn;
    vm.equPutOff = equPutOff;
    vm.reloadEquipment = reloadEquipment;
    vm.splitEquipment = splitEquipment;
    vm.mergeEquipment = mergeEquipment;
    vm.toggleSelection = toggleSelection;
    //vm.initActionSheet = initActionSheet;

    // init functions
    vm.initPosition();
    vm.scrollToTop();
    vm.initModal();
    //vm.initActionSheet();

    ////////////////

    function toggleSelection(equ) {
      var id = equ.id;
      var idx = vm.selectedToMerge.indexOf(id);
      // is currently selected

      console.log('toggleSelection');
      console.log(id);
      console.log(equ);
      console.log(vm.selectedToMerge);
      console.log(vm.selectedToMerge.length);
      console.log(vm.qualitySelected);
      if (idx > -1) {
        //vm.qualitySelected === equ.quality;
        vm.selectedToMerge.splice(idx, 1);
      }
      // is newly selected
      else {
        vm.qualitySelected = equ.quality;
        vm.selectedToMerge.push(id);
      }
      console.log(vm.selectedToMerge);
      console.log(vm.selectedToMerge.length);
      vm.countSelected = vm.selectedToMerge.length;
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

    function showMore(){
      vm.showChangeLog = !vm.showChangeLog;
    }

    function equPutOn() {
      EquipmentData.putOn(vm.currentEquip.id)
        .then(function Success() {
          vm.reloadEquipment();
          vm.closeEquipmentModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }

    function equPutOff() {
      EquipmentData.putOff(vm.currentEquip.id)
        .then(function Success() {
          vm.reloadEquipment();
          vm.closeEquipmentModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }

    function splitEquipment(){
      console.log('split equipment');
      console.log(vm.currentEquip);
      EquipmentData.split(vm.currentEquip.id)
        .then(function Success() {
          vm.reloadEquipment();
          vm.closeEquipmentModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }
    function mergeEquipment(){
      console.log('merge equipment');
      console.log(vm.selectedToMerge[0]);
      console.log(vm.selectedToMerge[1]);
      console.log(vm.selectedToMerge[2]);
      EquipmentData.merge(vm.selectedToMerge[0], vm.selectedToMerge[1], vm.selectedToMerge[2])
        .then(function Success() {
          console.log('succes');
          vm.reloadEquipment();
          vm.closeEquipmentModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }
    function reloadEquipment(){
      EquipmentData.fetchEquipmentOn()
      .then(function FetchJobOffersSuccess(data) {
        vm.equipped = data;
      }, function FetchJobOffersError(error) {
        Toast(error);
      });

      EquipmentData.fetchEquipmentOff()
      .then(function FetchJobOffersSuccess(data) {
        vm.equipmentList = data;
      }, function FetchJobOffersError(error) {
        Toast(error);
      });

      EquipmentData.fetchStats()
      .then(function FetchJobOffersSuccess(data) {
        vm.battleStats = data;
      }, function FetchJobOffersError(error) {
        Toast(error);
      });
    }

    function initActionSheet() {
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: '<b>See details</b>'
        }, {
          text: 'Merge selected'
        }],
        destructiveText: 'Delete',
        titleText: 'Merging equipment',
        cancelText: 'Cancel',
        cancel: function() {

        },
        buttonClicked: function(index) {
          return true;
        }
      });

    // For example's sake, hide the sheet after two seconds
  /*  $timeout(function() {
      hideSheet();
    }, 2000);*/
  }

    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/equipment/equipment-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.openEquipmentModal = function (eq) {
        vm.currentEquip = eq;
        if (vm.currentEquip === undefined) {
          Toast('This slot is empty!');
        } else {
          vm.modal.show();
        }
      };
      vm.closeEquipmentModal = function () {
        vm.modal.hide();
      };
      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }
})();
