(function() {
  'use strict';

  angular
    .module('open-article.module')
    .factory('OpenArticleData', OpenArticleData);

  OpenArticleData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  function OpenArticleData($http, $ionicLoading, $rootScope, $q, $log, Toast) {
    // return functions
    var exports = {
      fetchArticle: fetchArticle,
      fetchComments: fetchComments,
      sendComment: sendComment
    };

    return exports;

    function fetchArticle(articleId) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });

      $http.get($rootScope.server.address + '/localArticles/article?articleId=' + articleId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log(msg);
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);

      return deferred.promise;
    }

    function fetchComments(page, articleId) {
      var deferred = $q.defer();
      // $ionicLoading.show({
      //   template: 'Loading...'
      // });
console.log('fetchComments');
      $http.get($rootScope.server.address + '/articleComments/comments?page=' + page + '&articleId=' + articleId)
        .success(function(data) {
          console.log(data);
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log(msg);
          $log.error(msg);
          deferred.reject(msg);
        });
        // .finally($ionicLoading.hide);

      return deferred.promise;
    }
    function sendComment(articleId, body) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/writeComment', {
          articleId: articleId,
          body: body,
        })
        .success(function(data) {
          deferred.resolve("OK");
          Toast("sent!");
        })
        .error(function(msg) {
          console.log(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
  }
})();
