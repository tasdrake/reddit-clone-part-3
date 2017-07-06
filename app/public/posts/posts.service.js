(function() {
  'use strict';

  angular
    .module('app')
    .service('postService', service);

  service.$inject = ['$http'];
  function service($http) {
    this.get = () => {
      return $http.get('/api/posts')
        .then(res => res.data);
    };
  }

}());
