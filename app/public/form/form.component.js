(function () {
  angular.module('app')
    .component('postForm', {
      templateUrl: '/form/form.template.html',
      controller: Controller,
      bindings: { buttonname: '@', posts: '=', open: '='}
    });
    Controller.$inject = ['$stateParams', '$state', 'postService'];

        function Controller($stateParams, $state, postService) {
          const vm = this;
          vm.$onInit = () => {
            if ($stateParams.id) {
              postService.get($stateParams.id)
                .then(post => vm.post = post);
            }
          };
          vm.submitpost = () => {
            if ($stateParams.id) {
              postService.patch(vm.post.id, vm.post)
                .then(() => $state.go('posts'));
            } else {
              postService.post(vm.post)
                .then((post) => {
                  post.comments = [];
                  vm.posts.push(post);
                });
                vm.open = false;
            }
          };

    }
})();
