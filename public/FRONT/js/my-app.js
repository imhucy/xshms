/**
 * ********************
 * 1.主页(index)
 * ********************
 * 2.登录页面(login-screen)
 * ********************
 * 3.通讯录页面(contact)
 * ********************
 * 4.开会签到页面(meeting-check)
 * ********************
 * 5.早起(morning-check)
 * ********************
 * 6.晚归(evening-check)
 * ********************
 * 7.部门简介(introduction-department)
 * ********************
 * 8.通报表扬申请页面(apply-for-by)
 * ********************
 * 9.通报批评申请页面(apply-for-pp)
 * ********************
 * 10.面试(interview)
 * 该页面将，提交了申请的所有人，列出来，面试通过的标记通过，没通过的也要标记没通过
 * ********************
 * 11.统计报表页面(notification-detail-chart)
 * ********************
 * 12.早操页面(exercise-check)
 * ********************
 * 13.通报表扬详情页面(notification-detail-by)
 * ********************
 * 24.通报批评详情页面
 * ********************
 * 15.个人信息页面
 * ********************
 * 16.编辑个人资料界面
 * ********************
 * 17.招新申请页面
 * ********************
 * 18.志愿者活动页面
 * ********************
 * 19.查课页面
 * ********************
 * 20.考勤选择页
 * */
 // 初始化轮播图
var ipField = 'http://pushhand.cn:4000'
$.ajax({
	url: ipField + '/all/index_image',
	type: 'get',
	dataType: 'json',
	async:false
})
.done(function(data) {
	var str = '{{#each images}}<div class="swiper-slide"><img style="height:260px;width:100%;" src="img/index_image/{{image}}" /></div>{{/each}}';
	var htmlStr = Template7.compile(str)({images : data});
	$('#indexImages').html( htmlStr );
});

// 初始化应用
var myApp = new Framework7({
	//	pushState:true,
	cache: true,
	// swipePanel: 'left',
	swipeBackPage:false,
	smartSelectBackOnSelect: true,
	precompileTemplates: true,
	template7Pages: true,
	modalTitle:"学生会OA系统",
	template7Data: {}
});

// 导入选择器引擎
var $$ = Dom7;


// 注册视图添加视图
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true,
	domCache: true
});

// 设置全局变量
Template7.global = {
	login_status: false,
	useres:{
		id : 2
	}
};
/*===== 0.初始化应用数据 =====*/
$.getJSON(ipField + '/all/dept').done(function (tableContent){
	Template7.global.depts = tableContent;
	myApp.template7Data['page:introduction-department']={
		depts:tableContent
	}
});
$.getJSON(ipField + '/all/major').done(function (tableContent){
	Template7.global.majors = tableContent;
});
$.getJSON(ipField + '/front/getGrades', function(json) {
	Template7.global.grades = json.value;
});
$.getJSON(ipField + '/front/getBuildings', function(json) {
	Template7.global.buildings = json.value;
});
$.getJSON(ipField + '/front/getAllActivity').done(function (activities) {
	myApp.template7Data['page:voluntary-activity']={
		activities:activities.value
	}
});
$.getJSON(ipField + '/front/getStudentByMaxGrade', function(json, textStatus) {
		var students = json.value;
		var classesData = {};
		$.each(students,function (i,sItem) {
			if ( !classesData[ sItem.classes_name ] ){
				classesData[ sItem.classes_name ] = [];
				classesData[ sItem.classes_name ].push( sItem );
			}
			else{
				classesData[ sItem.classes_name ].push( sItem );
			}
		});
		myApp.template7Data['page:exercise-check']={
			data:classesData
		};
});


/*===== 1.主页 =====*/
myApp.onPageInit('index', function(page) {
	
});


/*===== 2.登录页面 =====*/

myApp.onPageInit('login-screen', function(page) {

	var curPage = $$(page.container);

	curPage.find('.login-btn').on('click', function() {
		var username = curPage.find('input[name="username"]').val();
		var password = curPage.find('input[name="password"]').val();
		password = hex_md5( password );
		LoginBiz(username, password,function(message ,status){
			myApp.alert(message, function(){
				if(status === 1) mainView.back();
			});
		});
	});
});


/*===== 3.通讯录页面 =====*/
myApp.onPageInit('contact', function(page) {
	var curPage = $(page.container);
	showLoading();
	// $.getJSON("jsondata/contacts.json", {}, function(context) {
	$.getJSON(ipField + "/front/getUseres", {joinTable:'student'}, function(context) {
		if(context.status){
			context.student_list = context.value;
			console.log(context)
			$('.ajaxContain').html(compileScript('#ContactList', context));
		}
		curPage.find('.toInfo').click(function(){
			var id = $(this).find('.stu_id').text();
			cacheData.set("userInfoCache",id);
		})
		
		hideLoading();
	});
});
/*===== 4.开会签到 =====*/

