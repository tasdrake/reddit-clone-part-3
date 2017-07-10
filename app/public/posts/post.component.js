(function () {
  angular.module('app')
    .component('singlePost', {
      templateUrl: './posts/post.template.html',
      controller: Controller,
      bindings: { post: '=' }
  });

  Controller.$inject = ['$state', 'postService'];
    function Controller($state, postService) {
      const vm = this;

      vm.decrease = () => {
        if (vm.post.vote_count > 0) {
          vm.post.vote_count--;
          postService.deleteComment(vm.post.id);
        }
      };
      vm.increase = () => {
        vm.post.vote_count++;
        postService.postComment(vm.post.id);
      };
      vm.toggleComments = () => {
        if (vm.commentOpen) {
          vm.commentOpen = false;
        } else {
          vm.commentOpen = true;
        }
      };
    }
})();
