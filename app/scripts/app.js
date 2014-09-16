'use strict';

angular.module('app', [])
    .controller("MainCtrl", function($scope) {
    	// Creating and Editing States
        $scope.isCreating = false;
        $scope.isEditing = false;

        function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;
            clearEdit();
        }

        function cancelCreating() {
            $scope.isCreating = false
        }

        function startEditing() {
            $scope.isCreating = false;
            $scope.isEditing = true;
        }

        function cancelEditing() {
            $scope.isEditing = false;
            clearEdit();
        }

        function shouldShowCreating() {
            return !$scope.isEditing;
        }

        function shouldShowEditing() {
            return !$scope.isCreating;
        }

        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;
        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;
        $scope.shouldShowCreating = shouldShowCreating;
        $scope.shouldShowEditing = shouldShowEditing;

        // Editing & Creating 

        $scope.editedItem = null;

      function resetEdits(items) {
          for (var i=0, iLen = items.length; i < iLen; i++) {
              items[i].edit = false;
          }
      }

      function clearEdit() {
          resetEdits($scope.produce);
          $scope.editedItem = null;
      }

      $scope.resetEdits = resetEdits;
      $scope.clearEdit = clearEdit;

      function setEditedItem(item) {
        clearEdit();
        item.edit = true;
        $scope.editedItem = item;
      }

      function updateItem(item) {
        cancelEditing();
      }

      function isSelectedItem(itemId) {
        return $scope.editedItem !== null && $scope.editedItem.id === itemId;
      }

      $scope.isSelectedItem = isSelectedItem;
      $scope.setEditedItem = setEditedItem;
      $scope.updateItem = updateItem;

      $scope.newItem = {
	        'name' : null,
	        'kind' : null,
	        'type' : null,
	        'color' : null,
	        'edit' : false
	    };

			function resetCreateForm() {
            $scope.newItem = {
                'name' : null,
                'kind' : null,
                'type' : null,
                'color' : null,
                'edit' : false
            };
        }


        function createItem(item) {
            item.edit = false;
            item.id = $scope.produce.length;
            $scope.produce.push(item);
            cancelCreating();
            resetCreateForm();
        }

        $scope.resetCreateForm = resetCreateForm;
        $scope.createItem = createItem;

        $scope.produce = [{
            "id": 0,
            "kind": "vegetable",
            "name": "Carrots",
            "type": "root",
            "color": "orange",
            "edit": false
        }, {
            "id": 1,
            "kind": "vegetable",
            "name": "Kale",
            "type": "greens",
            "color": "green, red, purple",
            "edit": false
        }, {
            "id": 2,
            "kind": "vegetable",
            "name": "Green Beans",
            "type": "legume",
            "color": "green",
            "edit": false
        }, {
            "id": 3,
            "kind": "vegetable",
            "name": "Beets",
            "type": "root",
            "color": "red",
            "edit": false
        }, {
            "id": 4,
            "kind": "fruit",
            "name": "Bananas",
            "type": "starch",
            "color": "yellow",
            "edit": false
        }, {
            "id": 5,
            "kind": "fruit",
            "name": "Oranges",
            "type": "citrus",
            "color": "orange",
            "edit": false
        }, {
            "id": 6,
            "kind": "fruit",
            "name": "Apples",
            "type": "seed",
            "color": "green, red, yellow",
            "edit": false
        }, {
            "id": 7,
            "kind": "fruit",
            "name": "Peaches",
            "type": "stone",
            "color": "orange, yellow",
            "edit": false
        }];

        // Colors
        $scope.colors = [{
            "id": 0,
            "col": "red"
        }, {
            "id": 1,
            "col": "orange"
        }, {
            "id": 2,
            "col": "yellow"
        }, {
            "id": 3,
            "col": "green"
        }, {
            "id": 4,
            "col": "blue"
        }, {
            "id": 5,
            "col": "purple"
        }, {
            "id": 6,
            "col": "brown"
        }];

        $scope.currentColor = null;

        function setCurrentColor(color) {
            $scope.currentColor = color;
            cancelCreating();
            cancelEditing();
        }

        function isCurrentColor(color) {
            return $scope.currentColor !== null && color.col === $scope.currentColor.col;
        }

        $scope.setCurrentColor = setCurrentColor;
        $scope.isCurrentColor = isCurrentColor;
    })

		.directive('editForm', function() {
	    return {
	    	restrict: 'E',
	      templateUrl: 'partials/edit-form.html'
	    };
	  })

	  .directive('createForm', function() {
	    return {
	    	restrict: 'E',
	      templateUrl: 'partials/create-form.html'
	    };
	  })

    ;