myApp.onPageInit('meeting-check', function (page) {
	var curPage = $(page.container);
	var modal = $.parseJSON( cacheData.get("meetingCache") );
	
	showLoading();
	// $.getJSON("jsondata/meeting.json", function(context) {
	$.getJSON(ipField + "/front/getUseres",{joinTable:'dept'}, function(context) {
		var json = {};
		json.departments = {};

		$.each(context.value,function (i,elem) {
			console.log(json.departments[elem.dept_name]);
			if ( !json.departments[elem.dept_name] ) json.departments[elem.dept_name] = [];
			json.departments[elem.dept_name].push(elem);
		});

		$('#ajaxContain_meeting').html(compileScript('#meetingTemplate', json));
		if( modal ){
			// 有缓存则读缓存
			debug && console.log('有缓存');
			debug && console.log(modal);
			curPage.find('select[name]').each(function (i,item){
				var key =  $(item).attr('name');
				var val = modal[key];
				$(this).val( val );
				var text = $(this).find('option:selected').text();
				$(this).next().find('.meeting-result').text(text);
			});
		}else {
			// 么有缓存就建立缓存
			debug && console.log('没有缓存');
			modal = {};
			curPage.find('select[name]').each(function ( i,item ){
				var key = $(item).attr('name');
				var val = $(item).val();
				modal[key] = val;
				debug && console.log(key + val)
			});
			cacheData.set('meetingCache',JSON.stringify( modal ));
			debug && console.log(modal)
		}// end of 读缓存

		curPage.find('select[name]').on('change', function(e) {
			var key = $(this).attr('name');
			var val = $(this).val();
			modal[key] = val;
			debug && console.log(key + val)
			cacheData.set('meetingCache',JSON.stringify( modal ));
		});

		curPage.find('.meetingSubmit').on('click', function(e) {
			var ajaxData = {};
			$.each(modal, function(sId,disciplineId) {
				if(disciplineId == 0) delete modal[sId];
			});
			if( $.isEmptyObject(modal) ){
				myApp.alert('没有缺席和请假的人员,大家全都到了，不用提交');
				return;
			}
			ajaxData['attendance_man'] = Template7.global.useres.id;
			ajaxData['result'] = modal;
			$.post(ipField + '/front/postMeetingCheck',{data : JSON.stringify(ajaxData)})
			.done(function (data){
				debug && console.log(data);
				cacheData.set('meetingCache','');
				myApp.alert('提交成功',function(){
					mainView.back();
				});
			});
		});	
		hideLoading();
	});
	
	
	// debug && console.log( curPage.find('select[name]').size() )
	
	

});
/*===== 5.查早起 =====*/
myApp.onPageInit('morning-check-1',function (page) {
	var curPage = $(page.container);
	showLoading();
	// 表单验证和表单提交
	$('#morningCheckOneForm').validate({
		rules:{
			"enterYear":"required",
			"building":"required"
		},
		errorPlacement: function(error, element) {  
		  element.parents('li').next('li').find('.item-inner').append(error);
		},
		errorContainer:".errorContainer",
		submitHandler: function(form) { 
			showLoading();
			var ajaxData = {};     
	    $(form).find('[name]').each(function (i,item) {
	    	var key = $(item).attr('name');
	    	var val = $(item).val();
	    	ajaxData[key] = val;
	    	Template7.global.morningCheck = Template7.global.morningCheck || {};
	    	Template7.global.morningCheck[key] = val;
	    });

			// 请求学生列表
			$.getJSON(ipField + '/front/getStudentByGradeBuilding', 
				{
					enterYear : ajaxData['enterYear'],
					student_building : ajaxData['student_building']
				}, function(json, textStatus) {
					console.log( JSON.stringify(json) )
					// Template7.global.morningCheckStudent = json.value;
					var context = student2dormitory(json.value);
					console.log( JSON.stringify(context) );
					myApp.template7Data['page:morning-check-2'] = {
						dormitory:context
					}
					hideLoading();
					mainView.loadPage('pages/attendence/morning-check-2.html');
			});
	  }
	});// end of validate
	curPage.find('.submit-next').click(function(){
		$('#morningCheckOneForm').submit();
	});

	hideLoading();

});
	// 查早寝2
myApp.onPageInit('morning-check-2',function (page){
	var curPage = $(page.container);
	
	var eCheck = Template7.global.morningCheck;
	var eCache = eCheck['student_building'] + eCheck['enterYear'];
	// 缓存数据
	var cd = {};
	if( cacheData.get('morningCache') )
		cd = $.parseJSON( cacheData.get('morningCache') ) ;
	var cName = Template7.global.morningCheck['student_building'] + 
							Template7.global.morningCheck['enterYear'];
	console.log(cName);
	// 寝室情况选择
	var btnText = {
		"0"  : "寝室情况(无)" ,
		"4"  : "优寝",
		"5"  : "差寝",
		"8"  : "遮挡可视窗",
		"9"  : "未挂大锁",
		"15" : "拒检" 
	}
	curPage.find('.dormitory-check').on('click', function (e) {
		e.stopPropagation();
		
		var _this = $(this);
		// 按钮组
		var buttons = [];
		for( key in btnText ){
			var obj = new Object();
			obj['text'] = btnText[key];
			obj['key'] = key;

			var fnClick = function(){
				_this.val( this.key );
				_this.text( this.text );
				
				cd[cName]['domitorys'][ _this.attr('name') ] = this.key;
				cacheData.set('morningCache',JSON.stringify( cd ));
			}

			obj.onClick = fnClick;
			
			// 最后一个按钮显示红字
			(key == 0) && (obj['color'] = 'red');
			buttons.push(obj);
		}
		console.log(buttons)
		// 初始化操作钮
		myApp.actions(buttons);
	});
	// 学生情况选择
	curPage.find('select[name]').on('change' , function(){
		var name = $(this).attr('name');
		var value = $(this).val();
		cd[cName]['students'][ name ] = value;
		cacheData.set('morningCache',JSON.stringify( cd ));
	})

	// 缓存页面数据
	debug && console.log(cd)
	if( cd[cName] ) {
		// 有缓存就读缓存
		debug && console.log('有缓存');
		curPage.find('select[name]').each(function (i ,item){
			var key = $(item).attr('name');
			var val = cd[cName]['students'][key];
			$(item).val( val );
			var text = $(item).find('option:selected').text();
			$(item).next().find('.breach-the-principle').text( text );
		});
		curPage.find('button[name]').each(function (i ,item){
			var key = $(item).attr('name');
			var val = cd[cName]['domitorys'][key];
			$(item).val( val );
			$(item).text( btnText[val] )
		});
	}else {
		// 没有缓存就新建缓存
		debug && console.log('没有缓存');
		cd[cName] = {};
		cd[cName]['students'] = {};
		cd[cName]['domitorys'] = {};
		curPage.find('select[name]').each(function (i ,item){
			var key = $(item).attr('name');
			var val = $(item).val();
			cd[cName]['students'][key] = val;
		});
		curPage.find('.dormitory-check[name]').each(function (i ,item){
			var key = $(item).attr('name');
			var val = $(item).val();
			cd[cName]['domitorys'][key] = val;
		});
		cacheData.set('morningCache',JSON.stringify( cd ));
	}// end of 缓存情况

	// 提交查寝结果
	curPage.find('.dormAttendSubmit').on('click', function(e) {

		ajaxData = jQuery.extend(true, {}, cd[cName]);
		// 把多余的项给去了
		$.each(ajaxData.students,function( i , item ){
			if(item == 0 || item == '无')  delete ajaxData.students[i];
		});
		$.each(ajaxData.domitorys,function( i , item ){
			if(item == 0 || item == '无')  delete ajaxData.domitorys[i];
		});
		// 要给这个寝室的每一个人都记上这个id
		// 要获取该寝室所有人的id
		// 每个人的id作为key值
		// 每个人的违纪项id为val值
		var domData = myApp.template7Data['page:morning-check-2']['dormitory'];
		ajaxData.domStudent = {};
		debug && console.log(domData);
		// 重新组织下查寝的情况
		$.each(ajaxData.domitorys,function( domNum , disciplineId ){
			// 该寝室所有学生的数据 type 数组
			$.each( domData[ domNum ] ,function(i,student) {
				var sId = student.id ;
				ajaxData.domStudent[sId] = disciplineId;
			});
		});
		// 组织完成后，删除原记录
		delete ajaxData.domitorys;
		if($.isEmptyObject( ajaxData.domStudent ) && $.isEmptyObject(ajaxData.students) ){
			myApp.alert('一人未选不能提交,若确实没有可以提交的，便不用提交了');
			return;
		}
		// 查早起描述
		// ajaxData['attendance_desc']
		// 查寝负责人
		ajaxData['attendance_man'] = Template7.global['useres']['id'];
		console.log(ajaxData);
		$.post(ipField + '/front/postDormitoryCheck',{data:JSON.stringify(ajaxData)})
		.done(function (data){
			console.log(data);
			myApp.alert('提交成功',function(){
				mainView.back();
			});
		});
		cacheData.set('morningCache',"");
	});
});



