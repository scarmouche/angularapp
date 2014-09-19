'use strict';

myApp.directive('editForm', function() {
    return {
    	restrict: 'E',
      templateUrl: 'partials/edit-form.html'
    };
});

myApp.directive('createForm', function() {
    return {
    	restrict: 'E',
      templateUrl: 'partials/create-form.html'
    };
});

myApp.directive('kindList', function() {
    return {
        restrict: 'A',
      templateUrl: 'partials/kind-list.html'
    };
});

myApp.directive('colorList', function() {
    return {
        restrict: 'A',
      templateUrl: 'partials/color-list.html'
    };
});