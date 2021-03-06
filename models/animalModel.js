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
    let stmt = "INSERT INTO animal (nom,age,poids,regneAnimal,proprietaire) VALUES (?,?,?,?,?)";
    let tab = [newAnimal.nom,newAnimal.age,newAnimal.poids,newAnimal.regne,newAnimal.proprietaire];
    sql.query(stmt,tab,function(err,res){
        if(err){
            console.log("ERREUR SQLLLLLL");
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

animalModel.updateAnimal=function(animalId,newAnimal,result){

    console.log("ID ANIMAL :"+animalId);
    let stmt = "UPDATE  animal SET nom = ? ,age = ? ,poids = ? , regneAnimal = ?,proprietaire = ? where idAnimal ="+animalId;
    let tab = [newAnimal.nom,newAnimal.age,newAnimal.poids,newAnimal.regne,newAnimal.proprietaire];
    sql.query(stmt,tab,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}

animalModel.deleteAnimal=function(animalId,result){
    sql.query("DELETE FROM animal WHERE idAnimal="+animalId,function(err,rows){
        if(err)
        result(err); 

        return result(rows);
    });
}
module.exports=animalModel;