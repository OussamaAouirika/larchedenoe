var animalModel= require('../models/animalModel');
var regneModel= require('../models/regneModel');
var utilisateurModel= require('../models/utilisateurModel');
var animalApiController=function(){}

animalApiController.index=function(req,res,next){
    animalModel.getAllAnimal(function(err,animals){
        if(err){
                throw err;
        }else{
            res.json({animals:animals});
        }
       
    });
}


animalApiController.save=function(req,res){
    console.log("DANS LE SAAAAVEEEE :   ");
    req.assert('nom', 'Nom is required').notEmpty(); 
    req.assert('age', 'Age is required').notEmpty();      
    req.assert('poids', 'Size is required').notEmpty(); 
    req.assert('regne', 'Regne is required').notEmpty(); 
    req.assert('proprietaire', 'Proprietaire is required').notEmpty(); 


 
    var errors = req.validationErrors();
    if( !errors ) {
        console.log("regne AVANT ANIMAL:"+req.sanitize('regne'));
        var newAnimal={
            nom:req.sanitize('nom').escape().trim(),
            age:req.sanitize('age').escape().trim(),
            poids:req.sanitize('poids').escape().trim(),
            regne:req.sanitize('regne').escape().trim(),
            proprietaire:req.sanitize('proprietaire').escape().trim()
        }
        console.log("proprio ANIMAL:"+newAnimal.proprietaire);
        console.log("regne ANIMAL:"+newAnimal.regne);
        console.log("age ANIMAL:"+newAnimal.age);
        console.log("poids ANIMAL:"+newAnimal.poids);
        console.log("nom ANIMAL:"+newAnimal.nom);

        animalModel.insertAnimal(newAnimal,function(err){
         if(err){
             req.flash('error','There was error in inserting data');
         }else{
             req.flash('success','Animal added succesfully');
         }
        res.json({'message':'successssss!!!'});
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
        regneModel.getAllRegne(function (err, regnes) {
            utilisateurModel.getAllUtilisateur(function (err, users) {
                req.flash('error', err_msg);
                res.json({'message':'Error invalid data for animal ;-('});
             //   res.render('animal/add', { title: 'Add Animal', regnes: regnes, users:users });
            });
        });
    }
}


animalApiController.update=function(req,res){
    console.log("DANS LE UPDATE :   "+animalId);
    var animalId=req.params.idAnimal;
    req.assert('nom', 'Nom is required').notEmpty(); 
    req.assert('age', 'Age is required').notEmpty();
    req.assert('poids', 'Poids is required').notEmpty();   
    req.assert('regne', 'Regne is required').notEmpty();   
    req.assert('proprietaire', 'Proprietaire is required').notEmpty();   


    var errors = req.validationErrors();
    if( !errors ) {
        var animal={
            nom:req.sanitize('nom').escape().trim(),
            age:req.sanitize('age').escape().trim(),
            poids:req.sanitize('poids').escape().trim(),
            regne:req.sanitize('regne').escape().trim(),
            proprietaire:req.sanitize('proprietaire').escape().trim()
        }
        animalModel.updateAnimal(animalId,animal,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'Animal Information update successfully.');
                    res.json({'messge':'animal updated succesfully ;-)'});
                }else{
                    req.flash('error', 'There was error in updating animal.');
                    res.json({'message':'Error with updating animal ;-('});
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.json({'message':'Error invalid data for animal ;-('});
//         res.redirect('/animal/edit/'+animalId);
    }
}
animalApiController.delete=function(req,res){
    var animalId=req.params.idAnimal;
    console.log("DELEEEETION :   "+animalId);
    animalModel.deleteAnimal(animalId,function(result){
        if(result==null){
            req.flash('error','Sorry the animal cannot be deleted !!');
            res.json({'message':'error for delete'});
        }else{
            req.flash('success', 'Animal Information deleted successfully.');
            res.json({'message':'Successsss your animal is deleted'});
        }
    })
}

module.exports=animalApiController;