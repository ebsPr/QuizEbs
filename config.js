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


    // Postgres DATABASE_URL = postgres://user:passwd@host:port/database
    // SQLite   DATABASE_URL = sqlite://:@:/
    var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
    var DB_name  = (url[6]||null);
    var user     = (url[2]||null);
    var pwd      = (url[3]||null);
    var protocol = (url[1]||null);
    var dialect  = (url[1]||null);
    var port     = (url[5]||null);
    var host     = (url[4]||null);
    var storage  = process.env.DATABASE_STORAGE;

    // Cargar Modelo ORM
    var Sequelize = require('sequelize');

    // Usar BBDD SQLite o Postgres
    var sequelize = new Sequelize(DB_name, user, pwd, 
      { dialect:  protocol,
        protocol: protocol,
        port:     port,
        host:     host,
        storage:  storage,  // solo SQLite (.env)
        omitNull: true      // solo Postgres
      }      
    );
    exports.sequelize = sequelize;

    var Quiz = sequelize.import(path.join(__dirname,'quiz'));

    exports.Quiz = Quiz;

    sequelize.sync().success(function(){
        Quiz.count().success(function(count){
            if(count == 0){
                Quiz.create(
                         {pregunta:"Capital de Italia", respuesta: "Roma"}
                    );
            }else{
                console.log("tabla quiz ya inicializada")           
            }
        });
    });
    
    
})

module.exports = config;