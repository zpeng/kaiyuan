'use strict';

require('angular');
require('angular-socket-io');
var app = angular.module('MapApp', ['btford.socket-io']);

app.factory('statSocket', function (socketFactory) {
  return socketFactory({
  	ioSocket: io.connect('http://54.213.152.139/client')
  	// ioSocket: io.connect('http://localhost/client')  	
  });
});

app.controller('MapCtrl', ['$scope', 'statSocket', '$interval', function($scope, socket, $interval) {
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

	socket.on('connect', function () {
		console.log('socket connection with server established.');
	});

	socket.on('hello message', function (msg) {
		alert('server says '+msg);
	});

}]);

	