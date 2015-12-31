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
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getAllActivity',function (req,res) {
	var sql = 'select * from activity join useres on activity.activity_leader = useres.id where activity_status = 1';
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
// 
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// router.get('/getGrades',function(req,res){var sql = 'SELECT DISTINCT student_enterYear  FROM student ;'})
//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// 将学生信息进行加工，方便前台显示查寝表单
///////////////////////////////////////////////////////////////
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

// router.get('/getUseres',function (req,res) {
// 	var baseJson = {
// 		status : 1,
// 		message : "获取成功",
// 		value : ''
// 	}
// 	excute.query('select * from useres join student on student.id = useres.stu_id where status_id = 2',function (results) {
// 		if(results){
// 			baseJson.value = results;
// 		}else {
// 			baseJson.status = 0;
// 			baseJson.message = "获取失败";
// 		}
// 		res.setHeader('content-type','text/plain');
// 		res.write( JSON.stringify( baseJson ) );
// 		res.end();
// 	});
// });

// router.get('/insertTestData',function (req,res) {
// 	for(var i = 100 ; i < 1000 ; i++){
// 		excute.query('insert into student set ?' ,
// 			{
// 				student_id:'20128625'+i,
// 				student_enterYear:2012,
// 				student_name:'测试用户'+i,
// 				student_sex:'男',
// 				student_building:'西十一',
// 				student_room:i+'',
// 				student_bed:(i%4)+1,
// 				student_mobile:'13973129'+i,
// 				major_id : ((i+1)%4)+1,
// 				classes_id: (i%25)+1
// 		},function(results){
// 			if(results){
// 				console.log(results);
// 			}
// 		});
// 	}
// 	setTimeout(function () {
// 		res.setHeader('content-type','text/plain');
// 		res.write( 'success' );
// 		res.end();
// 	},10000)
// });
// router.get('/closeDB',function (req,res) {
// 	excute.close();
// 	res.setHeader('content-type','text/plain;charset=utf-8');
// 	res.write('success closed db');
// 	res.end();
// });
module.exports = router;
