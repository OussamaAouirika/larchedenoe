var homeController=function(){}

homeController.index=function(req,res){
    req.flash('Félicitations!', 'Bienvenue à tous dans mon animalerie')
    res.render('home/index',{title:'L ARCHE DE NOÉ'});
}

module.exports=homeController;