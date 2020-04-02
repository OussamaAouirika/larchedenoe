var express=require('express');
var routes= express.Router();
var controllers= require('../controllers');



//home page routes
routes.get('/',controllers.homeController.index);

//animal routes
routes.get('/animal',controllers.animalController.index);
routes.get('/animal/add',controllers.animalController.add);
routes.post('/animal/add',controllers.animalController.save);
routes.get('/animal/edit/(:id)',controllers.animalController.edit);
routes.post('/animal/edit/(:id)',controllers.animalController.update);

module.exports=routes;