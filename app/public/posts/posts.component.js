(function () {
  angular.module('app')
    .component('posts', {
      templateUrl: './posts/posts.template.html',
      controller: Controller,
  });

  Controller.$inject = ['$http', '$state', 'postService'];
  function Controller($http, $state, postService) {
    const vm = this;

    vm.$onInit = function () {
      vm.sortName = 'Votes';
      $http.get('/api/posts').then(res => vm.posts = res.data);
      // postService.get().then(posts => vm.posts = posts);
    };
    vm.togglePost = () => {
      if (vm.postOpen) {
        vm.postOpen = false;
      } else {
        vm.postOpen = true;
      }
    };
    vm.postMessage = () => {
      $http.post('/api/posts', vm.post)
        .then(() => {
          $http.get('/api/posts')
            .then(res => vm.posts = res.data);
        });
      delete vm.post;
      vm.postOpen = false;
    };
  }
})();
