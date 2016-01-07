var express = require('express');
var router = express.Router();
var Excute = require('./libs/excute.js');
var excute = new Excute(__dirname);
var async = require('async');
var baseJson = {
		status : 1,
		message : "获取成功",
		value : ''
	};
/* GET front listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/getUseres',function (req,res) {
	var joinTable = req.query.joinTable;
	
	var sql = '';
	if(joinTable === 'student'){
		sql = 'select * from useres join student on student.id = useres.stu_id where status_id = 2';
	}
	else if(joinTable === 'dept'){
		sql = 'select * from useres join dept on dept.id = useres.dept_id join student on student.id = useres.stu_id where status_id = 2';
	}
	console.log('sql=====>'+sql)
	excute.query(sql,function (results) {
		if(results){
			baseJson.value = results;
		}else {
			baseJson.status = 0;
			baseJson.message = "获取失败";
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

router.get('/getStudent',function (req,res){
	var sql = 'select * from student';
	
	excute.query(sql,function (results) {
		if(results){

			baseJson.value = student2dormitory(results);

		}else {

			baseJson.status = 0;
			baseJson.message = "获取失败";

		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});
//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// 提交意见反馈
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.post('/postIBox',function (req,res,next) {
	// var ibox_name = req.body.ibox_name;
	// var ibox_content = req.body.ibox_content;
	// var ibox_date = req.body.ibox_date;
	var rowInfo = req.body;
	console.log(req.body);
	excute.insert('ibox',rowInfo,function (insertId) {
		if(insertId){
			baseJson.status = 1;
			baseJson.message = '提交成功';
			baseJson.value = '';
		}else{
			baseJson.status = 0;
			baseJson.message = '提交失败，请重新提交';
			baseJson.value = '';
		}
	});
	res.setHeader('content-type','text/plain;charset=utf-8');
	res.write( JSON.stringify( baseJson ) );
	res.end();
});
//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// 获取所有的志愿活动
// 是所有没有完成的志愿活动
// 是当前学期的活动
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
router.get('/getAllActivity',function (req,res) {
	var sql = 'select activity.id AS activity_id , activity_name,activity_date,activity_content,useres_name from activity join useres on activity.activity_leader = useres.id where activity_status = 1'
	// var sql = 'select * from activity join useres on activity.activity_leader = useres.id where activity_status = 1';
	excute.query(sql,function (results) {
		if(results){
			baseJson.status = 1;
			baseJson.message = '获取成功';
			baseJson.value = results;
		} else {
			baseJson.status = 0;
			baseJson.message = "获取失败";
			baseJson.value = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});


//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// 提交志愿者活动申请 applyForActivity
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.post('/applyForActivity',function (req,res,next) {
	var student_id = req.body.student_id;
	var activity_id = req.body.activity_id;
	var student_mobile = req.body.student_mobile;

	async.waterfall([  
    function (callback){ 
    	// 判断学号是否存在
    	excute.query('SELECT id,student_id FROM student where student_id = '+student_id ,
    		function (results) {
    		if (results) {
    			if(results.length === 0) {
    				// 没有找到该学生，请确认您的学号没有错误
    				callback(3,'没有找到该学生，请确认您的学号没有错误');
    			}
    			else {
    				callback(null,results[0].id);
    			}
    		};
    	});
    },
    function (student_id,callback) {
    	// 查询所有的志愿者
    	excute.query('SELECT volunteer FROM activity WHERE id = ' +activity_id,function (results) {
    		if(results){
    			var volunteers = results[0].volunteer.split(',');
    			for(i = 0 ;i < volunteers.length ;i ++){
    				// 您已经申请了，请勿重复申请
    				if(volunteers[i] == student_id) callback(2 ,'您已经申请了，请勿重复申请')
    			}
    			callback(null,volunteers.join()+','+student_id);
    		}
    		callback(null,1);
    	})
    }
	],function(err,newVolunteers){  
	    console.log(newVolunteers);
	    if(err){
	    	baseJson.status = err;
	    	baseJson.message = newVolunteers;
	    	baseJson.value = '';
	    	res.setHeader('content-type','text/plain;charset=utf-8');
				res.write( JSON.stringify( baseJson ) );
				res.end();
	    }
	    else{
	    	// 可以添加
	    	excute.query('UPDATE activity SET volunteer = ? where id = ?',
	    		[newVolunteers,activity_id],function (results) {
	    		  baseJson.status = 1;
	    		  baseJson.message = '申请成功请按时参加';
	    		  baseJson.value = '';
			    	res.setHeader('content-type','text/plain;charset=utf-8');
						res.write( JSON.stringify( baseJson ) );
						res.end();
	    	});
	    }
	});
});
//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// 获取所有的年级
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getGrades',function(req,res){
	var sql = 'SELECT DISTINCT student_enterYear  FROM student ';
	excute.query(sql,function (results) {
		if(results){
			baseJson.status = 1;
			baseJson.message = '获取成功';
			baseJson.value = results;
		}else{
			baseJson.status = 0;
			baseJson.message = "获取失败";
			baseJson.value = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// 获取所有的楼栋号
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getBuildings',function(req,res){
	var sql = 'SELECT DISTINCT student_building FROM student';
	excute.query(sql,function (results) {
		if(results){
			baseJson.status = 1;
			baseJson.message = '获取成功';
			baseJson.value = results;
		}else{
			baseJson.status = 0;
			baseJson.message = "获取失败";
			baseJson.value = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 根据年级和专业获取班级
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

router.get('/getClasses',function (req,res,next){
	var majorId = req.query.majorId;
	var enterYear = req.query.enterYear;
	excute.query('SELECT * FROM classes WHERE major_id = ? AND enterYear = ?'
		,[majorId,enterYear],function  (results) {
		if(results){
			baseJson.status = 1;
			baseJson.message = "获取成功";
			baseJson.value = results;
		}else{
			baseJson.status = 0;
			baseJson.message = "获取失败";
			baseJson.value = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 通过年级、专业、班级获取全班人的信息
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getStudentByMajorGradeClasses',function (req,res,next) {
	var majorId = req.query.majorId;
	var enterYear = req.query.enterYear;
	var classes = req.query.classes;

	var sql = 'SELECT * FROM student WHERE student_enterYear = ? AND classes_id = ? AND major_id = ?';
	excute.query(sql , [enterYear,classes,majorId],function(results){
		if(results){
			baseJson.status = 1;
			baseJson.message = "获取成功";
			baseJson.value = results;
		}
		else {
			baseJson.status = 0;
			baseJson.message = "获取失败";
			baseJson.value = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 查课结果提交
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.post('/postLessonCheck',function (req,res,next) {
	var attendance_man = req.body['attendance_man'];
	var attendance_date = req.body['attendance_date'];
	var attendance_desc = req.body['attendance_desc'];
	var qStudents = req.body['result[]'];

	// console.log('======>'+JSON.stringify(req.body));
	// console.log('======>'+JSON.stringify(qStudents));
	// console.log('======>'+attendance_man);
	// console.log('======>'+attendance_date);
	// console.log('======>'+attendance_desc);
	var sql = '';
	var data = [];
	async.waterfall([
		function (callback) {
			excute.query('select id from term where term_status = 1',function(results){
				if(results){
					callback(null,results[0]);
				}
				else{
					callback('查询当前学期失败',0);
				}
			});
		},
		function (term,callback){
			var term_id = term.id;
			for(i = 0 ; i < qStudents.length; i++){
				sql += 'insert into attendance SET attendance_man = ? ,dop_man = ?,discipline_id = ?,attendance_term = ? ,attendance_date = ? , attendance_desc = ?;';
				data.push( attendance_man );
				data.push( qStudents[i] );
				// 查课类型id号
				data.push( 11 );
				data.push( term_id );
				data.push( attendance_date );
				data.push( attendance_desc );
			}
			callback(null,sql)
		}
	],function (err,sql){
		if(err){
			console.log(err);
		}else{
			excute.query(sql, data, function(results){
				if(results){
					baseJson.status = 1;
					baseJson.message = "插入成功";
					baseJson.value = results;
				}
				else {
					baseJson.status = 0;
					baseJson.message = "插入失败";
					baseJson.value = '';
				}
				res.setHeader('content-type','text/plain;charset=utf-8');
				res.write( JSON.stringify( baseJson ) );
				res.end();
			});
		}
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 通过年级和楼栋号来获取学生信息
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getStudentByGradeBuilding',function (req,res,next){
	var enterYear = parseInt(req.query.enterYear);
	var student_building = req.query.student_building;
	var sql = 'SELECT * from student WHERE student_enterYear = ? AND student_building = ?';

	excute.query(sql,[enterYear,student_building],function(results){
		if(results && results.length !== 0){
			baseJson.status = 1;
			baseJson.message = "获取成功";
			baseJson.value = results;
		}
		else {
			baseJson.status = 0;
			baseJson.message = "获取失败";
			baseJson.value = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 查早晚寝的表单提交
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.post('/postDormitoryCheck',function (req,res,next){
	json = JSON.parse( req.body.data );
	console.log( json );
	json.students;
	json.domStudent;
	var attendance_date = new Date().format('yyyy-MM-dd hh:mm:ss');
	var attendance_man = json.attendance_man;
	var sql = 'INSERT INTO attendance(attendance_man,dop_man,discipline_id,attendance_term,attendance_date) VALUES '
	var records = [];
	var recordsData = [];

	
	async.waterfall([
		function (callback) {
			excute.query('select id from term where term_status = 1',function(results){
				if(results){
					callback(null,results[0]);
				}
				else{
					callback('查询当前学期失败',0);
				}
			});
		},
		function (term,callback){
			var attendance_term = term.id;
			for ( dop_man  in json.students ){
				records.push( '(?,?,?,?,?)' );
				recordsData.push( attendance_man );
				recordsData.push( dop_man );
				recordsData.push( json.students[dop_man] );
				recordsData.push( attendance_term );
				recordsData.push( attendance_date );
			}
			for ( dop_man  in json.domStudent ){
				records.push( '(?,?,?,?,?)' );
				recordsData.push( attendance_man );
				recordsData.push( dop_man );
				recordsData.push( json.domStudent[dop_man] );
				recordsData.push( attendance_term );
				recordsData.push( attendance_date );
			}
			sql += records.join(',');
			callback(null,sql);
		}
	],function (err,sql){
		if(err){
			console.log(err);
		}else{
			excute.query(sql, recordsData, function(results){
				if(results){
					baseJson.status = 1;
					baseJson.message = "插入成功";
					baseJson.value = results;
				}
				else {
					baseJson.status = 0;
					baseJson.message = "插入失败";
					baseJson.value = '';
				}
				res.setHeader('content-type','text/plain;charset=utf-8');
				res.write( JSON.stringify( baseJson ) );
				res.end();
			});
		}
	});// end of waterfall
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 获取大一新生的所有数据
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getStudentByMaxGrade',function (req,res,next){
	var sql = 'SELECT s.id,s.student_id ,s.student_name,c.classes_name '+
	          'FROM student AS s JOIN classes AS c ON s.classes_id = c.id '+
	          'WHERE student_enterYear = (SELECT MAX(student_enterYear) FROM student)';
	excute.query(sql,function(results){
		if(results && results.length !== 0){
			baseJson.status = 1;
			baseJson.message = "获取成功";
			baseJson.value = results;
		}
		else {
			baseJson.status = 0;
			baseJson.message = "获取失败";
			baseJson.value = '';
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 早操结果插入
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/postExerciseCheck',function (req,res,next){
	var data = JSON.parse( req.body.result );
	var attendance_man = data.attendance_man;
	var attendance_date = new Date().format('yyyy-MM-dd hh:mm:ss');
	var sql = 'INSERT INTO attendance(attendance_man,dop_man,discipline_id,attendance_term,attendance_date) VALUES ';
	var recordsData = [];

	async.waterfall([
		function (callback) {
			excute.query('select id from term where term_status = 1',function(results){
				if(results){
					callback(null,results[0]);
				}
				else{
					callback('查询当前学期失败',0);
				}
			});
		},
		function (term,callback){
			var attendance_term = term.id;
			for ( dop_man  in json.domStudent ){
				records.push( '(?,?,?,?,?)' );
				recordsData.push( attendance_man );
				recordsData.push( dop_man );
				recordsData.push( json.domStudent[dop_man] );
				recordsData.push( attendance_term );
				recordsData.push( attendance_date );
			}
			sql += records.join(',');
			callback(null,sql);
		}
	],function (err,sql){
		if(err){
			console.log(err);
		}else{
			excute.query(sql, recordsData, function(results){
				if(results){
					baseJson.status = 1;
					baseJson.message = "插入成功";
					baseJson.value = results;
				}
				else {
					baseJson.status = 0;
					baseJson.message = "插入失败";
					baseJson.value = '';
				}
				res.setHeader('content-type','text/plain;charset=utf-8');
				res.write( JSON.stringify( baseJson ) );
				res.end();
			});
		}
	});// end of waterfall
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 将学生信息进行加工，方便前台显示查寝表单
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
function student2dormitory (results) {
	context = {};
	context.dormitory = {};	
	for(i = 0 ; i < results.length; i++){
		student = results[i];
		if(!context['dormitory'][student.student_building]){
			context['dormitory'][student.student_building] = {};
			if(!context['dormitory'][student.student_building][student.student_room]){
			 	context['dormitory'][student.student_building][student.student_room] = [];
				context['dormitory'][student.student_building][student.student_room].push( student );
			}else{
				context['dormitory'][student.student_building][student.student_room].push( student );
			}
		}
		else{
			if(!context['dormitory'][student.student_building][student.student_room]){
			 	context['dormitory'][student.student_building][student.student_room] = [];
				context['dormitory'][student.student_building][student.student_room].push( student );
			}else{
				context['dormitory'][student.student_building][student.student_room].push( student );
			}
		}
	}
	return context;
}

//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//  日期格式化工具
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

Date.prototype.format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
module.exports = router;