/*===== 6.查晚归 =====*/
myApp.onPageInit('evening-check-1',function (page) {
	var curPage = $(page.container);
	
	showLoading();
	
	
	// 表单验证和表单提交
	$('#eveningCheckOneForm').validate({
		rules:{
			"enterYear":"required",
			"building":"required"
		},
		errorPlacement: function(error, element) {  
		  element.parents('li').next('li').find('.item-inner').append(error);
		},
		errorContainer:".errorContainer",
		submitHandler: function(form) { 
			showLoading();
			var ajaxData = {};     
	    $(form).find('[name]').each(function (i,item) {
	    	var key = $(item).attr('name');
	    	var val = $(item).val();
	    	ajaxData[key] = val;
	    	Template7.global.eveningCheck = Template7.global.eveningCheck || {};
	    	Template7.global.eveningCheck[key] = val;
	    });

			// 请求学生列表
			$.getJSON(ipField + '/front/getStudentByGradeBuilding', 
				{
					enterYear : ajaxData['enterYear'],
					student_building : ajaxData['student_building']
				}, function(json, textStatus) {
					console.log( JSON.stringify(json) )
					
					var context = student2dormitory(json.value);
					console.log( JSON.stringify(context) );
					myApp.template7Data['page:evening-check-2'] = {
						dormitory:context
					}
					hideLoading();
					mainView.loadPage('pages/attendence/evening-check-2.html');
			});
	  }
	});// end of validate
	curPage.find('.submit-next').click(function(){
		$('#eveningCheckOneForm').submit();
	});

	hideLoading();

});

function student2dormitory (students) {
	var context = {}
	$.each(students,function (i,item){
		var dormitoryNumber = item.student_room;
		if ( !context[ dormitoryNumber ] ){
			context[ dormitoryNumber ] = [];
			context[ dormitoryNumber ].push( item );
		}else{
			context[ dormitoryNumber ].push( item );
		}
	});
	return context;
}
	// 查晚寝2
myApp.onPageInit('evening-check-2',function (page){
	var curPage = $(page.container);
	
	var eCheck = Template7.global.eveningCheck;
	var eCache = eCheck['student_building'] + eCheck['enterYear'];
	// 缓存数据
	var cd = {};
	if( cacheData.get('eveningCache') )
		cd = $.parseJSON( cacheData.get('eveningCache') ) ;
	var cName = Template7.global.eveningCheck['student_building'] + 
							Template7.global.eveningCheck['enterYear'];
	console.log(cName);
	// 寝室情况选择
	var btnText = {
		"16" : "拒检" ,
		"2"  : "大功率",
		"17" : "挂锁",
		"0"  : "寝室情况(无)" 
	}
	// 寝室情况
	curPage.find('.dormitory-check').on('click', function (e) {
		e.stopPropagation();
		
		var _this = $(this);
		// 按钮组
		var buttons = [];
		for( key in btnText ){
			var obj = new Object();
			obj['text'] = btnText[key];
			obj['key'] = key;

			var fnClick = function(){
				_this.val( this.key );
				_this.text( this.text );
				
				cd[cName]['domitorys'][ _this.attr('name') ] = this.key;
				cacheData.set('eveningCache',JSON.stringify( cd ));
			}

			obj.onClick = fnClick;
			
			// 最后一个按钮显示红字
			(key == 0) && (obj['color'] = 'red');
			buttons.push(obj);
		}
		console.log(buttons)
		// 初始化操作钮
		myApp.actions(buttons);
	});// end of 寝室情况
	// 学生情况选择
	curPage.find('select[name]').on('change' , function(){
		var name = $(this).attr('name');
		var value = $(this).val();
		cd[cName]['students'][ name ] = value;
		cacheData.set('eveningCache',JSON.stringify( cd ));
	});

	// 缓存页面数据
	debug && console.log(cd)
	if( cd[cName] ) {
		// 有缓存就读缓存
		debug && console.log('有缓存');
		curPage.find('select[name]').each(function (i ,item){
			var key = $(item).attr('name');
			var val = cd[cName]['students'][key];
			$(item).val( val );
			var text = $(item).find('option:selected').text();
			$(item).next().find('.breach-the-principle').text( text );
		});
		curPage.find('button[name]').each(function (i ,item){
			var key = $(item).attr('name');
			var val = cd[cName]['domitorys'][key];
			$(item).val( val );
			$(item).text( btnText[val] )
		});
	}else {
		// 没有缓存就新建缓存
		debug && console.log('没有缓存');
		cd[cName] = {};
		cd[cName]['students'] = {};
		cd[cName]['domitorys'] = {};
		curPage.find('select[name]').each(function (i ,item){
			var key = $(item).attr('name');
			var val = $(item).val();
			cd[cName]['students'][key] = val;
		});
		curPage.find('.dormitory-check[name]').each(function (i ,item){
			// 寝室号码
			var key = $(item).attr('name');
			// 犯错项id
			var val = $(item).val();
			
			cd[cName]['domitorys'][key] = val;
		});
		cacheData.set('eveningCache',JSON.stringify( cd ));
	}// end of 缓存页面数据

	// 提交查寝结果
	curPage.find('.dormAttendSubmit').on('click', function(e) {

		ajaxData = jQuery.extend(true, {}, cd[cName]);
		// 把多余的项给去了
		$.each(ajaxData.students,function( i , item ){
			if(item == 0 || item == '无')  delete ajaxData.students[i];
		});
		$.each(ajaxData.domitorys,function( i , item ){
			if(item == 0 || item == '无')  delete ajaxData.domitorys[i];
		});
		// 要给这个寝室的每一个人都记上这个id
		// 要获取该寝室所有人的id
		// 每个人的id作为key值
		// 每个人的违纪项id为val值
		var domData = myApp.template7Data['page:evening-check-2']['dormitory'];
		ajaxData.domStudent = {};
		debug && console.log(domData);
		// 重新组织下查寝的情况
		$.each(ajaxData.domitorys,function( domNum , disciplineId ){
			// 该寝室所有学生的数据 type 数组
			$.each( domData[ domNum ] ,function(i,student) {
				var sId = student.id ;
				ajaxData.domStudent[sId] = disciplineId;
			});
		});
		// 组织完成后，删除原记录
		delete ajaxData.domitorys
		if($.isEmptyObject( ajaxData.domStudent ) && $.isEmptyObject(ajaxData.students) ){
			myApp.alert('一人未选不能提交,若确实没有可以提交的，便不用提交了');
			return;
		}
		// 查晚归描述
		// ajaxData['attendance_desc']
		// 查寝负责人
		ajaxData['attendance_man'] = Template7.global['useres']['id']
		console.log(ajaxData);
		$.post(ipField + '/front/postDormitoryCheck',{data:JSON.stringify(ajaxData)})
		.done(function (data){
			console.log(data);
			myApp.alert('提交成功',function(){
				mainView.back();
			});
		});
		cacheData.set('eveningCache',"");
	});
});


