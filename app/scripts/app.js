'use strict';// var myApp = angular.module('app', []);var myApp = angular.module('app', ['firebase']);myApp.constant('FIREBASE_URI', 'https://produce-app.firebaseio.com/produce');myApp.factory('Data', ['$firebase', 'FIREBASE_URI', function($firebase, FIREBASE_URI) {    var ref = new Firebase(FIREBASE_URI);    var sync = $firebase(ref);    var produce = sync.$asArray();    var getProduce = function() {        return produce;    }    var colors = [{        "id": 0,        "col": "Red"    }, {        "id": 1,        "col": "Orange"    }, {        "id": 2,        "col": "Yellow"    }, {        "id": 3,        "col": "Green"    }, {        "id": 4,        "col": "Blue"    }, {        "id": 5,        "col": "Purple"    }, {        "id": 6,        "col": "Brown"    }, {        "id": 7,        "col": "Black"    }, {        "id": 6,        "col": "Pink"    }];    var getColors = function() {        return colors;    };    var kinds = [{         "id": 0,        "k": "vegetable"    }, {         "id": 1,        "k": "fruit"    }];    var getKinds = function() {        return kinds;    };    var vitamins = [{        "id": "A",         "slug": "vitaminA",        "name": "Vitamin A"    }, {         "id": "C",         "slug": "vitaminC",        "name": "Vitamin C"    }, {         "id": "D",         "slug": "vitaminD",        "name": "Vitamin D"    }, {         "id": "E",         "slug": "vitaminE",        "name": "Vitamin E"    }, {         "id": "K",         "slug": "vitaminK",        "name": "Vitamin K"    }];    var getVitamins = function() {        return vitamins;    };    return {        getProduce: getProduce,        getColors: getColors,        getKinds: getKinds,        getVitamins: getVitamins    };}]);