var quiz = (function(Quiz){
/*
    var question = function(req,res){
        res.render('quizes.ejs', { quiz: 'Capital de Italia' });
    };

    var answer = function(req,res){
        console.log(req.query.answer);
        var result = "Respuesta incorrecta";
        if (req.query.answer.trim().toUpperCase() == "ROMA"){
            result = "Respuesta correcta";
        }
        res.render('answer', { result: result });
    }
    
    return {
    
        question:question,
        answer:answer
    }
   
    */

    var search = function(req,res){
        res.render('quizes');    
    };
    var list = function(req,res){
        console.log("search param: " + req.query.search);
        Quiz.findAll({
                where:  ["pregunta LIKE '%" + req.query.search + "%'"],
                attributes: ['id','pregunta']
            }).then(function(quizes){
            console.log("*** : " + quizes);
            res.render('list',{quizes:quizes});
        });
    };
    var answer = function(req,res){
         res.render('answer', { result: result });
    }

    return {
        search:search,
        list:list,
        answer:answer
    }
});

module.exports = quiz;