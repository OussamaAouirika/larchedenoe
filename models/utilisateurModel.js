var sql= require('../db');

var utilisateurModel={

}
utilisateurModel.getAllUtilisateur=function(result){
    sql.query("SELECT * FROM utilisateur",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
utilisateurModel.insertUtilisateur=function(newUtilisateur,result)
{
    sql.query("INSERT INTO utilisateur SET ?",newUtilisateur,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
utilisateurModel.findUtilisateurById=function(utilisateurId,result){
    sql.query("SELECT * FROM utilisateur WHERE idUser ="+utilisateurId,function(err,rows){
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

utilisateurModel.updateUtilisateur=function(utilisateurId,utilisateur,result){
    sql.query("UPDATE utilisateur SET  ? WHERE id="+utilisateurId,utilisateur,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
module.exports=utilisateurModel;