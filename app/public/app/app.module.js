(function() {
  'use strict';
  angular
    .module('app', ['angularMoment', 'ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'post',
        url: '/',
        component: 'post'
      })
      .state({
        name: 'edit',
        url: '/posts/:id/edit',
        component: 'edit'
      });
  }
}());
