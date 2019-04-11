var mysql_query = require('../db/db_query')();
var table = require('../db/db_table');
var common = require('./common')();

var bFirst = true;


/////////
// GET //
/////////
exports.getTotalStores = function(req, res) {
	console.log("[====] call getTotalStores");
	var query = mysql_query.getTotalStores();
	common.doQuery(req, res, query);
};




//////////
// POST //
//////////
exports.postStore = function(req, res) {
	console.log("[====] call postStore");

    var query = mysql_query.postStore();
	var params = [];
	query = _checkParams(query, params, req.body.id, table.t_stores.id);
	
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


function _checkParams(query, params, val, str) {
	if (val != null && val != undefined) {
		if (bFirst) {
			query += " WHERE "; 
			bFirst = false;
		} else {
			query += " AND ";
		}		
		
		query = query + str + "=? ";
		params.push(val);
	}
	return query;
}