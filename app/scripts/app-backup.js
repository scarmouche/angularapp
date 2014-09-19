'use strict';// var myApp = angular.module('app', []);// angular.module('app', ['firebase'])//     .constant('FIREBASE_URI', 'https://produce-app.firebaseio.com/')//     .factory('Data', ['$firebase', 'FIREBASE_URI', function($firebase, FIREBASE_URI) {//         var ref = new Firebase(FIREBASE_URI);//         var //     }])angular.module('app', [])    .factory('Data', [function() {        var produce = [{            "id": 0,            "kind": "vegetable",            "name": "Carrots",            "type": "root",            "color": "Orange",            "edit": false,            "vitamins": {"C": "x mg", "A": "x IU"},            "minerals": {"Iron": "x mg", "Magnesium": "x mg", "Calcium": "x mg"},            "sugars": "x g"        }, {            "id": 1,            "kind": "vegetable",            "name": "Kale",            "type": "Greens",            "color": "Red",            "edit": false,            "vitamins": {"K": "x mg", "A": "x IU"},            "minerals": {"Iron": "x mg", "Magnesium": "x mg", "Calcium": "x mg"},            "sugars": "x g"        }, {            "id": 2,            "kind": "vegetable",            "name": "Green Beans",            "type": "legume",            "color": "Green",            "edit": false,            "vitamins": {"C": "x mg", "E": "x IU"},            "minerals": {"Iron": "x mg", "Magnesium": "x mg", "Calcium": "x mg"},            "sugars": "x g"        }, {            "id": 3,            "kind": "vegetable",            "name": "Beets",            "type": "root",            "color": "Red",            "edit": false,            "vitamins": {"K": "x mg", "E": "x IU"},            "minerals": {"Iron": "x mg", "Magnesium": "x mg", "Calcium": "x mg"},            "sugars": "x g"        }, {            "id": 4,            "kind": "fruit",            "name": "Bananas",            "type": "starch",            "color": "Yellow",            "edit": false,            "vitamins": {"A": "x mg"},            "minerals": {"Iron": "x mg", "Magnesium": "x mg", "Calcium": "x mg"},            "sugars": "x g"        }, {            "id": 5,            "kind": "fruit",            "name": "Oranges",            "type": "citrus",            "color": "Orange",            "edit": false,            "vitamins": {"K": "x mg"},            "minerals": {"Iron": "x mg", "Magnesium": "x mg", "Calcium": "x mg"},            "sugars": "x g"        }, {            "id": 6,            "kind": "fruit",            "name": "Apples",            "type": "seed",            "color": "Green",            "edit": false,            "vitamins": {"E": "x mg", "K": "x mg", "A": "x mg"},            "minerals": {"Iron": "x mg", "Magnesium": "x mg", "Calcium": "x mg"},            "sugars": "x g"        }, {            "id": 7,            "kind": "fruit",            "name": "Peaches",            "type": "stone",            "color": "Orange",            "edit": false,            "vitamins": {"C": "x mg", "A": "x IU"},            "minerals": {"Iron": "x mg", "Magnesium": "x mg", "Calcium": "x mg"},            "sugars": "x g"        }];        var getProduce = function() {            return produce;        }        var colors = [{            "id": 0,            "col": "Red"        }, {            "id": 1,            "col": "Orange"        }, {            "id": 2,            "col": "Yellow"        }, {            "id": 3,            "col": "Green"        }, {            "id": 4,            "col": "Blue"        }, {            "id": 5,            "col": "Purple"        }, {            "id": 6,            "col": "Brown"        }, {            "id": 7,            "col": "Black"        }, {            "id": 6,            "col": "Pink"        }];        var getColors = function() {            return colors;        }        var kinds = [{             "id": 0,            "k": "Vegetable"        }, {             "id": 1,            "k": "Fruit"        }];        var getKinds = function() {            return kinds;        }        var vitamins = [{             "id": 0,            "vit": "A"        }, {             "id": 1,            "vit": "C"        }, {             "id": 1,            "vit": "D"        }, {             "id": 1,            "vit": "E"        }, {             "id": 1,            "vit": "K"        }];        var getVitamins = function() {            return vitamins;        }        return {            getProduce: getProduce,            getColors: getColors,            getKinds: getKinds,            getVitamins: getVitamins        }    }])    .controller("MainCtrl", ['$scope', 'Data', function($scope, Data) {        $scope.produce = Data.getProduce();        $scope.colors = Data.getColors();        $scope.kinds = Data.getKinds();        $scope.vitamins = Data.getVitamins();        	// Creating and Editing States        $scope.isCreating = false;        $scope.isEditing = false;        function startCreating() {            $scope.isCreating = true;            $scope.isEditing = false;            clearEdit();        }        function cancelCreating() {            $scope.isCreating = false        }        function startEditing() {            $scope.isCreating = false;            $scope.isEditing = true;        }        function cancelEditing() {            $scope.isEditing = false;            clearEdit();        }        function shouldShowCreating() {            return !$scope.isEditing;        }        function shouldShowEditing() {            return !$scope.isCreating;        }        $scope.startCreating = startCreating;        $scope.cancelCreating = cancelCreating;        $scope.startEditing = startEditing;        $scope.cancelEditing = cancelEditing;        $scope.shouldShowCreating = shouldShowCreating;        $scope.shouldShowEditing = shouldShowEditing;       // EDITING ITEM        $scope.editedItem = null;      function resetEdits(items) {          for (var i=0, iLen = items.length; i < iLen; i++) {              items[i].edit = false;          }      }      function clearEdit() {          resetEdits($scope.produce);          $scope.editedItem = null;      }      $scope.resetEdits = resetEdits;      $scope.clearEdit = clearEdit;      function setEditedItem(item) {        clearEdit();        item.edit = true;        $scope.editedItem = angular.copy(item);      }      function updateItem(item) {        var index = _.findIndex($scope.produce, function(p) {            return p.id === item.id;        });        $scope.produce[index] = item;        $scope.editedItem = null;        $scope.isEditing = false;        cancelEditing();      }      function isSelectedItem(itemId) {        return $scope.editedItem !== null && $scope.editedItem.id === itemId;      }      $scope.isSelectedItem = isSelectedItem;      $scope.setEditedItem = setEditedItem;      $scope.updateItem = updateItem;      // DELETING ITEM             function deleteItem(item) {        var result = confirm("Are you sure you want to delete?");        if (result==true) {            _.remove($scope.produce, function(p) {            return p.id === item.id            });        }      }      $scope.deleteItem = deleteItem;      // CREATING ITEM      $scope.newItem = {	        'name' : null,	        'kind' : null,	        'type' : null,	        'color' : null,	        'edit' : false	    };			function resetCreateForm() {            $scope.newItem = {                'name' : null,                'kind' : null,                'type' : null,                'color' : null,                'edit' : false            };        }        function createItem(item) {            item.edit = false;            item.id = $scope.produce.length;            $scope.produce.push(item);            cancelCreating();            resetCreateForm();        }        $scope.resetCreateForm = resetCreateForm;        $scope.createItem = createItem;        $scope.currentColor = null;        function setCurrentColor(color) {            $scope.currentColor = color;            cancelCreating();            cancelEditing();        }        function isCurrentColor(color) {            return $scope.currentColor !== null && color.col.toLowerCase() === $scope.currentColor.col.toLowerCase();        }           $scope.currentKind = null;        function setCurrentKind(kind) {            $scope.currentKind = kind;            cancelCreating();            cancelEditing();        }        function isCurrentKind(kind) {            return $scope.currentKind !== null && kind.k.toLowerCase() === $scope.currentKind.k.toLowerCase();        }        $scope.setCurrentColor = setCurrentColor;        $scope.isCurrentColor = isCurrentColor;        $scope.setCurrentKind = setCurrentKind;        $scope.isCurrentKind = isCurrentKind;    }])		.directive('editForm', function() {	    return {	    	restrict: 'E',	      templateUrl: 'partials/edit-form.html'	    };	  })	  .directive('createForm', function() {	    return {	    	restrict: 'E',	      templateUrl: 'partials/create-form.html'	    };	  })      .directive('kindList', function() {        return {            restrict: 'A',          templateUrl: 'partials/kind-list.html'        };      })      .directive('colorList', function() {        return {            restrict: 'A',          templateUrl: 'partials/color-list.html'        };      })    ;