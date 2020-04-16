var regneModel= require('../models/regneModel');
var regneController=function(){}

regneController.index=function(req,res,next){
    regneModel.getAllRegne(function(err,regnes){
        if(err){
                throw err;
        }else{
            res.render('regne/index',{title:'Regne Listing',regnes:regnes});
        }
       
    });
}
regneController.add=function(req,res,next){
    res.render('regne/add',{title:'Add Regne'});
}
regneController.save=function(req,res){
    req.assert('nomRegne', 'Nom is required').notEmpty(); 
    req.assert('provenance', 'Provenance is required').notEmpty();      
    req.assert('espace', 'Espace is required').notEmpty(); 


 
    var errors = req.validationErrors();
    if( !errors ) {
        var newRegne={
            nomRegne:req.sanitize('nomRegne').escape().trim(),
            provenance:req.sanitize('provenance').escape().trim(),
            espace:req.sanitize('espace').escape().trim()
        }
        regneModel.insertRegne(newRegne,function(err){
         if(err){
             req.flash('error','There was error in inserting data');
         }else{
             req.flash('success','regne added succesfully');
         }
        res.redirect('/regne');
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.render('regne/add',{title:'Add Regne'});
    }
}
regneController.edit=function(req,res){
    var regneId=req.params.id;
    regneModel.findRegneById(regneId,function(result){
        if(result==null){
            req.flash('error','Sorry the regne doesnot exists!!');
            res.redirect('/regne');
        }else{
          res.render('regne/edit',{title:'Edit Regne',regne:result});
        }
    })
}

regneController.update=function(req,res){
    var regneId=req.params.id;
    req.assert('nomRegne', 'Nom is required').notEmpty(); 
    req.assert('provenance', 'Provenance is required').notEmpty();      
    req.assert('espace', 'Espace is required').notEmpty();   


    var errors = req.validationErrors();
    if( !errors ) {
        var regne={
            nomRegne:req.sanitize('nomRegne').escape().trim(),
            provenance:req.sanitize('provenance').escape().trim(),
            espace:req.sanitize('espace').escape().trim()
        }
        regneModel.updateRegne(regneId,regne,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'regne Information update successfully.');
                    res.redirect('/regne');
                }else{
                    req.flash('error', 'There was error in updating regne.');
                    res.redirect('/regne/edit/'+regneId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/regne/edit/'+regneId);
    }s
}


module.exports=regneController;