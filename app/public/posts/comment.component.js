(function () {
  angular.module('app')
    .component('postComment', {
      templateUrl: './posts/comment.template.html',
      controller: Controller,
      bindings: { post: '=' }
  });
  Controller.$inject = ['$http', '$state'];
  function Controller($http, $state) {
    const vm = this;
    vm.postComment = () => {
      $http.post('api/posts/' + vm.post.id + '/comments', { content: vm.comment })
        .then(res => vm.post.comments.push(res.data));
      delete vm.comment;
    };
  }
})();
