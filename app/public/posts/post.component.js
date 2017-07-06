(function () {
  angular.module('app')
    .component('singlePost', {
      templateUrl: './posts/post.template.html',
      controller: Controller,
      bindings: { post: '=' }
  });

  Controller.$inject = ['$http', '$state'];
  function Controller($http, $state) {
    const vm = this;

    vm.decrease = (post) => {
      if (post.votes > 0) {
        post.votes--;
      }
      $http.patch('/api/posts/' + post.id, post)
        .then(() => {
          $http.get('/api/posts')
            .then(res => vm.posts = res.data);
        });
    };
    vm.increase = (post) => {
      post.vote_count++;
      const body = {
        title: post.title,
        body: post.body,
        vote_count: post.vote_count,
        id: post.id,
        author: post.author,
        image_url: post.image_url
      };

      $http.patch('/api/posts/' + post.id, body)
        .then(() => {
          $http.get('/api/posts')
            .then(res => vm.posts = res.data);
        });
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
