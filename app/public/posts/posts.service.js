(function() {
  'use strict';

  angular
    .module('app')
    .service('postService', service);

  service.$inject = ['$http', '$stateParams', '$state'];

  function service($http, $stateParams, $state) {
    this.getAll = () => {
      return $http.get('/api/posts')
        .then(res => res.data);
    };

    this.get = (id) => {
      return $http.get(`/api/posts/${id}`)
        .then(res => res.data);
    };

    this.patch = (id, post) => {
      return $http.patch(`/api/posts/${id}`, post);
    };

    this.post = (post) => {
      return $http.post('/api/posts', post)
        .then(res => res.data);
    };

    this.postComments = (id, comment) => {
      return $http.post(`/api/posts/${id}/comments`, { content: comment })
        .then(res => res.data);
    };

    this.deleteComment = (id) => {
      $http.delete(`/api/posts/${id}/votes`);
    }

    this.postComment = (id) => {
      $http.post(`/api/posts/${id}/votes`);
    }
  }
}());
