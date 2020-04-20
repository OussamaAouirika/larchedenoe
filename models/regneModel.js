var sql= require('../db');

var regneModel={

}
regneModel.getAllRegne=function(result){
    sql.query("SELECT * FROM regne",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
regneModel.insertRegne=function(newRegne,result)
{
    sql.query("INSERT INTO regne SET ?",newRegne,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
regneModel.findRegneById=function(regneId,result){
    sql.query("SELECT * FROM regne WHERE idRegne ="+regneId,function(err,rows){
        if(err)
            throw err;
      
        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }   
    })
}

regneModel.updateRegne=function(regneId,regne,result){
    sql.query("UPDATE regne SET  ? WHERE id="+regneId,regne,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
regneModel.getRegneById=function(regneId,result){
    sql.query("SELECT regne.* FROM regne WHERE idRegne="+regneId,function(err,rows){
        if(err)
            return result(err);

        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }  
    });
}
//TODO delete
regneModel.deleteRegne=function(regneId,regne,result){
    sql.query("UPDATE regne SET  ? WHERE id="+regneId,regne,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
module.exports=regneModel;