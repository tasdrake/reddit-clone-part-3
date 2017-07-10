(function () {
  angular.module('app')
    .component('postComment', {
      templateUrl: './posts/comment.template.html',
      controller: Controller,
      bindings: { post: '=' }
  });
  Controller.$inject = ['$http', '$state', 'postService'];
  function Controller($http, $state, postService) {
    const vm = this;
    vm.postComment = () => {
      postService.postComments(vm.post.id, vm.comment)
        .then(comment => vm.post.comments.push(comment));
      delete vm.comment;
    };
  }
})();
