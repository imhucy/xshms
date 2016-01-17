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
});


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// 获取
///   未审核的考勤项
///   根据考勤类型来查询
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/getAttendaceListByType',function (req,res,next) {
	var discipline_type = req.query.discipline_type;
	var sql = 'SELECT a.id AS id ,student_id,student_name ,discipline_name FROM attendance AS a, student AS s,discipline AS d WHERE a.dop_man = s.id AND a.discipline_id = d.id AND a.attendance_status = 0 AND d.discipline_type = ? ';
	excute.query(sql,[ discipline_type ],function (result) {
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
});
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// 审核考勤项
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
router.post('/reviewAttendance',function (req,res,next){
	var data = req.body.data;
	var aIdList = JSON.parse( data );
	var sql = 'UPDATE attendance SET attendance_status = 1 WHERE id IN (' + aIdList.join(',') + ')';
	excute.query(sql,function (result) {
		if(result && result.length !== 0){
			baseJson.status = 1;
			baseJson.message= '审核成功';
			baseJson.value  = result;
		}else{
			baseJson.status = 0;
			baseJson.message= '审核失败';
			baseJson.value  = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write(JSON.stringify(baseJson));
		res.end();
	});
});

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
////////////////////////////////////////////////////////////////////////
/// exportStudent
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.post('/exportStudent',function ( req, res, next ){
	// 先上传
	var formidable = require('formidable');

	var form = new formidable.IncomingForm();

	form.encoding = 'utf-8';

	form.uploadDir = 'public/exportfile/';

	form.keepExtensions = true;	 //保留后缀

	form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小 max = 2M

	// 用于设置文件名不重复
  var d = new Date();

  // 解析表单
	form.parse(req, function(err, fields, files) {
		if (err) {
	    baseJson.status  = 0;
	    baseJson.message = '导入失败';
	    baseJson.value   = '';

	    res.setHeader('content-type','text/plain;charset=utf-8');
			res.write(JSON.stringify(baseJson));
			res.end();
	    return;
	  } 

	  var mimeType = files.fulAvatar.type;

	  extName = 'xlsx';

	  var fileName = d.getTime() + d.toUTCString().replace(/[^\d]/g,'') + '.' + extName;// 随机名称 
	  var newPath = form.uploadDir + fileName;


	  // console.log( '==========================================')
	  // console.log( 'temp_path :' + files.fulAvatar.path);
	  // console.log( 'mimeType :'  + mimeType);
	  // console.log( 'extName :'   + extName);
	  // console.log( 'fileName :'  + fileName);
	  // console.log( 'newPath :'   + newPath);
	  // console.log( '==========================================')

	  fs.renameSync(files.fulAvatar.path, newPath);  //重命名
		
		// 读文件
		var xlsx = require('./libs/read.js');
		
		var sql = 'insert into student (student_id,student_enterYear,student_name,student_sex,student_building,student_room,student_bed,student_mobile,major_id,classes_id) values ';
		var sd  = '( ?,?,?,?,?,?,?,?,(select id from major where major_name=?),(select id from classes where classes_name=?) )';
		var recordSQL = [];
		var recordDATA= [];

		xlsx.readXlsx(newPath,function (data , row, col) {
			for( i = 1 ; i < row ; i++ ){
				if(!data[i][0]) continue;
				recordSQL.push( sd );
				for( j = 0 ; j < col ; j++ ){
					recordDATA.push( data[i][j] );
				}
			}
		});

		// console.log( recordSQL );
		// console.log( recordDATA );
		sql += recordSQL.join(',');
		// 写入数据库
		excute.query(sql,recordDATA,function (result) {
			if(result){
				res.setHeader('content-type','text/plain;charset=utf-8');
				res.write( '导入成功' );
				res.end();
			}else{
				res.setHeader('content-type','text/plain;charset=utf-8');
				res.write( '导入失败' );
				res.end();
			}
		});

		// 删除文件
		fs.unlinkSync( newPath );
	});
});
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// setPsw
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.post('/setPsw',function (req,res,next){
	var origin_password = req.body.origin_password;
	var new_password = req.body.new_password;
	var repeat_password = req.body.repeat_password;
	var id = req.body.id;

	async.waterfall([
		function (callback){
			excute.query('select * from useres where id = ?' , [id] ,function (result) {
				if( result && result.length !== 0 ){
					if ( result[0].login_pass != origin_password ){
						callback ( '原密码不对' ,0 );
					}
					else{
						callback(null,new_password);
					}
				}
			});
		},
		function (new_password,callback){
			excute.query('update useres set login_pass = ? where id = ?',[ new_password,id ]
				,function (result){
					if( result ){
						callback(null,result)
					}
			});
		}
	],function ( err, result){
		if(err){
			baseJson.status = result;
			baseJson.message= err;
			baseJson.value = ''
		}else {
			baseJson.status = 1;
			baseJson.message= "修改成功";
			baseJson.value  = result;
		}

		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});
/************************************************************
SELECT
	student.student_enterYear AS grade,
	classes_name,
	discipline_name,
	COUNT(discipline.id) AS number
FROM
	attendance,
	student,
	classes,
	discipline,
	term
WHERE
	attendance.dop_man = student.id
AND student.classes_id = classes.id
AND discipline.id = attendance.discipline_id
AND attendance.attendance_term = term.id
AND term.term_status = 1
AND attendance.attendance_status = 1
GROUP BY
 	classes.id,
	discipline.id
 ************************************************************/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// countByYear
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/countByYear',function (req ,res ,next) {
	var sql = [
	'SELECT',
	'	student.student_enterYear AS grade,',
	// '	classes_name,',
	'	discipline_name,',
	'	COUNT(discipline.id) AS number',
	'FROM',
	'	attendance,',
	'	student,',
	'	classes,',
	'	discipline,',
	'	term',
	'WHERE',
	'	attendance.dop_man = student.id',
	'AND student.classes_id = classes.id',
	'AND discipline.id = attendance.discipline_id',
	'AND attendance.attendance_term = term.id',
	'AND term.term_status = 1',
	'AND attendance.attendance_status = 1',
	'GROUP BY',
	'	discipline.id'
	].join(' ');
	excute.query(sql,function (result) {
		if(result){
			baseJson.status = 1;
			baseJson.message= "获取成功";
			baseJson.value  = result;
		}else{
			baseJson.status = 0;
			baseJson.message= "获取失败";
			baseJson.value  = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// countByMajor
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/countByMajor',function (req ,res ,next) {
	var sql = [
	'SELECT',
	// '	student.student_enterYear AS grade,',
	'	major_name,',
	'	discipline_name,',
	'	COUNT(discipline.id) AS number',
	'FROM',
	'	attendance,',
	'	student,',
	'	major,',
	'	discipline,',
	'	term',
	'WHERE',
	'	attendance.dop_man = student.id',
	'AND student.major_id = major.id',
	'AND discipline.id = attendance.discipline_id',
	'AND attendance.attendance_term = term.id',
	'AND term.term_status = 1',
	'AND attendance.attendance_status = 1',
	'GROUP BY',
	' 	major.id,',
	'	discipline.id'
	].join(' ');
	excute.query(sql,function (result) {
		if(result){
			baseJson.status = 1;
			baseJson.message= "获取成功";
			baseJson.value  = result;
		}else{
			baseJson.status = 0;
			baseJson.message= "获取失败";
			baseJson.value  = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// countByClasses
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/countByClasses',function (req ,res ,next) {
	var sql = [
	'SELECT',
	'	classes_name,',
	'	discipline_name,',
	'	COUNT(discipline.id) AS number',
	'FROM',
	'	attendance,',
	'	student,',
	'	classes,',
	'	discipline,',
	'	term',
	'WHERE',
	'	attendance.dop_man = student.id',
	'AND student.classes_id = classes.id',
	'AND discipline.id = attendance.discipline_id',
	'AND attendance.attendance_term = term.id',
	'AND term.term_status = 1',
	'AND attendance.attendance_status = 1',
	'GROUP BY',
	' 	classes.id,',
	'	discipline.id'
	].join(' ');
	excute.query(sql,function (result) {
		if(result){
			baseJson.status = 1;
			baseJson.message= "获取成功";
			baseJson.value  = result;
		}else{
			baseJson.status = 0;
			baseJson.message= "获取失败";
			baseJson.value  = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/// upload/image
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/uploadImage',function (req,res,next){
	
	uploadImage (req,res,'FRONT/img/index_image/',function ( msg, avatarName, fields) {
		excute.query('insert into index_image (image) values (?)',[avatarName],function (result) {
			if(result){
				res.setHeader('content-type','text/plain;charset=utf-8');
				res.write( msg );
				res.end();
			}
		});
	});
});
function uploadImage(req,res,dir,callback) {
	var formidable = require('formidable');
	var form = new formidable.IncomingForm();   //创建上传表单

  form.encoding = 'utf-8';
  form.uploadDir = 'public/' + dir;
  form.keepExtensions = true;	 //保留后缀
  form.maxFieldsSize = 5 * 1024 * 1024;   //文件大小 max = 2M

  res.setHeader('content-type', 'text/plain;charset=utf-8');
  // 返回给前台
  var msg = '';
  // 用于设置文件名不重复
  var d = new Date();
  // 解析表单
	form.parse(req, function(err, fields, files) {

	  if (err) {
	    msg = err;
	    res.end(msg);
	    return;
	  }  
	   
	  var extName = '';  //后缀名
	  
	  extName = getExtName(files.fulAvatar.type);

	  if(extName.length == 0){
	      msg = '只支持png和jpg格式图片';
	      res.end(msg);
	      return;
	  }

	  var avatarName = d.getTime() + d.toUTCString().replace(/[^\d]/g,'') + '.' + extName;// 随机名称
	  var newPath = form.uploadDir + avatarName;

	  console.log('newPath : '+newPath);
	  // files.fulAvatar.path
	  console.log('tempPath : '+files.fulAvatar.path);
	  console.log('form : ' + JSON.stringify( form ));
	  console.log('filed' + JSON.stringify(fields) );
	  fs.renameSync(files.fulAvatar.path, newPath);  //重命名
		
		msg = '上传成功';
	  
	  callback && callback(msg,avatarName,fields);

	});
}

function getExtName (type) {
	var extName = '';  //后缀名
  switch (type) {
    case 'image/pjpeg':
      extName = 'jpg';
      break;
    case 'image/jpeg':
      extName = 'jpg';
      break;		 
    case 'image/png':
      extName = 'png';
      break;
    case 'image/x-png':
      extName = 'png';
      break;		 
  }
  return extName;
}
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
