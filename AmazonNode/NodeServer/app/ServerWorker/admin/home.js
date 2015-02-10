'use strict';

require('angular');
require('angular-socket-io');
var app = angular.module('AdminApp', ['btford.socket-io']);

app.factory('statSocket', function (socketFactory) {
  return socketFactory({
  	ioSocket: io.connect('http://localhost:3001/admin')
  });
});
app.controller('AdminCtrl', ['$scope', 'statSocket', '$interval', function($scope, socket, $interval) {
	$scope.currentTime = new Date();
	$interval(function(){
		$scope.currentTime = new Date();
	} , 1000);

	socket.on('connect', function () {
		console.log('socket connected with server');
	});

}]);

	