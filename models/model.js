var models = (function(){

        var path = require('path');

        console.log('** ' + process.env.DATABASE_URL);
        var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
        console.log('** ' + url);

        var DB_name  = (url[6]||null); console.log('DB_name' + DB_name);
        var user     = (url[2]||null); console.log('user' + user);
        var pwd      = (url[3]||null); console.log('pwd' + pwd);
        var protocol = (url[1]||null); console.log('protocol' + protocol);
        var dialect  = (url[1]||null); console.log('dialect' + dialect);
        var port     = (url[5]||null); console.log('port' + port);
        var host     = (url[4]||null); console.log('host' + host);

        var storage  = process.env.DATABASE_STORAGE;
        console.log('storage' + storage);

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
        
        //exports.sequelize = sequelize;

        var Quiz = sequelize.import(path.join(__dirname,'quiz'));

        //exports.Quiz = Quiz;

        sequelize.sync().success(function(){
            Quiz.count().success(function(count){
                console.log("count: " + count);
                if(count == 0){
                    Quiz.create(
                        {pregunta:"Capital de Italia", respuesta: "Roma"}
                    );
                }else if (count == 1){
                    Quiz.create(
                        {pregunta:"Capital de Portugal", respuesta: "Lisboa"}
                    );
                }else{
                    console.log("tabla quiz ya inicializada")           
                }
            });
        });

        return{
            Quiz:Quiz,
            Sequelize:sequelize
        }

    }
)();

module.exports = models;
