var regneModel= require('../models/regneModel');
var utilisateurModel= require('../models/utilisateurModel');
var regnesApiController=function(){}

regnesApiController.index=function(req,res,next){
    regneModel.getAllRegne(function(err,regnes){
        if(err){
                throw err;
        }else{
            res.json({regnes:regnes});
        }
       
    });
}


module.exports=regnesApiController;