/*===== 7.部门简介 =====*/
myApp.onPageInit('introduction-department', function(page) {
	var mySwiper = myApp.swiper('.swiper-container-dept', {
		pagination: '.swiper-pagination',
		paginationHide: false,
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop: true,
		spaceBetween: 100,
		speed: 400
	});
});

/*===== 8.通报表扬申请页面 =====*/
myApp.onPageAfterAnimation('apply-for-by', function(page) {
	mainView.router.refreshPage();
});
myApp.onPageBeforeInit('apply-for-by', function(page) {
	myApp.showPreloader('载入中');
	$.ajax({
		url: "jsondata/all_user.json",
		data: {},
		dataType: 'json',
		success: function(data) {
			myApp.hidePreloader();
			myApp.template7Data["url:apply-for-by.html"] = data;
		}
	});
});
/*===== 9.通报批评申请页面 =====*/
myApp.onPageAfterAnimation('apply-for-pp', function(page) {
	mainView.router.refreshPage();
});
myApp.onPageBeforeInit('apply-for-pp', function(page) {
	myApp.showPreloader('载入中');
	$.ajax({
		url: "jsondata/all_user.json",
		data: {},
		dataType: 'json',
		success: function(data) {
			myApp.hidePreloader();
			myApp.template7Data["url:apply-for-pp.html"] = data;
		}
	});
});
/*===== 10.面试 =====*/
myApp.onPageAfterAnimation('interview', function(page) {
	mainView.router.refreshPage();
});
myApp.onPageBeforeInit('interview', function(page) {
	myApp.showPreloader('载入中');
	$.ajax({
		url: "jsondata/interview_data.json",
		data: {},
		dataType: 'json',
		success: function(data) {
			myApp.hidePreloader();
			myApp.template7Data["url:interview.html"] = data;
		}
	});
});

