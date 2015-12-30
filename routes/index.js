var express = require('express');
var router = express.Router();
var Excute = require('./libs/excute.js');
var excute = new Excute(__dirname);
var async = require('async');

/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('FRONT/index.html');
});

router.get('/admin',function (req,res){
	res.redirect('admin/index.html');
});



router.get('/:type/:tableName',function (req,res,next) {
	var tableName = req.params.tableName,
			type = req.params.type;

	if(type === 'all'){
		excute.findAll(tableName,function (result) {
			if(result){
				res.setHeader('content-type','text/plain');
				res.write(JSON.stringify(result));
				res.end();
			}
		});
	}else if(type === 'where'){
		var whereJson = req.query.whereJson ;
		var orderByJson = req.query.orderByJson;
		var limitArr = req.query.limitArr;
		var fieldsArr = req.query.fieldsArr;
		console.log(req.query);
		console.log(req.params);
		excute.find(tableName,whereJson,orderByJson,limitArr,fieldsArr,function (result) {
			if(result){
				res.setHeader('content-type','text/plain');
				res.write(JSON.stringify(result));
				res.end();
			}
		});
	}else{
		next();
	}
});
router.post('/:operate/:tableName',function (req,res,next) {
	var tableName = req.params.tableName,
			operate = req.params.operate,
			record = req.body;
	// this.modify = function (table,id,rowInfo,callback)
	if(operate === 'modify'){
		excute.modify(tableName , {id : record.id},record,function(result){
			if(result){
				res.setHeader('content-type','text/plain');
				res.write(JSON.stringify(result));
				res.end();
			}
		})
	}
	else if(operate === 'insert'){
		excute.insert(tableName , record,function(result){
			if(result){
				res.setHeader('content-type','text/plain');
				res.write(JSON.stringify(result));
				res.end();
			}
		});
	}
	else if(operate === 'remove'){
		excute.remove(tableName,{id : record.id},function (result) {
			if(result){
				res.setHeader('content-type','text/plain');
				res.write(JSON.stringify(result));
				res.end();
			}
		});
	}else {
		next();
	}
});

router.get('/closeDB',function (req,res) {
	excute.close();
	res.setHeader('content-type','text/plain');
	res.write('success closed db');
	res.end();
});
module.exports = router;
