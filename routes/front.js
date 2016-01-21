var express = require('express');
var router = express.Router();
var Excute = require('./libs/excute.js');
var excute = new Excute(__dirname);
var async = require('async');
var fs = require('fs');
var baseJson = {
		status : 1,
		message : "获取成功",
		value : ''
	};
/* GET front listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
获取在职人员通讯录
 */
router.get('/getUseres',function (req,res) {
	var joinTable = req.query.joinTable;
	
	var sql = '';
	if(joinTable === 'student'){
		sql = 'select useres.id as id,student_name,student_mobile,student_id from useres join student on student.id = useres.stu_id where status_id = 2';
	}
	else if(joinTable === 'dept'){
		sql = 'select useres.id as id ,useres_name,stu_id,usr_qq,usr_email,usr_birth,usr_addr,usr_desc,status_id,role_id,login_name,login_pass,dept_id,dept_name,dept_desc,student_id,student_enterYear,student_name,student_sex,student_building,student_room,student_bed,student_mobile '+
		      'from useres '+
		      'join dept on dept.id = useres.dept_id '+
		      'join student on student.id = useres.stu_id '+
		      'where status_id = 2';
	}
	console.log('sql=====>'+sql)
	excute.query(sql,function (results) {
		if(results){
			baseJson.status = 1;
			baseJson.message = "获取成功";
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

router.get('/getMyActivity',function (req,res) {
	var id = req.query.id;
	var sql = 'select activity.id AS activity_id , activity_name AS text,activity_date AS datetime,volunteer AS content from activity where activity_status = 1 AND activity.activity_leader = ?'
	excute.query(sql,[id],function (results) {
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
router.get('/getVolunteerList',function (req,res,next) {
	var ids = req.query.ids;
	var sql = 'SELECT * FROM student WHERE id IN (?)';
	excute.query(sql,[ids],function(results) {
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
// 会议考勤结果插入
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

router.post('/postMeetingCheck',insertIntoAttendance);

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 早操考勤结果插入
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.post('/postExerciseCheck',insertIntoAttendance);

function insertIntoAttendance (req,res,next){
	var data = JSON.parse( req.body.data );
	var attendance_man = data.attendance_man;
	var attendance_date = new Date().format('yyyy-MM-dd hh:mm:ss');
	var results = data.result;
	var sql = 'INSERT INTO attendance(attendance_man,dop_man,discipline_id,attendance_term,attendance_date) VALUES ';
	
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
			for ( dop_man  in results ){
				records.push( '(?,?,?,?,?)' );
				recordsData.push( attendance_man );
				recordsData.push( dop_man );
				recordsData.push( results[dop_man] );
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
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 获取当前登录账户的所有任务
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getMyTask',function (req,res,next) {
	var id = req.query.id;
	var sql = 'SELECT task.id AS id , task_name,task_useres,task_content,task_date,task_status,task_status.id AS task_status_id,task_status_name '+
						'FROM task JOIN task_status ON task.task_status = task_status.id WHERE task_useres = ? '+
						'ORDER BY task_date DESC';
	excute.query(sql,[ id ],function(results){
		if(results && results.length !== 0){
			baseJson.status = 1;
			baseJson.message = "获取成功";
			baseJson.value = results.sort(function (a,b){
				return ( b.task_date <= a.task_date ? -1 : 1);
			});
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
// 新成员申请
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.post('/newUser',function (req,res,next){
	var data = req.body;
	
	var stu_id = data.id;
	var dept_id = data.dept;
	var usr_email = data.mail;
	var usr_qq = data.qq;
	var student_mobile = data.tel;
	var usr_desc = data.person_explain;

	async.waterfall([
		function (callback){
			// 确认该学生是否存在
			excute.query('update student set student_mobile = ? where student_id = ?',
				[student_mobile,stu_id],
				function ( results ){
					if(results.affectedRows){
						// 找到了该学生，更新他的电话号码
						callback(null,stu_id);
						;
					}else{
						// 没有找到
						callback('没有找到该学生，无法申请，请核对您的学号',3);
						;
					}
			});
		},
		function (stu_id,callback){
			var sql = 'select * from student where student_id = ?';
			excute.query(sql,[stu_id],function (results){
				if(results && results.length > 0) {
					callback( null, results[0] );
				}	else {
					callback('没有找到该学生，无法申请，请核对您的学号',3);
				}
			});
		},
		function (student,callback){
			// 查询是否已经注册了该学生
			sql = 'select * from useres where stu_id = ?';
			excute.query(sql,[student.id],function (r){
				if (r && r.length > 0) {
					callback('用户已经申请过了，请耐心等待审核',2);
				}else{
					callback(null,student);
				}
			});
		},
		function (student,callback){
			var sql = 'INSERT INTO useres (useres_name,stu_id, usr_qq, usr_email, usr_desc, login_name, login_pass, dept_id, role_id) '+
								' VALUES (?,?,?,?,?,?,?,?,?)';
			var recordsData = [];
			
			recordsData.push( student.student_name );
			recordsData.push( student.id );
			recordsData.push( usr_qq );
			recordsData.push( usr_email );
			recordsData.push( usr_desc );
			recordsData.push( student.student_id );
			// 默认密码为123456
			recordsData.push( 'e10adc3949ba59abbe56e057f20f883e' );
			recordsData.push( dept_id );
			recordsData.push( 0 );

			excute.query(sql,recordsData,function (results){
				if ( results ){
					// 申请成功
					callback(null,results)
				}
			});
		}
	],function  (err,result) {
		if ( err ) {
			baseJson.status = result;
			baseJson.message = err;
			baseJson.value = '';
		}else{
			baseJson.status = 1;
			baseJson.message = '申请成功，请耐心等待审核';
			baseJson.value = result;
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});

});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 获取通报列表
// 其中包括：
//   文件名（去掉扩展名）
//   文件创建时间
//   文件内容 ，其中包含文件的解析地址
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getNoticeList',function (req,res,next){
	var lists = [];
	var urls = [
		"pages/notification/notification-detail-zlb.html",
		"pages/notification/notification-detail-xxb.html",
		"pages/notification/notification-detail-pp.html",
		"pages/notification/notification-detail-by.html"
	]
	
	fs.readdir('public/notification/',function (err,files){

		for (var i = 0; i < files.length; i++) {
			// 每一个文件
			var obj = {};
			var fileName = files[i];
			var filePath = 'public/notification/' + fileName;
			var stat     = fs.statSync(filePath);
			obj.datetime = stat.birthtime.format('yyyy-MM-dd');
			obj.text     = fileName.split('.')[0];
			obj.url      = urls[ fileName.split('.')[1] ];
			obj.content  = fs.readFileSync(filePath,'utf-8');

			lists.push( obj );
		};
		lists = lists.sort( function (a,b) {
			return (b.datetime <= a.datetime ? -1 : 1);
		});
		
		baseJson.status = 1;
		baseJson.value = lists;
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 通报发布
//   发布查课周报
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/publishLessonCheckByWeek',function (req,res,next){
	async.waterfall([
		function (callback) {
			var sql = 'select * from term where term_status = 1';

			excute.query(sql,function(result){
				if(result){
					callback(null , result[0]);
				}

			});
		},
		function (term,callback) {
			var firstdate = term.term_date;
			var fDate = new Date(firstdate);
			var nDate = new Date();
			var day   = 1000*60*60*24;
			var day7  = day * 7;
			// 第几周了
			// type  :  number
			var week  = parseInt( (nDate.getTime() - fDate.getTime()) / day7 );
			// 这周第一天（星期天）
			// type  :  Date
			var weekstart = new Date( nDate.getTime() - day * nDate.getDay() );
			// 下周第一天（星期天）
			// type  :  Date
			var weekend   = new Date( nDate.getTime() + day * ( 7 - nDate.getDay() ) );

			var fileName  = '第' + week + '周查课通报.1.json';

			var weeks   = ['星期天' ,'星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			var lessons = ['一大节' ,'二大节', '三大节', '四大节', '晚自习'];
			var sql = [
				'SELECT',
				'	student_id,',
				'	student_name,',
				'	attendance_date AS datetime,',
				'	discipline_score AS score,',
				'	discipline_name AS dop_name,',
				'	classes_name',
				'FROM',
				'	attendance,',
				'	discipline,',
				'	student,',
				'	classes',
				'WHERE',
				'	discipline_type = 2',
				'AND discipline.id = discipline_id ',
				'AND attendance_status = 1',
				'AND attendance_date BETWEEN ?',
				'AND ?',
				'AND student.id = dop_man',
				'AND classes.id = student.classes_id'
			].join(' ');
			var json = {
				title : fileName.split('.')[0],
				datetime:nDate.format('yyyy-MM-dd hh:mm:ss'),
				students:null
			}
			excute.query(sql,[weekstart.format('yyyy-MM-dd') , weekend.format('yyyy-MM-dd') ],
				function (result) {
					if ( result && result.length !== 0 ) {
						fResult = {}
						
						for(i = 0 ;i < result.length ;i++){
							var item = result[i];
							var d = new Date( item.datetime );
							var h = d.getHours();
							
							if ( h >= 8 && h < 10 ){
								item.lessonNumber = lessons[ 0 ];
							}else if( h >= 10 && h < 12 ){
								item.lessonNumber = lessons[ 1 ];
							}else if( h >= 14 && h < 16 ){
								item.lessonNumber = lessons[ 2 ];
							}else if( h >= 16 && h < 18 ){
								item.lessonNumber = lessons[ 3 ];
							}else if( h >= 19 && h < 21 ){
								item.lessonNumber = lessons[ 4 ];
							}

							if( !fResult[ weeks[d.getDay()] ] ){
								fResult[ weeks[d.getDay()] ] = [];
								fResult[ weeks[d.getDay()] ].push( item );
							}else{
								fResult[ weeks[d.getDay()] ].push( item );
							}
						}

						json.students = fResult;
						
						fs.writeFileSync('public/notification/'+fileName, JSON.stringify( json ) ,'utf-8');

						callback(null , json);

					}else{
						callback('本周没有缺勤情况',json);
					}
				});

			
		},
	],function (err,result) {
		if(err){
			console.log(err);
			console.log(result);
		}else{
			baseJson.status = 1;
			baseJson.message= '发布成功';
			baseJson.value  = result;
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 通报发布
//   发布查寝周报
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/publishDormitoryCheckByWeek',function (req,res,next){
	async.waterfall([
		function (callback) {
			var sql = 'select * from term where term_status = 1';

			excute.query(sql,function(result){
				if(result){
					callback(null , result[0]);
				}

			});
		},
		function (term,callback) {
			var firstdate = term.term_date;
			var fDate = new Date(firstdate);
			var nDate = new Date();
			var day   = 1000*60*60*24;
			var day7  = day * 7;
			// 第几周了
			// type  :  number
			var week  = parseInt( (nDate.getTime() - fDate.getTime()) / day7 );
			// 这周第一天（星期天）
			// type  :  Date
			var weekstart = new Date( nDate.getTime() - day * nDate.getDay() );
			// 下周第一天（星期天）
			// type  :  Date
			var weekend   = new Date( nDate.getTime() + day * ( 7 - nDate.getDay() ) );

			var fileName  = '第' + week + '周查寝通报.0.json';
			
			var sql = [
				'SELECT',
				'	student_id,',
				'	student_name,',
				'	student_building,',
				'	student_room,',
				'	student_bed,',
				'	attendance_date AS datetime,',
				'	discipline_score AS score,',
				'	discipline_name AS dop_name,',
				'	classes_name',
				'FROM',
				'	attendance,',
				'	discipline,',
				'	student,',
				'	classes',
				'WHERE',
				'	discipline_type IN ( 0,1 )',
				'AND discipline.id = discipline_id ',
				'AND attendance_status = 1',
				'AND attendance_date BETWEEN ?',
				'AND ?',
				'AND student.id = dop_man',
				'AND classes.id = student.classes_id'
			].join(' ');
			var json = {
				title : fileName.split('.')[0],
				datetime:nDate.format('yyyy-MM-dd hh:mm:ss'),
				students:null
			}
			excute.query(sql,[weekstart.format('yyyy-MM-dd') , weekend.format('yyyy-MM-dd') ],
				function (result) {
					if ( result && result.length !== 0 ) {
						fResult = {}
						
						for(i = 0 ;i < result.length ;i++){
							var item = result[i];
							var d = new Date( item.datetime );
							

							if( !fResult[ item.student_building ] ){
								fResult[ item.student_building ] = [];
								fResult[ item.student_building ].push( item );
							}else{
								fResult[ item.student_building ].push( item );
							}
						}
						json.students = fResult;
						fs.writeFileSync('public/notification/'+fileName, JSON.stringify( json ) ,'utf-8');
						callback(null , json);
					}else{
						callback('本周没有缺勤情况',json);
					}
				});
		},
	],function (err,result) {
		if(err){
			console.log(err);
			console.log(result);
		}else{
			baseJson.status = 1;
			baseJson.message= '发布成功';
			baseJson.value  = result;
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 通报发布
//   发布早操周报
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/publishExerciseCheckByWeek',function (req,res,next){
	async.waterfall([
		function (callback) {
			var sql = 'select * from term where term_status = 1';

			excute.query(sql,function(result){
				if(result){
					callback(null , result[0]);
				}

			});
		},
		function (term,callback) {
			var firstdate = term.term_date;
			var fDate = new Date(firstdate);
			var nDate = new Date();
			var day   = 1000*60*60*24;
			var day7  = day * 7;
			// 第几周了
			// type  :  number
			var week  = parseInt( (nDate.getTime() - fDate.getTime()) / day7 );
			// 这周第一天（星期天）
			// type  :  Date
			var weekstart = new Date( nDate.getTime() - day * nDate.getDay() );
			// 下周第一天（星期天）
			// type  :  Date
			var weekend   = new Date( nDate.getTime() + day * ( 7 - nDate.getDay() ) );

			var fileName  = '第' + week + '周早操通报.0.json';
			
			var sql = [
				'SELECT',
				'	student_id,',
				'	student_name,',
				'	student_building,',
				'	student_room,',
				'	student_bed,',
				'	attendance_date AS datetime,',
				'	discipline_score AS score,',
				'	discipline_name AS dop_name,',
				'	classes_name',
				'FROM',
				'	attendance,',
				'	discipline,',
				'	student,',
				'	classes',
				'WHERE',
				'	discipline_type = 3',
				'AND discipline.id = discipline_id ',
				'AND attendance_status = 1',
				'AND attendance_date BETWEEN ?',
				'AND ?',
				'AND student.id = dop_man',
				'AND classes.id = student.classes_id'
			].join(' ');
			var json = {
				title : fileName.split('.')[0],
				datetime:nDate.format('yyyy-MM-dd hh:mm:ss'),
				students:null
			}
			excute.query(sql,[weekstart.format('yyyy-MM-dd') , weekend.format('yyyy-MM-dd') ],
				function (result) {
					if ( result && result.length !== 0 ) {
						fResult = {}
						
						for(i = 0 ;i < result.length ;i++){
							var item = result[i];
							var d = new Date( item.datetime );
							

							if( !fResult[ item.student_building ] ){
								fResult[ item.student_building ] = [];
								fResult[ item.student_building ].push( item );
							}else{
								fResult[ item.student_building ].push( item );
							}
						}
						json.students = fResult;
						fs.writeFileSync('public/notification/'+fileName, JSON.stringify( json ) ,'utf-8');
						callback(null , json);
					}else{
						callback('本周没有缺勤情况',json);
					}
				});
		},
	],function (err,result) {
		if(err){
			console.log(err);
			console.log(result);
		}else{
			baseJson.status = 1;
			baseJson.message= '发布成功';
			baseJson.value  = result;
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 通报发布
//   发布通报表扬和批评
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/publishDefineCheckByWeek',function (req,res,next){
	async.waterfall([
		function (callback) {
			var sql = 'select * from term where term_status = 1';

			excute.query(sql,function(result){
				if(result){
					callback(null , result[0]);
				}

			});
		},
		function (term,callback) {
			var firstdate = term.term_date;
			var fDate = new Date(firstdate);
			var nDate = new Date();
			var day   = 1000*60*60*24;
			var day7  = day * 7;
			// 第几周了
			// type  :  number
			var week  = parseInt( (nDate.getTime() - fDate.getTime()) / day7 );
			// 这周第一天（星期天）
			// type  :  Date
			var weekstart = new Date( nDate.getTime() - day * nDate.getDay() );
			// 下周第一天（星期天）
			// type  :  Date
			var weekend   = new Date( nDate.getTime() + day * ( 7 - nDate.getDay() ) );

			var fileNameBY  = '第' + week + '周通报表扬.3.json';
			var fileNamePP  = '第' + week + '周通报批评.2.json';
			
			var sql = [
				'SELECT',
				'	student_id,',
				'	student_name,',
				'	student_building,',
				'	student_room,',
				'	student_bed,',
				'	attendance_date AS datetime,',
				'	discipline_score AS score,',
				'	discipline_name AS dop_name,',
				'	classes_name',
				'FROM',
				'	attendance,',
				'	discipline,',
				'	student,',
				'	classes',
				'WHERE',
				'	discipline_type = 5',
				'AND discipline.id = discipline_id ',
				'AND attendance_status = 1',
				'AND attendance_date BETWEEN ?',
				'AND ?',
				'AND student.id = dop_man',
				'AND classes.id = student.classes_id'
			].join(' ');
			var jsonBY = {
				title : fileNameBY.split('.')[0],
				datetime:nDate.format('yyyy-MM-dd hh:mm:ss'),
				students:[]
			}
			var jsonPP = {
				title : fileNamePP.split('.')[0],
				datetime:nDate.format('yyyy-MM-dd hh:mm:ss'),
				students:[]
			}
			excute.query(sql,[weekstart.format('yyyy-MM-dd') , weekend.format('yyyy-MM-dd') ],
				function (result) {
					if ( result && result.length !== 0 ) {
						fResult = {}
						
						for(i = 0 ;i < result.length ;i++){
							var item = result[i];
							var d = new Date( item.datetime );
							var score = item.score;

							if (score <= 0){
								jsonPP.students.push( item );
							}else{
								jsonBY.students.push( item );
							}
						}
						if(jsonBY.students.length)
							fs.writeFileSync('public/notification/'+fileNameBY, JSON.stringify( jsonBY ) ,'utf-8');
						if(jsonPP.students.length)
							fs.writeFileSync('public/notification/'+fileNamePP, JSON.stringify( jsonPP ) ,'utf-8');
						callback(null , jsonBY);
					}else{
						callback('本周没有缺勤情况',jsonBY);
					}
				});
		},
	],function (err,result) {
		if(err){
			console.log(err);
			console.log(result);
		}else{
			baseJson.status = 1;
			baseJson.message= '发布成功';
			baseJson.value  = result;
		}
		res.setHeader('content-type','text/plain;charset=utf-8');
		res.write( JSON.stringify( baseJson ) );
		res.end();
	});
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get('/getXxx',function (req,res,next){

});


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
