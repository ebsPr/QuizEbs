var express = require('express');
var config = require('./config.js');
var path = require('path');
var routes = require('./routes/index');
var quiz = require('./controllers/quiz_controllers.js');

var app = express();
// módulo de condiguración
config(app);
// módulo quiz

app.get('/quizes/question',quiz.question);
app.get('/quizes/answer',quiz.answer);


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
