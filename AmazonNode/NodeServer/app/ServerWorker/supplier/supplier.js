'use strict';

require('angular');
require('angular-socket-io');
var app = angular.module('SupperlierApp', ['btford.socket-io']);

app.factory('statSocket', function (socketFactory) {
  return socketFactory({
  	ioSocket: io.connect('http://54.213.152.139/supplier')
  	// ioSocket: io.connect('http://localhost/client')  	
  });
});

app.controller('SupperlierCtrl', ['$scope', 'statSocket', '$interval', function($scope, socket, $interval) {
	$scope.currentTime = new Date();
	$interval(function(){
		$scope.currentTime = new Date();
	} , 1000);

	$scope.orders = [];

	$scope.user = {
		longitude: 0,
		latitude: 0
	}

	socket.on('connect', function () {
		console.log('socket connection with server established.');
	});

	socket.on('hello message', function (msg) {
		alert('server says '+msg);
	});

}]);

	