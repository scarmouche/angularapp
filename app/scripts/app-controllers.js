'use strict';

myApp.controller("MainCtrl", ['$scope', 'Data', function($scope, Data) {
    $scope.produce = Data.getProduce();
    $scope.colors = Data.getColors();
    $scope.kinds = Data.getKinds();
    $scope.vitamins = Data.getVitamins();


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

    // CREATING ITEM
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
        $scope.produce.$add(item);
        cancelCreating();
        resetCreateForm();
    }

    $scope.resetCreateForm = resetCreateForm;
    $scope.createItem = createItem;

    // EDITING ITEM
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
        $scope.editedItem = angular.copy(item);
    }

    function updateItem(item) {
        $scope.produce.$save(item);

        $scope.editedItem = null;
        $scope.isEditing = false;
        cancelEditing();
    }

    function isSelectedItem(itemId) {
        return $scope.editedItem !== null && $scope.editedItem.id === itemId;
    }

    $scope.isSelectedItem = isSelectedItem;
    $scope.setEditedItem = setEditedItem;
    $scope.updateItem = updateItem;

    // DELETING ITEM 
    function deleteItem(item) {
        var result = confirm("Are you sure you want to delete?");
        if (result==true) {
            $scope.produce.$remove(item);
        }
    }

    $scope.deleteItem = deleteItem;

    $scope.currentColor = null;

    function setCurrentColor(color) {
        $scope.currentColor = color;
        cancelCreating();
        cancelEditing();
    }
    function isCurrentColor(color) {
        return $scope.currentColor !== null && color.col.toLowerCase() === $scope.currentColor.col.toLowerCase();
    }   

    $scope.currentKind = null;

    function setCurrentKind(kind) {
        $scope.currentKind = kind;
        cancelCreating();
        cancelEditing();
    }

    function isCurrentKind(kind) {
        return $scope.currentKind !== null && kind.k.toLowerCase() === $scope.currentKind.k.toLowerCase();
    }

    $scope.setCurrentColor = setCurrentColor;
    $scope.isCurrentColor = isCurrentColor;
    $scope.setCurrentKind = setCurrentKind;
    $scope.isCurrentKind = isCurrentKind;

}]);