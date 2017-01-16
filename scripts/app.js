'use strict';

/**
 * @ngdoc overview
 * @name expensetrackerApp
 * @description
 * # expensetrackerApp
 *
 * Main module of the application.
 */
angular
  .module('expensetrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/download_apk', {
        templateUrl: 'views/download_apk.html',
        controller: 'ApkCtrl',
        controllerAs: 'apk'
      });
      
  });
