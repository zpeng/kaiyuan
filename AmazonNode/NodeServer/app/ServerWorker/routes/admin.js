var express = require('express'),
    router = express.Router(),
    path = require('path'),
    isAuthenticated = function (req, res, next) {
		// if user is authenticated in the session, call the next() to call the next request handler 
		// Passport adds this method to request object. A middleware is allowed to add properties to
		// request and response objects
		if (req.isAuthenticated())
			return next();
		// if the user is not authenticated then redirect him to the login page
		// TODO: how to distinguish client and admin?
		res.redirect('/admin/');
	};

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	console.log('hello admin');
    	res.sendFile('index.html', { root: path.join(__dirname, '../admin') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('local', {
		successRedirect: '/admin/home.html',
		failureRedirect: '/admin/',
		failureFlash : true  
	}));
	// No signup page, account must be created by manager

	/* GET Home Page */
	router.get('/home.html', isAuthenticated, function(req, res){
		// console.log('isAuthenticated: '+isAuthenticated);
		res.sendFile('home.html', { root: path.join(__dirname, '../admin') });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.sendFile('index.html', { root: path.join(__dirname, '../admin') });
	});

	return router;
}