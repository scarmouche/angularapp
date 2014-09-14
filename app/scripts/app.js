'use strict';

angular.module('app', [])
    .controller("MainCtrl", function($scope) {
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

        $scope.vegetables = [{
            "id": 0,
            "kind": "vegetable",
            "name": "Carrots",
            "type": "root",
            "color": ["orange"],
            "edit": false
        }, {
            "id": 1,
            "kind": "vegetable",
            "name": "Kale",
            "type": "greens",
            "color": ["green", "red", "purple"],
            "edit": false
        }, {
            "id": 2,
            "kind": "vegetable",
            "name": "Green Beans",
            "type": "legume",
            "color": ["green"],
            "edit": false
        }, {
            "id": 3,
            "kind": "vegetable",
            "name": "Beets",
            "type": "root",
            "color": ["red"],
            "edit": false
        }];

        $scope.fruits = [{
            "id": 0,
            "kind": "fruit",
            "name": "Bananas",
            "color": ["yellow"],
            "edit": false
        }, {
            "id": 1,
            "kind": "fruit",
            "name": "Oranges",
            "color": ["orange"],
            "edit": false
        }, {
            "id": 2,
            "kind": "fruit",
            "name": "Apples",
            "color": ["green", "red", "yellow"],
            "edit": false
        }, {
            "id": 3,
            "kind": "fruit",
            "name": "Peaches",
            "color": ["orange", "yellow"],
            "edit": false
        }];

        $scope.kinds = [$scope.fruits, $scope.vegetables];

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

        // Crud

        function resetCreateForm() {
            $scope.newItem = {
                name: '',
                kind: '',
                type: '',
                color: '',
                edit: false
            };
        }

        function createItem(item) {
            item.edit = false;
            var kind = item.kind;
            if (kind === "vegetable") {
                item.id = $scope.vegetables.length;
            } else {
                item.id = $scope.fruits.length;
            }

            item.color = jQuery.makeArray(item.color);
            item.color = item.color[0].split(", ");

            if (kind === "vegetable") {
                $scope.vegetables.push(item);
            } else {
                $scope.fruits.push(item);
            }
            resetCreateForm();
        }

        $scope.resetCreateForm = resetCreateForm;
        $scope.createItem = createItem;

        $scope.editedItem = null;

        function resetEdits(items) {
            for (var i=0, iLen = items.length; i < iLen; i++) {
                items[i].edit = false;
            }
        }

        function clearEdit() {
            for (var i=0, iLen = $scope.kinds.length; i < iLen; i++) {
                resetEdits($scope.kinds[i]);
            }
        }

        $scope.resetEdits = resetEdits;
        $scope.clearEdit = clearEdit;

        function setEditedItem(item) {
            clearEdit();
            $scope.editedItem = item;
            $scope.editedItem.edit = true;
            console.log($scope.vegetables[0].color)
        }

        $scope.setEditedItem = setEditedItem;

    });