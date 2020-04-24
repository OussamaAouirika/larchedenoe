var animalModel= require('../models/animalModel');
var regneModel= require('../models/regneModel');
var utilisateurModel= require('../models/utilisateurModel');
var animalController=function(){}

animalController.index=function(req,res,next){
    animalModel.getAllAnimal(function(err,animals){
        if(err){
                throw err;
        }else{
            res.json({animals:animals});
        }
       
    });
}

animalController.add=function(req,res,next){
    regneModel.getAllRegne(function (err, regnes) {
        utilisateurModel.getAllUtilisateur(function (err, users) {
            res.render('animal/add', { title: 'Add Animal', regnes: regnes, users:users});
        });
    });
}
animalController.save=function(req,res){
    console.log("DANS LE SAAAAVEEEE :   ");
    req.assert('nom', 'Nom is required').notEmpty(); 
    req.assert('age', 'Age is required').notEmpty();      
    req.assert('poids', 'Size is required').notEmpty(); 
    req.assert('regne', 'Regne is required').notEmpty(); 
    req.assert('proprietaire', 'Proprietaire is required').notEmpty(); 


 
    var errors = req.validationErrors();
    if( !errors ) {
        var newAnimal={
            nom:req.sanitize('nom').escape().trim(),
            age:req.sanitize('age').escape().trim(),
            poids:req.sanitize('poids').escape().trim(),
            regne:req.sanitize('regne').escape().trim(),
            proprietaire:req.sanitize('proprietaire').escape().trim()
        }
        console.log("POIDS ANIMAL:"+newAnimal.poids);
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
animalController.edit=function(req,res){
    var animalId=req.params.idAnimal;
    console.log("SALUTTTTTTTTTT :   "+animalId);
    animalModel.findAnimalById(animalId,function(result){
        if(result==null){
            req.flash('error','Sorry the animal doesnot exists!!');
            res.redirect('/animal');
        }else{
            regneModel.getAllRegne(function(err,regnes){
                utilisateurModel.getAllUtilisateur(function (err, users) {
                    res.render('animal/edit',{title: 'Edit Animal',regnes:regnes,users:users,animal:result[0]});
                });
            });
        }
    })
}

animalController.update=function(req,res){
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
animalController.delete=function(req,res){
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

module.exports=animalController;