/*===== 11.报表页面 =====*/
function drawChart () {
	Highcharts.setOptions({
		"lang": {
			"printChart": "打印图表",
			"downloadJPEG": "导出JPEG图片",
			"downloadPDF": "导出PDF文档",
			"downloadPNG": "导出PNG 图片",
			"downloadSVG": "导出SVG 矢量图",
			"exportButtonTitle": "导出图片"
		}
	});
	var chart = {
		"title": {
			"text": "各班级考勤情况汇总图表"
		},
		"subtitle": {
			"text": new Date().toString()
		},
		"xAxis": {
			"categories": [],
			"crosshair": true
		},
		"yAxis": {
			"title": {
				"text": "各项指标对应人数"
			}
		},
		"series": []
	};
	var seriesJson = {};
	$.getJSON(ipField + '/all/discipline', function( discipline_list ) {
		$.each(discipline_list, function(i, item) {
			seriesJson[item.discipline_name] = {
				"type": "column",
				"name": item.discipline_name,
				"data": []
			};
		});
	});
	$.getJSON(ipField + '/countByClasses', function( json ) {
		console.log(json);
		var list = json.value;
		var newJson = {};
		$.each(list, function(i, item) {
			if ( !newJson[ item.classes_name ] ) {
				newJson[ item.classes_name ] = {};
			}
			newJson[ item.classes_name ][ item.discipline_name ] = item.number;
		});
		
		
		var categories = [];
		$.each(newJson, function(classes_name, item) {
			categories.push(classes_name);
			
			$.each(seriesJson, function(discipline_name, obj) {
				obj['data'].push( newJson[classes_name][discipline_name] || 0 );
			});
			
		});
		var seriesArray = [];
		$.each(seriesJson, function(discipline_name	, item) {
			seriesArray.push(item);
		});
		
		chart['series'] = seriesArray;
		chart.xAxis.categories = categories;
		// console.log( JSON.stringify(chart) );
		$('#container_new').highcharts(chart);
		drawChart2();
		myApp.hidePreloader('载入中');
	});
}
function drawChart2 () {
	Highcharts.setOptions({
		"lang": {
			"printChart": "打印图表",
			"downloadJPEG": "导出JPEG图片",
			"downloadPDF": "导出PDF文档",
			"downloadPNG": "导出PNG 图片",
			"downloadSVG": "导出SVG 矢量图",
			"exportButtonTitle": "导出图片"
		}
	});
	var chart = {
		"title": {
			"text": "各专业考勤情况汇总图表"
		},
		"subtitle": {
			"text": new Date().toString()
		},
		"xAxis": {
			"categories": [],
			"crosshair": true
		},
		"yAxis": {
			"title": {
				"text": "各项指标对应人数"
			}
		},
		"series": []
	};
	var seriesJson = {};
	$.getJSON(ipField + '/all/discipline', function( discipline_list ) {
		$.each(discipline_list, function(i, item) {
			seriesJson[item.discipline_name] = {
				"type": "column",
				"name": item.discipline_name,
				"data": []
			};
		});
	});
	$.getJSON(ipField + '/countByMajor', function( json ) {
		console.log(json);
		var list = json.value;
		var newJson = {};
		$.each(list, function(i, item) {
			if ( !newJson[ item.major_name ] ) {
				newJson[ item.major_name ] = {};
			}
			newJson[ item.major_name ][ item.discipline_name ] = item.number;
		});
		
		
		var categories = [];
		$.each(newJson, function(major_name, item) {
			categories.push(major_name);
			
			$.each(seriesJson, function(discipline_name, obj) {
				obj['data'].push( newJson[major_name][discipline_name] || 0 );
			});
			
		});
		var seriesArray = [];
		$.each(seriesJson, function(discipline_name	, item) {
			seriesArray.push(item);
		});
		
		chart['series'] = seriesArray;
		chart.xAxis.categories = categories;
		// console.log( JSON.stringify(chart) );
		$('#container_new2').highcharts(chart);
		drawChart3()
		myApp.hidePreloader();
	});
}
function drawChart3 () {
	Highcharts.setOptions({
		"lang": {
			"printChart": "打印图表",
			"downloadJPEG": "导出JPEG图片",
			"downloadPDF": "导出PDF文档",
			"downloadPNG": "导出PNG 图片",
			"downloadSVG": "导出SVG 矢量图",
			"exportButtonTitle": "导出图片"
		}
	});
	var chart = {
		"title": {
			"text": "各年级考勤情况汇总图表"
		},
		"subtitle": {
			"text": new Date().toString()
		},
		"xAxis": {
			"categories": [],
			"crosshair": true
		},
		"yAxis": {
			"title": {
				"text": "各项指标对应人数"
			}
		},
		"series": []
	};
	var seriesJson = {};
	$.getJSON(ipField + '/all/discipline', function( discipline_list ) {
		$.each(discipline_list, function(i, item) {
			seriesJson[item.discipline_name] = {
				"type": "column",
				"name": item.discipline_name,
				"data": []
			};
		});
	});
	$.getJSON(ipField + '/countByYear', function( json ) {
		console.log(json);
		var list = json.value;
		var newJson = {};
		$.each(list, function(i, item) {
			if ( !newJson[ item.grade ] ) {
				newJson[ item.grade ] = {};
			}
			newJson[ item.grade ][ item.discipline_name ] = item.number;
		});
		
		
		var categories = [];
		$.each(newJson, function(grade, item) {
			categories.push(grade);
			
			$.each(seriesJson, function(discipline_name, obj) {
				obj['data'].push( newJson[grade][discipline_name] || 0 );
			});
			
		});
		var seriesArray = [];
		$.each(seriesJson, function(discipline_name	, item) {
			seriesArray.push(item);
		});
		
		chart['series'] = seriesArray;
		chart.xAxis.categories = categories;
		// console.log( JSON.stringify(chart) );
		$('#container_new3').highcharts(chart);
	});
}
myApp.onPageBeforeInit('notification-detail-chart', function(page) {
	myApp.showPreloader('载入中');
	LoadHighchartScript(drawChart);
});
/*===== 12.早操 =====*/
myApp.onPageInit('exercise-check', function(page) {
	var curPage = $(page.container);
	var modal = $.parseJSON( cacheData.get('exerciseCache') );;
	showLoading();
	if ( modal ){
		// 如果有缓存则读取缓存
		debug && console.log( '有缓存' );
		debug && console.log( modal )
		curPage.find('select[name]').each(function(i,item){
			var key = $(item).attr('name');
			var val = modal[key] ;
			$(item).val( val );
			var text = $(item).find('option:selected').text();
			$(item).next().find('.exercise-result').text(text);
		});
	}
	else{
		// 没有缓存则建立缓存
		debug && console.log( '没有缓存' );
		modal = {};
		curPage.find('select[name]').each(function(i,item){
			var key = $(item).attr('name');
			var val = $(item).val();
			modal[key] = val;
		});

		cacheData.set('exerciseCache',JSON.stringify(modal));

	}
	// 选择后更新缓存
	curPage.find('select[name]').on('change', function(e) {
		var key = $(this).attr('name');
		var val = $(this).val();
		modal[ key ] = val;
		cacheData.set('exerciseCache',JSON.stringify(modal));
	});
	// 提交
	curPage.find('.exerciseSubmit').on('click', function(e) {
		$.each(modal, function(sId, disciplineId) {
			if(disciplineId == 0) delete modal[sId];
		});
		if(modal.length <= 0) {
			myApp.alert('没有可以提交的数据，不必提交');
			return;
		}

		ajaxData = {};
		ajaxData[ 'attendance_man' ] = Template7.global.useres.id;
		ajaxData[ 'result' ] = modal;
		$.post(ipField + '/front/postExerciseCheck',{data : JSON.stringify(ajaxData)})
		.done(function(data){
			debug && console.log(data);
			myApp.alert('提交成功',function () {
				mainView.back();
			});
		});

	});
	hideLoading();

});
/*===== 13.通报表扬详情页面 =====*/
myApp.onPageAfterAnimation("notification-detail-by", function(page) {
	mainView.router.refreshPage();
});
myApp.onPageBeforeInit('notification-detail-by', function(page) {
	myApp.showPreloader('载入中');
	$.ajax({
		url: "jsondata/notification.json",
		data: {},
		dataType: 'json',
		success: function(data) {
			myApp.hidePreloader();
			myApp.template7Data["url:notification-detail-by.html"] = data;
		}
	});
});
/*===== 15.个人信息页面 =====*/
myApp.onPageInit("information-card", function(page) {
	curPage = $(page.container);
	showLoading();
	var userId = Template7.global.userId;

	$.getJSON(ipField + "/getUserInfoCard",{id:userId},function(json){

		var context = json.value[0];
		context['useres_nickname'] = context['useres_name'].substring(context['useres_name'].length-2);

		console.log(json);
		
		var htmlStr = compileScript('#userInfoTemplate', context);
		
		curPage.find('.list-block.media-list').html( htmlStr );

		hideLoading();
	});
});
/*===== 16.编辑个人资料界面 =====*/
myApp.onPageInit("information-card-edit", function(page) {

	$('#edit-person-info').find('.submit').click(function() {
		var data = myApp.formToJSON('#edit-person-info');
		$.ajax({
			url: Template7.global.basePath + 'updatePersonInfo',
			type: 'POST',
			data: data,
			dataType: 'json',
			success: function(d) {
				myApp.alert(d.msg, function() {
					if (d.msg == '修改成功请刷新页面') mainView.back();
				});
			}
		});
	});

});
/*===== 17.招新申请页面 =====*/
myApp.onPageInit("apply-for-new", function(page) {

	var applyForNewValidateFn = function() {
		// 表单验证
		$("#apply-for-new").validate({
			rules: {
				id: {
					required: true,
					digits: true,
					rangelength: [12, 12]
				},
				tel: {
					required: true,
					digits: true,
					rangelength: [11, 11]
				},
				qq: {
					required: true,
					digits: true
				},
				mail: {
					required: true,
					email: true
				},
				dept: {
					required: true
				},
				person_explain: {
					required: true,
					minlength: 10
				}
			},
			messages: {
				id: {
					required: "请填写您的学号",
					digits: "请输入数字",
					rangelength: "您的学号应是12位的"
				},
				tel: {
					required: "请填写您的常用手机号码",
					digits: "请输入数字",
					rangelength: "请输入11位手机号码"
				},
				qq: {
					required: "不能为空",
					digits: "请输入数字"
				},
				mail: {
					required: "不能为空",
					email: "请输入正确的邮箱"
				},
				dept: {
					required: "请选择您要竞选的部门"
				},
				person_explain: {
					required: "请填写您的个人评价",
					minlength: "不得少于10字"
				}
			},
			errorPlacement: function(error, element) {
				error.insertAfter(element.parent()
					.parent().parent().parent()
					.next().children().children().children());
			}
		});
		$("#apply-for-new").find('.submit').click(function() {
			// 如果表单验证通过了
			if ($("#apply-for-new").valid()) {
				// 表单提交
				var json = myApp.formToJSON('#apply-for-new');
				console.log(json);
				$.ajax({
					url: ipField + '/front/newUser',
					type: 'POST',
					data: json,
					dataType: 'json',
					success: function(data) {
						myApp.alert(data.message,function () {
							if(data.status == 1) mainView.back();
						})
					}
				});
			}
		});
	};

	LoadValidationScript(applyForNewValidateFn);

});

