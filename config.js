var config = (function(app){
    
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var partials = require('express-partials');

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(partials());
    //app.locals._layoutFile = '/views/layout.ejs';

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/images/favicon.ico'));
    app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

  
    
})

module.exports = config;