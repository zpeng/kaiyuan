'use strict';

var request = require('request'),
    browserify = require('browserify-middleware'),
    express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    favicon = require('serve-favicon'),

    // ioClient: connections with client
    ioClient = require('socket.io')(http),
    port = process.argv[2];

// browserify.settings.mode = 'production';
app.get('/admin/home.js', browserify('./admin/home.js'));

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(favicon('./favicon.ico'));

var passport = require('passport'),
    expressSession = require('express-session'),
    adminRoutes = require('./routes/admin')(passport),
    userRoutes = require('./routes/user')(passport);

app.use(expressSession({
    secret: 'SessionSecretKey',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());    

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

app.use('/admin', adminRoutes); // admininistration
app.use('/', userRoutes); // user authentications
app.use(express.static(__dirname)); // rest pages

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

http.listen(port, function(){
    console.log('worker server is listening on *:'+port);
});