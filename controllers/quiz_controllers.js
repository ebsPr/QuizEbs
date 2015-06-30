var quiz = (function(){

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
   
    
})();

module.exports = quiz;