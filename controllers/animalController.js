var animalModel= require('../models/animalModel');
var regneModel= require('../models/regneModel');
var animalController=function(){}

animalController.index=function(req,res,next){
    animalModel.getAllAnimal(function(err,animals){
        if(err){
                throw err;
        }else{
            res.render('animal/index',{title:'Animal Listing',animals:animals});
        }
       
    });
}
animalController.add=function(req,res,next){
    regneModel.getAllRegne(function (err, regnes) {
        res.render('animal/add', { title: 'Add Animal', regnes: regnes });
    });
}
animalController.save=function(req,res){
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
            proprietaire:req.sanitize('proprietaire').escape().trim(),
        }
        animalModel.insertAnimal(newAnimal,function(err){
         if(err){
             req.flash('error','There was error in inserting data');
         }else{
             req.flash('success','Animal added succesfully');
         }
        res.redirect('/animal');
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
        regneModel.getAllRegne(function (err, regnes) {
            req.flash('error', err_msg);
            res.render('animal/add', { title: 'Add Animal', regnes: regnes });
        });
    }
}
animalController.edit=function(req,res){
    var animalId=req.params.id;
    animalModel.findAnimalById(animalId,function(result){
        if(result==null){
            req.flash('error','Sorry the animal doesnot exists!!');
            res.redirect('/animal');
        }else{
            regneModel.getAllRegne(function(err,regnes){
                res.render('animal/edit',{title: 'Edit Animal',regnes:regnes,animal:result[0]});
            });
        }
    })
}

animalController.update=function(req,res){
    var animalId=req.params.id;
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
            proprietaire:req.sanitize('proprietaire').escape().trim(),
        }
        animalModel.updateAnimal(animalId,animal,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'Animal Information update successfully.');
                    res.redirect('/animal');
                }else{
                    req.flash('error', 'There was error in updating animal.');
                    res.redirect('/animal/edit/'+animalId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/animal/edit/'+animalId);
    }
}


module.exports=animalController;