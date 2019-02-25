var express = require('express');
var router = express.Router();


// controller
var controller_contents = require('../controllers/contents');
var controller_food 	= require('../controllers/foods');
var controller_info 	= require('../controllers/information');


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

// info
router.post('/ingredient',				controller_info.postIngredient);
router.post('/cook',					controller_info.postCook);
router.post('/eat',						controller_info.postEat);
router.post('/history',					controller_info.postHistory);
router.post('/caution',					controller_info.postCaution);


module.exports = router;