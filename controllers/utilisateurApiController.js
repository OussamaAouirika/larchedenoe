var regneModel= require('../models/regneModel');
var utilisateurModel= require('../models/utilisateurModel');
var utilisateurApiController=function(){}

utilisateurApiController.index=function(req,res,next){
    utilisateurModel.getAllUtilisateur(function(err,users){
        if(err){
                throw err;
        }else{
            res.json({users:users});
        }
       
    });
}


module.exports=utilisateurApiController;