/*===== 18.志愿者活动页面 =====*/
myApp.onPageInit('voluntary-activity',function(page){
	$('.applyForVolBtn').on('click', function(event) {
		Template7.global.activityid = $(this).data('activityid');
	});
	var swiperVoluntary = myApp.swiper('#swiper-container-volutary', {
		paginationHide: true,
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop: true,
		spaceBetween: 100,
		speed: 400
	});
});

myApp.onPageInit('apply-for-voluntary',function(page){
	curPage = $(page.container);
	var activityid = Template7.global.activityid;
	curPage.find('#activityid').val(activityid);
	$('#applyForVoluntary').validate({
		rules:{
			"activity_id":"required",
			"student_id":{
				required:true,
				digits:true,
				maxlength:12,
				minlength:12
			},
			"student_mobile":{
				required:true,
				digits:true,
				maxlength:11,
				minlength:11
			}
		},
		errorPlacement: function(error, element) {  
		  element.parents('li').next('li').find('.item-inner').append(error);
		},
		errorContainer:".errorContainer",
		submitHandler: function(form) {      
	    ajaxData = {};
			$(form).find('[name]').each(function(i,item){
				var key = $(item).attr('name');
				var val = $.trim($(item).val());
				
				ajaxData[ key ] = val;
			});

			console.log(ajaxData);
			$.post(ipField + '/front/applyForActivity',ajaxData)
			.done(function (json){
				json = $.parseJSON(json);
				console.log(JSON.stringify( json ) )
				myApp.alert(json.message,function () {
					if( json.status === 1 ){
						mainView.back();
					}
				})
			})
	  }
	});
	curPage.find('.submit').on('click', function(e) {
		$('#applyForVoluntary').submit();
	});
	
});

/*===== 19.查课页面 =====*/

myApp.onPageInit('lesson-check-1',function(page){
	
	var curPage = $(page.container);
	var fnLoad = function(){
		var obj = JSON.parse( cacheData.get('lessonCheck') );
		curPage.find('select,input').each(function(i, filedElem) {
		    $.each(obj,function(name , value){
		    	if(filedElem.name == name) filedElem.value = value;
		    });
		});
	};
	var fnSave = function(){
		var data = {};
		var flag = true;
		curPage.find('select,input').each(function(index, el) {
			if(!el.value) flag = false;
		    data[el.name] = el.value;
		});
		if( !flag ) {return flag;}
		debug && console.dir(data);
		cacheData.set("lessonCheck",JSON.stringify(data));
		return flag;
	};
	
	// 若是本地存储中含有lessonCheck则加载进来
	cacheData.get("lessonCheck") && fnLoad();
	curPage.find('.submit-next').click(function(e){
		if ( !fnSave() ) {debug && console.log( "保存失败！" );myApp.alert("还没填完呢，再检查检查");return false;}
		debug && console.log(localStorage);
	});
	// 根据majorId和enterYear来定位班级
	curPage.find('[name="majorId"],[name="enterYear"]').on('change', function(event) {
		var majorId = curPage.find('[name="majorId"]').val();
		var enterYear = curPage.find('[name="enterYear"]').val();
		var classesSelect = curPage.find('[name="classes"]');
		$.getJSON(ipField + '/front/getClasses',{majorId:majorId,enterYear:enterYear}
			, function(json, textStatus) {
			var data = json.value;
			var str = '';
			$.each(data, function(i,item) {
				str+='<option value="'+item.id+'">'+item.classes_name+'</option>';
			});
			classesSelect.html(str);
		});
	});
	// 表单验证和表单提交
	$('#lessonCheckOneForm').validate({
		rules:{
			"enterYear":"required",
			"majorId":"required",
			"classes":"required",
			"course":{
				required:true
			},
			"classroom":{
				required:true,
				digits:true
			},
			"need-number":{
				required:true,
				digits:true
			},
			"real-number":{
				required:true,
				digits:true
			}
		},
		errorPlacement: function(error, element) {  
		  element.parents('li').next('li').find('.item-inner').append(error);
		},
		errorContainer:".errorContainer",
		submitHandler: function(form) {      
	    ajaxData = {};
	    // 提交的时候，计算缺勤人数
	    // 获取班级人员列表
	    // 拼接查课描述
	    $(form).find('[name]').each(function (i,item){
	    	var formElem = $(item);
	    	var key = formElem.attr('name');
	    	var val = formElem.val();
	    	ajaxData[key] = val;
	    });
	    var qNumber = parseInt(ajaxData['need-number']) - parseInt(ajaxData['real-number']);
	    if(qNumber <= 0) return;
	    var className = $(form).find('[name="classes"]').find('option:selected').text();
	    var now = new Date().format('yyyy-MM-dd hh:mm:ss');
	    var buildingNumber = ajaxData['building-number'];
	    var classroom = ajaxData['classroom'];
	    var course = ajaxData['course'];

	    var attendenceDesc = className + '班于' + now +'在'+buildingNumber+classroom+'上'
	    											+course+'课时，'+qNumber+'人考勤异常';
	    //  查课数据											
	    Template7.global.lessonCheck = {
	    	data : {
		    	// 查课描述
		    	'attendance_desc' : attendenceDesc,
		    	// 查课人
		    	'attendance_man' : Template7.global['useres']['id']
		    }
		  }
			debug && console.log(ajaxData);
			debug && console.log(attendenceDesc);
			showLoading();
			// 请求学生列表
			$.getJSON(ipField + '/front/getStudentByMajorGradeClasses', 
				{
					majorId : ajaxData['majorId'],
					enterYear : ajaxData['enterYear'],
					classes : ajaxData['classes']
				}, function(json, textStatus) {
					console.log( JSON.stringify(json) )
					Template7.global.lessonCheckStudent = json.value;
					hideLoading();
					mainView.loadPage('pages/attendence/lesson-check-2.html');
			});
	  }
	});// end of validate
	curPage.find('.submit-next').click(function(){
		$('#lessonCheckOneForm').submit();
	});
});

