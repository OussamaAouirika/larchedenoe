var express=require('express');
var routes= express.Router();
var controllers= require('../controllers');



//home page routes
routes.get('/',controllers.homeController.index);

//animal routes
routes.get('/animal',controllers.animalController.index);
routes.get('/animal/add',controllers.animalController.add);
routes.post('/animal/add',controllers.animalController.save);
routes.get('/animal/edit/(:idAnimal)',controllers.animalController.edit);
routes.get('/animal/delete/(:idAnimal)',controllers.animalController.delete);
routes.post('/animal/edit/(:idAnimal)',controllers.animalController.update);

//API animal routes
routes.get('/api/animals',controllers.animalApiController.index);
routes.post('/api/animals',controllers.animalApiController.save);
routes.put('/api/animals/(:idAnimal)',controllers.animalApiController.update);
routes.delete('/api/animals/(:idAnimal)',controllers.animalApiController.delete);


module.exports=routes;