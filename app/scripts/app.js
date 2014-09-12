'use strict';

angular.module('app', [])
.controller("MainCtrl", function($scope) {
  $scope.colors = [
    {"id": 0, "col": "red"},
    {"id": 1, "col": "orange"},
    {"id": 2, "col": "yellow"},
    {"id": 3, "col": "green"},
    {"id": 4, "col": "blue"},
    {"id": 5, "col": "purple"},
    {"id": 6, "col": "brown"}
  ];

  $scope.vegetables = [
    {"id": 0, "name": "Carrots", "type": "root", "color": ["orange"]}, 
    {"id": 1, "name": "Kale", "type": "greens", "color": ["green", "red", "purple"]},
    {"id": 2, "name": "Green Beans", "type": "legume", "color": ["green"]},
    {"id": 3, "name": "Beets", "type": "root", "color": ["red"]}
  ];

  $scope.fruits = [
    {"id": 0, "name": "Bananas", "color": ["yellow"]}, 
    {"id": 1, "name": "Oranges", "color": ["orange"]},
    {"id": 2, "name": "Apples", "color": ["green", "red", "yellow"]},
    {"id": 3, "name": "Peaches", "color": ["orange", "yellow"]}
  ]; 

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
    color: ''
  };
}

function createItem(item) {
  var kind = item.kind;
  if (kind === "vegetables") {
    item.id = $scope.vegetables.length;
  } else {
    item.id = $scope.fruits.length;
  }

  item.color = jQuery.makeArray(item.color);
  item.color = item.color[0].split(", ");

  if (kind === "vegetables") {
    $scope.vegetables.push(item);
  } else {
    $scope.fruits.push(item);
  }

  resetCreateForm();
} 

 $scope.resetCreateForm = resetCreateForm;
 $scope.createItem = createItem;

function isVeggie(item) {
  console.log(item.kind);
}

 $scope.isVeggie = isVeggie;


});