myApp.onPageInit('lesson-check-2',function(page){
	var fnFormart = function(e){
		var text = $(e.target).html();
		
		var substr = text.replace(/,/g,'<br>');
		debug && console.log(text);
		debug && console.log(substr);
		if( $(e.target).hasClass('student-list') ){
			$('.student-list').off();
			$('.student-list').html(substr);
			$('.student-list').on('DOMNodeInserted',fnFormart);
		}else if( $(e.target).hasClass('student-list-leave') ){
			$('.student-list-leave').off();
			$('.student-list-leave').html(substr);
			$('.student-list-leave').on('DOMNodeInserted',fnFormart);
		}else if( $(e.target).hasClass('student-list-late') ){
			$('.student-list-late').off();
			$('.student-list-late').html(substr);
			$('.student-list-late').on('DOMNodeInserted',fnFormart);
		}
	};
	
	var fnClear = function(){
		cacheData.remove('lessonCheck');
	};
	var fnSaveAll = function(){
		var arrLeave  = [];
		var arrAbsent = [];
		var arrLate   = [];
		var obj = JSON.parse( cacheData.get("lessonCheck") );
		console.log( curPage.find('select:eq(0) :selected').size() );

		curPage.find('select:eq(0) :selected').each(function(index, el) {
		  arrAbsent.push(el.value);
		});
		curPage.find('select:eq(1) :selected').each(function(index, el) {
		  arrLeave.push(el.value);
		});
		curPage.find('select:eq(2) :selected').each(function(index, el) {
		  arrLate.push(el.value);
		});

		if( obj["need-number"]-obj["real-number"] != (arrAbsent.length+arrLeave.length+arrLate.length) ){
			myApp.alert("人数与缺勤人数不一致,请重新选择");return null;
		}
		obj["result"] = {
			absentList : arrAbsent,
			leaveList  : arrLeave,
			lateList   : arrLate
		};
		Template7.global.lessonCheck['data']['result'] = {
			// 缺课名单
			absentList : arrAbsent,
			// 请假名单
			leaveList  : arrLeave,
			// 迟到名单
			lateList   : arrLate
		};
		// 查课时间
		Template7.global.lessonCheck['data']['attendance_date'] = new Date().format('yyyy-MM-dd hh:mm:ss');
		return obj;
	}
	var fnSubmit = function(){
		var data = fnSaveAll();
		if(!data) return ;
		debug && console.log( data );
		showLoading();
		//	此处可以将数据传到后台去
		var strstr = JSON.stringify(Template7.global.lessonCheck.data);
		console.log(strstr)
		$.post(ipField + '/front/postLessonCheck', {data : strstr})
		.done(function(json){
			json = $.parseJSON(json);
			console.log(json);
			// setTimeout(function(){
			hideLoading();
			myApp.alert("提交成功",function(){
				mainView.back(mainView.back(mainView.back));
			});
			// },3000);
			fnClear();
			$(this).off();
		});
		
	};
	// $.getJSON("jsondata/exercise.json",function(data){
	// 	var htmlStr = compileScript("#lessonCheckTemplate",data);
	// 	var container = curPage.find("#lessonCheckForm");
	// 	$(htmlStr).appendTo(container);
		
	// });
	$('.student-list,.student-list-leave,.student-list-late').on('DOMNodeInserted',fnFormart);
	var curPage = $(page.container);
	// 只能提交一次
	curPage.find('.submit').on('click',fnSubmit);
});
/*===== 20.考勤功能列表页 =====*/
myApp.onPageInit('work-attendance',function(page){
	var curPage = $(page.container);

	// var data ={
	// 	lists:[
	// 		{url:"pages/attendence/morning-check-1.html",text:"查早寝"},
	// 		{url:"pages/attendence/evening-check-1.html",text:"查晚寝"},
	// 		{url:"pages/attendence/lesson-check-1.html",text:"查课"},
	// 		{url:"pages/attendence/exercise-check.html",text:"查早操"},
	// 		{url:"pages/attendence/meeting-check.html",text:"会议考勤"}
	// 	]
	// }
	var data = {};
	data.lists = [];
	$.each(Template7.global.power_list , function (i,item){
		if( item.parent_id == 59 ){
			var obj = {
				url : item.power_url,
				text : item.power_name
			}
			data.lists.push( obj );
		}
	});

	var linkList = compileScript("#linkListTemplate",data);
	$(linkList).appendTo(curPage.find(".page-content"));
	
});

