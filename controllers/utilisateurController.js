var utilisateurModel= require('../models/utilisateurModel');
var utilisateurController=function(){}

utilisateurController.index=function(req,res,next){
    utilisateurModel.getAllUtilisateur(function(err,users){
        if(err){
                throw err;
        }else{
            res.render('utilisateur/index',{title:'User Listing',users:users});
        }
       
    });
}


utilisateurController.index2=function(req,res,next){
    utilisateurModel.getAllUtilisateur(function(err,users){
        if(err){
                throw err;
        }else{
            res.send(users);
        }
       
    });
}
utilisateurController.add=function(req,res,next){
    res.render('utilisateur/add',{title:'Add Utilisateur'});
}
utilisateurController.save=function(req,res){
    req.assert('login', 'Login is required').notEmpty(); 

    var errors = req.validationErrors();
    if( !errors ) {
        var newUtilisateur={
            login:req.sanitize('login').escape().trim()
        }
        utilisateurModel.insertUtilisateur(newUtilisateur,function(err){
         if(err){
             req.flash('error','There was error in inserting data');
         }else{
             req.flash('success','utilisateur added succesfully');
         }
        res.redirect('/utilisateur');
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.render('utilisateur/add',{title:'Add Utilisateur'});
    }
}
utilisateurController.edit=function(req,res){
    var utilisateurId=req.params.id;
    utilisateurModel.findUtilisateurById(utilisateurId,function(result){
        if(result==null){
            req.flash('error','Sorry the utilisateur doesnot exists!!');
            res.redirect('/utilisateur');
        }else{
          res.render('utilisateur/edit',{title:'Edit Utilisateur',utilisateur:result});
        }
    })
}

utilisateurController.update=function(req,res){
    var utilisateurId=req.params.id;
    req.assert('login', 'Login is required').notEmpty();  


    var errors = req.validationErrors();
    if( !errors ) {
        var utilisateur={
            login:req.sanitize('login').escape().trim()
        }
        utilisateurModel.updateUtilisateur(utilisateurId,utilisateur,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'utilisateur Information update successfully.');
                    res.redirect('/utilisateur');
                }else{
                    req.flash('error', 'There was error in updating utilisateur.');
                    res.redirect('/utilisateur/edit/'+utilisateurId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/utilisateur/edit/'+utilisateurId);
    }s
}


module.exports=utilisateurController;