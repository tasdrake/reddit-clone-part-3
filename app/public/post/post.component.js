(function () {
  angular.module('app')
    .component('post', {
      templateUrl: './post/post.template.html',
      controller: Controller
  });

  Controller.$inject = ['$http', '$state'];
  function Controller($http, $state) {
    const vm = this;

    vm.$onInit = function () {
      vm.sortName = 'Votes';
      $http.get('/api/posts').then(res => vm.posts = res.data);
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
    vm.toggleComments = (post) => {
      if (post.commentOpen) {
        post.commentOpen = false;
      } else {
        post.commentOpen = true;
      }
    };
    vm.postComment = (post) => {
      $http.post('api/posts/' + post.id + '/comments', { content: vm.post.comment })
        .then(res => post.comments.push(res.data));
      delete vm.post.comment;
    };
    
    // vm.edit = (post) => {
    //   $state.go('edit', { id: post.id });
    // };
  }
})();
