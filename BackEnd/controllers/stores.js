var mysql_query = require('../db/db_query')();
var table = require('../db/db_table');
var common = require('./common')();

var bFirst = true;

/////////
// GET //
/////////
exports.getTotalStores = function(req, res) {
	console.log('[====] call getTotalStores');
	var query = mysql_query.getTotalStores();
	common.doQuery(req, res, query);
};

exports.getTotalClasses = function(req, res) {
	console.log('[====] call getTotalClasses');
	var query = mysql_query.getTotalClasses();
	common.doQuery(req, res, query);
};

//////////
// POST //
//////////
exports.postStore = function(req, res) {
	console.log('[====] call postStore');

	var query = mysql_query.postStore();
	var params = [];
	query = _checkParams(query, params, req.body.id, table.t_stores.id);

	bFirst = true;
	common.doQuery(req, res, query, params);
};

exports.postStoreGallery = function(req, res) {
	console.log('[====] call postStoreGallery');

	var query = mysql_query.postStoreGallery();
	var params = [];
	// query = _checkParams(query, params, req.body.store_id, 'store_id');
	query = _checkParams(query, params, req.body.store_id, 'store_id');

	bFirst = true;
	common.doQuery(req, res, query, params);
};

exports.postClassGallery = function(req, res) {
	console.log('[====] call postClassGallery');

	var query = mysql_query.postClassGallery();
	var params = [];
	// query = _checkParams(query, params, req.body.class_id, 'class_id');
	query = _checkParams(query, params, req.body.class_id, 'class_id');

	bFirst = true;
	common.doQuery(req, res, query, params);
};

function _setParams(query, params, val, str) {
	if (val != null && val != undefined) {
		if (bFirst) {
			bFirst = false;
		} else {
			query += ', ';
		}

		query = query + str + '=? ';
		params.push(val);
	}
	return query;
}

function _searchParams(query, params, val, str, bOr) {
	if (val != null && val != undefined) {
		if (bFirst) {
			query += ' WHERE ';
			bFirst = false;
		} else {
			if (bOr) {
				query += ' OR ';
			} else {
				query += ' AND ';
			}
		}

		query = query + str + ' like ? ';
		params.push('%' + val + '%');
	}
	return query;
}

function _checkParams(query, params, val, str) {
	if (val != null && val != undefined) {
		if (bFirst) {
			query += ' WHERE ';
			bFirst = false;
		} else {
			query += ' AND ';
		}

		query = query + str + '=? ';
		params.push(val);
	}
	return query;
}
