(function () {
  angular.module('app')
    .component('postForm', {
      templateUrl: '/form/form.template.html',
      controller: Controller
    });

    Controller.$inject = ['$http', '$stateParams'];
    function Controller($http, $stateParams) {
        const vm = this;
        vm.$onInit = () => {
          if ($stateParams.id) {
            $http.get('/api/posts/' + $stateParams.id)
            .then((res) => vm.post = res.data);
          }
        };

        vm.editMessage = () => {
          $http.patch('/api/posts/' + vm.post.id, vm.post)
            .then(() => {
              $http.get('/api/posts')
                .then(res => vm.posts = res.data);
            });

          delete vm.post;
        };

    }
})();