/*===== 21.通报列表页 =====*/
myApp.onPageInit('notification-list',function(page){
	var curPage = $(page.container);
	
	$.getJSON(ipField + '/front/getNoticeList', function(json, textStatus) {
		var data = {
			lists : json.value
		};
	
		var linkList = compileScript("#linkListTemplate",data);
		$(linkList).appendTo(curPage.find(".page-content"));

		$('.pages').on('click', '[href="pages/notification/notification-detail-zlb.html"],'+
			'[href="pages/notification/notification-detail-xxb.html"],'+
			'[href="pages/notification/notification-detail-pp.html"],'+
			'[href="pages/notification/notification-detail-by.html"]', 
			function(e) {
			  var url = $(this).attr('href');
			  var key = 'page:' + url.split('.')[0].split('/')[2] + '-data';
			  
			  if (typeof $(this).data('value') !== 'string')
			  	var val = JSON.stringify( $(this).data('value') );
			  else
			  	var val = $(this).data('value');
			  myApp.template7Data[ key ] = val;

		});
	});
});
// 活动列表页
myApp.onPageInit('activity-list',function(page){
	var curPage = $(page.container);
	
	$.getJSON(ipField + '/front/getMyActivity', {id:Template7.global.useres.id}, function(json, textStatus) {
		var data = {
			lists : json.value
		};
		$.each(data.lists, function(i, item) {
			item['url'] = 'pages/contact/voluntary-contact.html';
		});
	
		var linkList = compileScript("#linkListTemplate",data);
		$(linkList).appendTo(curPage.find(".page-content"));

		$('.pages').on('click', '[href="pages/contact/voluntary-contact.html"]', 
			function(e) {
			  var url = $(this).attr('href');
			  var key = 'page:' + url.split('.')[0].split('/')[2] + '-data';
			  
			  if (typeof $(this).data('value') !== 'string')
			  	var val = JSON.stringify( $(this).data('value') );
			  else
			  	var val = $(this).data('value');
			  myApp.template7Data[ key ] = val;
			  // console.log('myApp.template7Data[ '+key+' ]' + myApp.template7Data[ key ])
		});
	});
});
/*=====  22.学习部通报  =====*/
myApp.onPageInit('notification-detail-xxb',function(page){
	console.log('================================================================')
	var curPage = $(page.container);
	
	var context = myApp.template7Data['page:notification-detail-xxb-data'];
	context = $.parseJSON(context);
	// $.getJSON('jsondata/notification-lesson-check.json',{},function(context){
	  var htmlElem = compileScript("#lessonCheckNoticeTemplate",context);
	  $(htmlElem).appendTo(curPage.find('.page-content'));
	// });
});
/*===== 23.自律部通报 =====*/
myApp.onPageInit('notification-detail-zlb',function(page){
	var curPage = $(page.container);
	
	var context = myApp.template7Data['page:notification-detail-zlb-data'];
	context = $.parseJSON(context);
	console.log(context)
	// $.getJSON('jsondata/notification-dorm-check.json',{},function(context){
		var htmlElem = compileScript("#dormCheckNoticeTemplate",context);
		$(htmlElem).appendTo(curPage.find('.page-content'));
	// });
});
/*===== 24.通报批评详情页 =====*/
myApp.onPageInit('notification-detail-pp',function(page){
  var curPage = $(page.container);

  var context = myApp.template7Data['page:notification-detail-pp-data'];
	context = $.parseJSON(context);

  // $.getJSON('jsondata/notification-pp.json',{},function(context){
    var htmlElem = compileScript("#PPNoticeTemplate",context);
    $(htmlElem).appendTo(curPage.find('.page-content'));
  // });
});
/*===== 25.通报表扬详情页 =====*/
myApp.onPageInit('notification-detail-by',function(page){
  var curPage = $(page.container);
  var context = myApp.template7Data['page:notification-detail-by-data'];
	context = $.parseJSON(context);

  // $.getJSON('jsondata/notification-by.json',{},function(context){
    var htmlElem = compileScript("#BYNoticeTemplate",context);
    $(htmlElem).appendTo(curPage.find('.page-content'));
  // });
});
/*===== 26.我的任务 =====*/
myApp.onPageInit('my-task',function(page){
  var curPage = $$(page.container);
  //  下拉刷新
  curPage.find('.pull-to-refresh-content').on('refresh',function(e){
    // console.log("aaaa");
    // setTimeout(function(){
    //   myApp.pullToRefreshDone();
    // },2000);
    $.getJSON(ipField + '/front/getMyTask',{id : Template7.global.useres.id},function(json){
	  	var context = {};
	  	context['taskList'] = json.value;{
		  if (json.value && json.value.length !== 0)
		    var htmlElem = compileScript("#taskTemplate",context);
		    curPage.find('.ajaxContainer').html(htmlElem);
		  }
	    myApp.pullToRefreshDone();
	  });
  });
  //  请求数据
  $.getJSON(ipField + '/front/getMyTask',{id : Template7.global.useres.id},function(json){
  	var context = {};
  	context['taskList'] = json.value;
  	if (json.value && json.value.length !== 0){
    	var htmlElem = compileScript("#taskTemplate",context);
   		$(htmlElem).appendTo(curPage.find('.ajaxContainer'));
   	}
  });
});
/*27.志愿者通讯录页面*/
myApp.onPageInit('voluntary-contact', function(page) {
  var curPage = $(page.container);
  var volunteer_ids = myApp.template7Data["page:voluntary-contact-data"];
  // console.log('myApp.template7Data["page:voluntary-contact-data"] : ' + myApp.template7Data["page:voluntary-contact-data"])
  showLoading();

  $.getJSON(ipField + "/front/getVolunteerList", {ids:volunteer_ids}, function(context) {
    $('.ajaxContain').html(compileScript('#VolunteerList', context));
    hideLoading();
  });
});
/*28.提交意见箱*/
myApp.onPageInit('idea-box-submit',function (page) {
	var curPage = $(page.container);
	curPage.find('.submit').click(function(e) {
		ajaxData = {};
		flag = true;
		curPage.find('[name]').each(function(i,elem) {
			var key = $(elem).attr('name');
			var val = $.trim( $(elem).val() );
			if(val=== '' && key === 'ibox_name'){
				val = '匿名';
			}
			if(val === '' && key === 'ibox_content') {
				myApp.alert('意见不能为空');
				flag = false;
				return;
			}
			ajaxData[ key ] = val;
		});
		ajaxData['ibox_date'] = new Date().format('yyyy-MM-dd');
		
		if(!flag) {
			return;
		}
		else{
			showLoading();
			$.post(ipField + '/front/postIBox',ajaxData)
			.done(function (json) {
				hideLoading();
				json = $.parseJSON(json);
				myApp.alert(json['message'],function () {
					mainView.back();
				});
			});
		}
	});
});

myApp.onPageInit('setting-password',function (page) {
	var curPage = $(page.container);
	curPage.find('.submit-setting-pass').click(function (){
		var flag = false;
		var ajaxData = {};
		curPage.find('input[type="password"]').each(function (i,item){
			var reg = /[a-zA-Z_0-9]{5,20}/;
			if ( reg.test(item.value) ){
				ajaxData[ item.name ] =  hex_md5( $.trim(item.value) ) ;
			}else{
				flag = true;
			}
		});
		if( $.trim(curPage.find('input[name="new_password"]').val()) != $.trim(curPage.find('input[name="repeat_password"]').val()) ){
			myApp.alert( '两次输入的密码不一致,请重新输入' );
			return false;
		}
		if(flag) {
			myApp.alert( '密码不符合要求,请重新输入' );
			return false;
		}else{
			ajaxData[ 'id' ] = curPage.find('[name="id"]').val();
			// console.log( ajaxData );
			$.post(ipField + '/setPsw',ajaxData)
			.done(function (data) {
				// console.log(data);
				var json = $.parseJSON(data);
				if (json.status) {
					myApp.alert(json.message,function (){
						mainView.back();
					});
				};
			});
		}
	});
});