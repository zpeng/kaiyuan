'use strict';

require('angular');
var app = angular.module('MapApp', []);

app.controller('MapCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.currentTime = new Date();
	$interval(function(){
		$scope.currentTime = new Date();
	} , 1000);

	$scope.couriers = [
	  { id: '1',
	    longitude: 44.5403,
	    latitude: -78.5463,
	    lastUpdate: 123451 // ms
	  },
	  { id: '2',
	    longitude: 48.5403,
	    latitude: -80.5463,
	    lastUpdate: 123452 // ms
	  },
	  { id: '3',
	    longitude: 40.5403,
	    latitude: -82.5463,
	    lastUpdate: 123453 // ms
	  }
	];

	$scope.user = {
		longitude: 0,
		latitude: 0
	}

	$scope.buttonClick = function() {
		alert('button clicked when user is at ('+ $scope.user.longitude +',' +$scope.user.latitude+')');
	}

}]);

	