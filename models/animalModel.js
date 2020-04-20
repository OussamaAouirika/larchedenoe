var sql= require('../db');

var animalModel={

}
animalModel.getAllAnimal=function(result){
    sql.query("SELECT animal.idAnimal,animal.nom,animal.age,animal.poids,regne.nomregne,regne.provenance,regne.espace,utilisateur.login FROM animal JOIN regne, utilisateur WHERE regneAnimal = idRegne and proprietaire = idUser",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
animalModel.insertAnimal=function(newAnimal,result)
{
    sql.query("INSERT INTO animal SET ?",newAnimal,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
animalModel.findAnimalById=function(animalId,result){
    sql.query("SELECT * from animal WHERE idAnimal ="+animalId,function(err,rows){
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

animalModel.updateAnimal=function(animalId,animal,result){
    sql.query("UPDATE animal SET  ? WHERE id="+animalId,animal,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
module.exports=animalModel;