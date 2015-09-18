var demoApp = angular.module('demoApp', ['ngRoute']);

demoApp.config(function($routeProvider) {
  $routeProvider
    .when('/view1', {
      controller: 'SimpleController',
      templateUrl: 'view1.html'
    })
    .when('/view2', {
      controller: 'SimpleController',
      templateUrl: 'view2.html'
    })
    .otherwise({
      redirectTo: '/view1'
    });
});


demoApp.service('lastEnteredCustomer', function() {
  var lastCustomer = {};
    lastCustomer.name = "new customer";
    lastCustomer.city = "new city";
  return {
    getCustomer: function(){
      return lastCustomer;
    },
    setCustomer: function(value) {
        lastCustomer = value;
    }
  };
});

demoApp.factory('simpleFactory', function() {
  var customers = [{
    name: 'Nick',
    city: 'Phoenix'
  }, {
    name: 'gorge',
    city: 'London'
  }, {
    name: 'Mary',
    city: 'Paris central'
  }, {
    name: 'Alena',
    city: 'San Jose West'
  }];
  var factory = {};
  factory.getCustomers = function(){
    return customers;
  };
  factory.postCustomer = function(newCustomer) {
      customers.push({
        name: newCustomer.name,
        city: newCustomer.city
      });

  };
  return factory;
});

demoApp.controller('SimpleController', function($scope, simpleFactory, lastEnteredCustomer) {
  $scope.customers = [];
  init();
  function init() {
    $scope.customers = simpleFactory.getCustomers();
      $scope.newCustomer = lastEnteredCustomer.getCustomer();
  }
  $scope.addCustomer = function() {
      simpleFactory.postCustomer($scope.newCustomer);
      lastEnteredCustomer.setCustomer($scope.newCustomer);
  }
});
