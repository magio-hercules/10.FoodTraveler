var mysql_query = require('../db/db_query')();
var table = require('../db/db_table');
var common = require('./common')();

var bFirst = true;


/////////
// GET //
/////////




//////////
// POST //
//////////
exports.postIngredient = function(req, res) {
	console.log("[====] call postIngredient");

    var query = mysql_query.postIngredient();
	var params = [];
	query = _checkParams(query, params, req.body.ingredient_list, '`id`');
	
	bFirst = true;
	common.doQuery(req, res, query, params);
};


exports.postCook = function(req, res) {
	console.log("[====] call postCook");

    var query = mysql_query.postCook();
	var params = [];
	query = _checkParams(query, params, req.body.cook_list, '`id`');
	
	bFirst = true;
	common.doQuery(req, res, query, params);
};


exports.postEat = function(req, res) {
	console.log("[====] call postEat");

    var query = mysql_query.postEat();
	var params = [];
	query = _checkParams(query, params, req.body.eat_list, '`id`');
	
	bFirst = true;
	common.doQuery(req, res, query, params);
};


exports.postHistory = function(req, res) {
	console.log("[====] call postHistory");

    var query = mysql_query.postHistory();
	var params = [];
	query = _checkParams(query, params, req.body.history_list, '`id`');
	
	bFirst = true;
	common.doQuery(req, res, query, params);
};


exports.postCaution = function(req, res) {
	console.log("[====] call postCaution");

    var query = mysql_query.postCaution();
	var params = [];
	query = _checkParams(query, params, req.body.caution_list, '`id`');
	
	bFirst = true;
	common.doQuery(req, res, query, params);
};






function _setParams(query, params, val, str) {
	if (val != null && val != undefined) {
		if (bFirst) {
			bFirst = false;
		} else {
			query += ", ";
		}		
		
		query = query + str + "=? ";
		params.push(val);
	}
	return query;
}


function _searchParams(query, params, val, str, bOr) {
	if (val != null && val != undefined) {
		if (bFirst) {
			query += " WHERE "; 
			bFirst = false;
		} else {
			if (bOr) {
				query += " OR ";
			} else {
				query += " AND ";
			}
		}		
		
		query = query + str + " like ? ";
		params.push("%" + val + "%");
	}
	return query;
}


function _checkParams(query, params, val, str, bOr) {
	if (val != null && val != undefined) {
		if (bFirst) {
			query += " WHERE "; 
			bFirst = false;
		} else {
			if (bOr) {
				query += " OR ";
			} else {
				query += " AND ";
			}
		}		
	
		console.log("[INFO] val : " + val);
		console.log("[INFO] typeof(val) : " + typeof(val));

		if (typeof(val) != 'string') {
			query = query + str + " in (" + val + ")";
		} else {
			query = query + str + "=? ";
		}
		
		params.push(val);
	}
	return query;
}