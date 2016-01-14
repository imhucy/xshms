var express = require('express');
var router = express.Router();
var Excute = require('./libs/excute.js');
var excute = new Excute(__dirname);
var async = require('async');
var fs = require('fs');
var baseJson = {
	"status" : 1,
	"message": '',
	"value"  : ''
}
/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('FRONT/index.html');
});

router.get('/admin',function (req,res){
	// res.redirect('/admin/login.html');
	var str = fs.readFileSync('public/admin/login.html','utf-8');
	res.setHeader('content-type','text/html;utf-8');
	res.end(str);
});
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
/// 登录逻辑
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
router.post('/loginAction',function (req,res,next){
	var login_name = req.body.login_name;
	var login_pass = req.body.login_pass;
	res.setHeader('content-type','text/plain;charset=utf-8');
	async.waterfall([
		// 判断用户存在
		function (callback) {
			var sql = 'SELECT * FROM useres where login_name = ?';
			excute.query(sql,[login_name],function (result) {
				console.log(result)
				if ( result && result.length !== 0 ){
					callback(null,result[0]);
				}else{
					// 没找到该账户
					callback('账号不存在,请核对您的学号',2);
				}
			})
		},
		// 判断用户状态
		function (user,callback) {
			if (user.status_id === 1){
				callback('该账户没通过审核，请等待通过审核了再登录',4);
			}else if( user.status_id === 2){
				callback(null,user);
			}else if( user.status_id === 3 ){
				callback('该账户已处于退役状态，无法登录',5);
			}
		},
		// 判断密码
		function (user,callback) {
			if( user.login_pass != login_pass ){
				console.log(user.login_pass + '\n' + login_pass);
				callback('密码错误',3);
			}else{
				callback(null,user)
			}
		}
	],function (err,result){
		if(err){
			baseJson.status = result;
			baseJson.message = err;
			baseJson.value = '';
		}else{
			baseJson.status = 1;
			baseJson.message = '登录成功';
			baseJson.value = result;
			var userString = JSON.stringify(result);
			res.cookie('useres',userString,{maxAge:3600000});
			// res.redirect('admin/main.html');
		}
		res.write(JSON.stringify(baseJson));
		res.end();
	});
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// getRolePower
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.post('/getRolePower',function ( req, res, next ){
	var roleId = req.body.roleId;
	var sql = 'SELECT * FROM role WHERE role.id = ? ;'+
						'SELECT * FROM power WHERE id IN ( SELECT power_id FROM role_power WHERE role_id = ? );'
	excute.query(sql,[roleId,roleId],function (result) {
		if(result){
			baseJson.status = 1;
			baseJson.message= '获取成功';
			baseJson.value  = result;
		}else{
			baseJson.status = 0;
			baseJson.message= '获取失败';
			baseJson.value  = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write(JSON.stringify(baseJson));
		res.end();
	})
});
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// setUserRolePower
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.post('/setUserRolePower',function ( req, res, next ){
	var data = JSON.parse(req.body.data);
	var roleId = data.role_id;
	var powers = data.powers;
	var rData  = [];
	console.log( data );
	var sql = 'delete from role_power where role_id = ?;';
	rData.push( roleId );
	for( var i = 0 ; i < powers.length;i++){
		sql += 'insert into role_power(role_id,power_id) values( ? , ? );'
		rData.push( roleId );
		rData.push( powers[i] );
	}
	console.log( 'sql =====>'+ sql );
	console.log( 'rData =====>'+ rData );
	excute.query(sql,rData,function (result) {
		if(result && result.length !== 0){
			baseJson.status = 1;
			baseJson.message= '获取成功';
			baseJson.value  = result;
		}else{
			baseJson.status = 0;
			baseJson.message= '获取失败';
			baseJson.value  = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write(JSON.stringify(baseJson));
		res.end();
	});
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// getUserInfoCard
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/getUserInfoCard',function ( req, res, next ){
	var userId = req.query.id;
	var sql = 
	'SELECT useres.id AS useres_id,useres_name ,role_name,student_id, '+
	       'student_sex,classes_name,student_mobile,usr_qq,usr_email, '+
	       'usr_birth,usr_addr,usr_desc '+
	'FROM useres ,role,student,classes '+
	'WHERE useres.id = ? '+
	'AND useres.stu_id = student.id '+
	'AND useres.role_id = role.id '+
	'AND useres.stu_id = student.id '+
	'AND student.classes_id = classes.id ';
	excute.query(sql,[userId],function (result) {
		if(result){
			baseJson.status = 1;
			baseJson.message= '获取成功';
			baseJson.value  = result;
		}else{
			baseJson.status = 0;
			baseJson.message= '获取失败';
			baseJson.value  = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write(JSON.stringify(baseJson));
		res.end();
	});
});

////////////////////////////////////////////////////////////////////////
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
