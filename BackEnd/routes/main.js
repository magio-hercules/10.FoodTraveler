var express = require('express');
var router = express.Router();


// controller
var controller_contents = require('../controllers/contents');
var controller_food 	= require('../controllers/foods');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	// console.log('Time: ', Date.now());
	next();
});

// router.get('/', function(req, res) {
// 	res.redirect('/mycl');
// });

router.get('/', function(req, res) {
	res.send('Welcome to FoodTraveler');
});


/////////
// GET //
/////////
router.get('/total_foods', 				controller_food.getTotalFoods);



//////////
// POST //
//////////

// food
router.post('/food',					controller_food.postFood);
router.post('/description',				controller_food.postDescription);


module.exports = router;