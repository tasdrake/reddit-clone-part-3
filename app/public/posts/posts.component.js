(function () {
  angular.module('app')
    .component('posts', {
      templateUrl: './posts/posts.template.html',
      controller: Controller,
  });

  Controller.$inject = ['$state', 'postService'];

      function Controller($state, postService) {
        const vm = this;

        vm.$onInit = function() {
          vm.sortName = 'Votes';
          postService.getAll()
            .then(posts => vm.posts = posts);
        };

        vm.togglePost = () => {
          if (vm.postOpen) {
            vm.postOpen = false;
          } else {
            vm.postOpen = true;
          }
        };

    }
})();
