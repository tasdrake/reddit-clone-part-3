(function () {
  angular.module('app')
    .component('postComment', {
      templateUrl: './posts/comment.template.html',
      controller: Controller,
      bindings: { post: '=' }
  });
  console.log('out');
  Controller.$inject = ['$http', '$state'];
  function Controller($http, $state) {
    const vm = this;
    console.log('cont');
    vm.postComment = () => {
      $http.post('api/posts/' + vm.post.id + '/comments', { content: vm.comment })
        .then(res => vm.post.comments.push(res.data));
      delete vm.comment;
    };
  }
})();
