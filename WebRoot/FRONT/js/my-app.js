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

// 初始化应用
var myApp = new Framework7({
	//	pushState:true,
	cache: true,
	// swipePanel: 'left',
	swipeBackPage:false,
	smartSelectBackOnSelect: true,
	precompileTemplates: true,
	template7Pages: true,
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
	basePath: '/xshms/WebRoot',
	frontPath: '/xshms/WebRoot/FRONT/',
	pagePath: '/xshms/WebRoot/FRONT/pages/',
	personalPath: '/xshms/WebRoot/FRONT/pages/personal/',
	login_status: false
};



/*===== 1.主页 =====*/
myApp.onPageInit('index', function(page) {
	
});


/*===== 2.登录页面 =====*/

myApp.onPageInit('login-screen', function(page) {

	var curPage = $$(page.container);

	curPage.find('.login-btn').on('click', function() {
		var username = curPage.find('input[name="username"]').val();
		var password = curPage.find('input[name="password"]').val();
		
		LoginBiz(username, password,function(msg ,login_status){
			myApp.alert(msg, function(){
				if(login_status) mainView.back();
			});
		});
		
	});

});


/*===== 3.通讯录页面 =====*/
myApp.onPageInit('contact', function(page) {
	var curPage = $(page.container);
	showLoading();
	$.getJSON("jsondata/contacts.json", {}, function(context) {
		$('.ajaxContain').html(compileScript('#ContactList', context));
		
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
	var model = [];
	
	showLoading();
	$.getJSON("jsondata/meeting.json", function(context) {
		
		var fnSave = function(){
			if(model.length != 0) cacheData.set("meetingCache", JSON.stringify( model ));
			debug && console.log("save model");
		}
		var fnLoad = function(){
			if( cacheData.get("meetingCache") ){
				debug && console.log("有缓存");
				model = JSON.parse( cacheData.get("meetingCache") );
				checkResult.each(function(i ,elem){
					elem.innerHTML = model[i];
				});
			}else{
				debug && console.log("没有缓存");
				for(var i = 0; i < checkResult.size();i++){
					model.push("缺席");
				}
				debug && console.log("初始化数据层");
				debug && console.log(model);
			}
		}
		
		$('#ajaxContain_meeting').html(compileScript('#meetingTemplate', context));
		// 页面加载完成之后，获取所有的结果dom
		var checkResult = curPage.find('.meeting-result');
		// 加载数据
		fnLoad();
		// 监听数据改变，同步更新数据层
		checkResult.on("DOMNodeInserted",function(){
			var i = checkResult.index( this );
			model[i] = this.innerHTML;
			fnSave();
		});
		
		hideLoading();
		
	});
});
/*===== 5.查早起 =====*/
myApp.onPageInit('morning-check', function(page) {
	var model = {aRoomCache:[],aStuCache:[]};
	var curPage = $(page.container);
	curPage.find('.dormAttendSubmit').click(function(){
		console.dir( fnDormAttendSubmit() );
	});
	
	showLoading();
	$.getJSON("jsondata/dormitory.json", {}, function(context) {
		
		$('#ajaxContain_morning').html( compileScript('#dormTemplate', context) );
		var aStu  = curPage.find('.breach-the-principle');
		var aRoom = curPage.find('.button.dormitory-check');
		var roomModel = [];
		var stuModel = [];
		// 本地缓存
		var fnSave = function(){
			model.aRoomCache = roomModel;
			model.aStuCache = stuModel;
			cacheData.set("morningCache",JSON.stringify(model));
			debug && console.log(cacheData.get("morningCache"));
		};
		// 加载本地缓存
		var fnLoad = function(){
			if(cacheData.get("morningCache")){
				model = JSON.parse(cacheData.get("morningCache"));
				roomModel = model.aRoomCache;
				stuModel = model.aStuCache;
				debug && console.log("有缓存");
			}else{
				debug && console.log("没有缓存");
				for(var i = 0 ; i < aStu.size();i++){
					stuModel.push("无");
				}
				for(var i = 0 ; i < aRoom.size();i++){
					roomModel.push("寝室情况(无)");
				}
				
				model.aRoomCache = roomModel;
				model.aStuCache = stuModel;
				cacheData.set("morningCache",JSON.stringify(model));
			}
			aStu.each(function(i,elem){
				elem.innerHTML = stuModel[i];
			});
			aRoom.each(function(i,elem){
				elem.value = roomModel[i];
			});
			console.log(roomModel);
			console.log(stuModel);
		};
		fnLoad();
		hideLoading();
		aStu.on('DOMNodeInserted',function(){
			var i = aStu.index(this);
			stuModel[i] = this.innerHTML;
			fnSave();
			
			debug && console.log(stuModel);
		});
		curPage.find('.dormitory-check').click(function(e) {
			e.stopPropagation();
		});
		curPage.find('.dormitory-check').on('click', function() {
			var _this = $(this);
			var fnClick = function() {
					_this.val( this.text );
					var i = aRoom.index( _this[0] );
					roomModel[i] = this.text;
					fnSave();
					debug && console.log(roomModel);
				};
			var btnText = ['拒检','未挂大锁','贴可视窗','差寝','优寝','寝室情况(无)'];
			var buttons = [];
			for(var i = 0; i < btnText.length;i++){
				var obj = {text : btnText[i],onClick : fnClick};
				(i == btnText.length-1) && (obj['color'] = 'red');
				buttons.push(obj);
			}
			myApp.actions(buttons);
		});
	});
});

/*===== 6.查晚归 =====*/
myApp.onPageInit('evening-check', function(page) {
	var model = {aRoomCache:[],aStuCache:[]};
	var curPage = $(page.container);
	
	
	showLoading();
	$.getJSON("jsondata/dormitory.json", {}, function(context) {
		
		$('#ajaxContain_evening').html(compileScript('#dormEveningTemplate', context));
		var aStu  = curPage.find('.breach-the-principle');
		var aRoom = curPage.find('.button.dormitory-check');
		var roomModel = [];
		var stuModel = [];
		// 本地缓存
		var fnSave = function(){
			model.aRoomCache = roomModel;
			model.aStuCache = stuModel;
			cacheData.set("eveningCache",JSON.stringify(model));
			debug && console.log(cacheData.get("eveningCache"));
		};
		// 加载本地缓存
		var fnLoad = function(){
			if(cacheData.get("eveningCache")){
				model = JSON.parse(cacheData.get("eveningCache"));
				roomModel = model.aRoomCache;
				stuModel = model.aStuCache;
				debug && console.log("有缓存");
			}else{
				debug && console.log("没有缓存");
				for(var i = 0 ; i < aStu.size();i++){
					stuModel.push("无");
				}
				for(var i = 0 ; i < aRoom.size();i++){
					roomModel.push("寝室情况(无)");
				}
				
				model.aRoomCache = roomModel;
				model.aStuCache = stuModel;
				cacheData.set("eveningCache",JSON.stringify(model));
			}
			aStu.each(function(i,elem){
				elem.innerHTML = stuModel[i];
			});
			aRoom.each(function(i,elem){
				elem.value = roomModel[i];
			});
			console.log(roomModel);
			console.log(stuModel);
		};
		fnLoad();
		hideLoading();
		aStu.on('DOMNodeInserted',function(){
			var i = aStu.index(this);
			stuModel[i] = this.innerHTML;
			fnSave();
			
			debug && console.log(stuModel);
		});
		
		
		curPage.find('.dormitory-check').click(function(e) {
			e.stopPropagation();
		});
		curPage.find('.dormAttendSubmit').click(function(){
			// 这里是查寝结果，传输到后台的数据
			debug && console.dir( fnDormAttendSubmit() );
		});
		curPage.find('.dormitory-check').on('click', function() {
			
			var _this = $(this);
			var fnClick = function() {
					_this.val( this.text );
					var i = aRoom.index( _this[0] );
					roomModel[i] = this.text;
					fnSave();
					debug && console.log(roomModel);
				};
			var btnText = ['拒检','大功率','挂锁','寝室情况(无)'];
			var buttons = [];
			for(var i = 0; i < btnText.length;i++){
				var obj = {text : btnText[i],onClick : fnClick};
				(i == btnText.length-1) && (obj['color'] = 'red');
				buttons.push(obj);
			}
			myApp.actions(buttons);
		});
		
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

myApp.onPageBeforeInit('notification-detail-chart', function(page) {
	myApp.showPreloader('载入中');
	LoadHighchartScript(function() {
		Highcharts.setOptions({
			"lang": {
				"printChart": "打印图表",
				"downloadJPEG": "下载JPEG图片",
				"downloadPDF": "下载PDF文档",
				"downloadPNG": "下载PNG 图片",
				"downloadSVG": "下载SVG 矢量图",
				"exportButtonTitle": "导出图片"
			}
		});
		$.ajax({
			url: "jsondata/violations-data.json",
			data: {},
			dataType: "json",
			success: function(data) {
				myApp.hidePreloader();

				var no_back = [],
					late_back = [],
					no_lesson = [],
					illegal_use_of_electricity = [],
					refuse_to_check = [],
					no_make_bed = [],
					no_wake_up = [],
					no_locked = [],
					stick_windows = [],
					morning_exercises_absence = [],
					meeting_absence = [],
					leave_off = [],
					other = [],
					classes = [];
				// 各班违纪总人次
				var all_class_array = [],
					// 年级违纪总人次
					sum = 0,
					// 各班违纪率
					all_class_violation_rate = [];



				for (var i = 0; i < data.class.length; i++) {
					var _this = data.class[i];
					all_class_array.push(0);
					for (var type in _this) {
						switch (type) {
							case "name":
								classes.push(_this[type]);
								break;
							case "no-back":
								no_back.push(_this[type]);
								break;
							case "late-back":
								late_back.push(_this[type]);
								break;
							case "no-lesson":
								no_lesson.push(_this[type]);
								break;
							case "illegal-use-of-electricity":
								illegal_use_of_electricity.push(_this[type]);
								break;
							case "refuse-to-check":
								refuse_to_check.push(_this[type]);
								break;
							case "no-make-bed":
								no_make_bed.push(_this[type]);
								break;
							case "no-wake-up":
								no_wake_up.push(_this[type]);
								break;
							case "no-locked":
								no_locked.push(_this[type]);
								break;
							case "stick-windows":
								stick_windows.push(_this[type]);
								break;
							case "morning-exercises-absence":
								morning_exercises_absence.push(_this[type]);
								break;
							case "meeting-absence":
								meeting_absence.push(_this[type]);
								break;
							case "leave-off":
								leave_off.push(_this[type]);
								break;
							case "other":
								other.push(_this[type]);
								break;
							default:
								break;
						}

						if (type !== "name") {
							all_class_array[i] += _this[type];
						}

					}
				}

				for (var i = 0; i < data.class.length; i++) {
					sum += all_class_array[i];
				}

				for (var i = 0; i < data.class.length; i++) {
					var obj = [data.class[i]["name"], all_class_array[i] / sum];
					all_class_violation_rate.push(obj);
				}

				var chart = new Highcharts.Chart({
					"chart": {
						"renderTo": "container"
					},
					"title": {
						"text": "各班违纪汇总图表"
					},
					"subtitle": {
						"text": "2015-10-10"
					},
					"xAxis": {
						"categories": classes,
						"crosshair": true
					},
					"yAxis": {
						"title": {
							"text": "违 纪 人 数"
						}
					},
					"series": [{
						"type": "column",
						"name": "旷课",
						"data": no_lesson
					}, {
						"type": "column",
						"name": "未归",
						"data": no_back
					}, {
						"type": "column",
						"name": "晚归",
						"data": late_back
					}, {
						"type": "column",
						"name": "违章用电",
						"data": illegal_use_of_electricity
					}, {
						"type": "column",
						"name": "拒检",
						"data": refuse_to_check
					}, {
						"type": "column",
						"name": "未叠被子",
						"data": no_make_bed
					}, {
						"type": "column",
						"name": "未起床",
						"data": no_wake_up
					}, {
						"type": "column",
						"name": "未挂大锁",
						"data": no_locked
					}, {
						"type": "column",
						"name": "贴可视窗",
						"data": stick_windows
					}, {
						"type": "column",
						"name": "缺早操",
						"data": morning_exercises_absence
					}, {
						"type": "column",
						"name": "大会缺席",
						"data": meeting_absence
					}, {
						"type": "column",
						"name": "其他违纪",
						"data": other
					}, {
						"type": "column",
						"name": "请假",
						"data": leave_off
					}, {
						"type": "spline",
						"name": "总违纪数",
						"data": all_class_array,
						"marker": {
							"lineWidth": 2,
							"lineColor": "green",
							"fillColor": "white"
						}
					}]
				});
				var chart2 = new Highcharts.Chart({
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						renderTo: "container2"
					},
					title: {
						text: '15级各班违纪率'
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true
							},
							showInLegend: true
						}
					},
					series: [{
						type: "pie",
						name: "各班违纪率",
						data: all_class_violation_rate
					}]
				});

			}
		});

	})

});
/*===== 12.早操 =====*/
myApp.onPageInit('exercise-check', function(page) {
	var curPage = $(page.container);
	var model = [];
	showLoading();
	$.getJSON("jsondata/exercise.json", function(context) {
		$('#ajaxContain_exercise').html(compileScript('#exerciseTemplate', context));
		var fnLoad = function(){
			if(cacheData.get('exerciseCache')){
				debug && console.log("有缓存");
				model = JSON.parse(cacheData.get('exerciseCache'));
				curPage.find('.exercise-result').each(function(i,elem){
					$(elem).text( model[i] );
				})
			}else{
				debug && console.log("没有缓存");
				for (var i = 0;i < curPage.find('.exercise-result').size();i++) {
					model.push("已到");
				}
			}
		}
		var fnSave = function(){
			cacheData.set('exerciseCache',JSON.stringify(model));
			debug && console.log(cacheData.get('exerciseCache'));
		}
		fnLoad();
		curPage.find('.exercise-result').on('DOMNodeInserted',function(){
			var i = curPage.find('.exercise-result').index(this);
			model[i] = $(this).text();
			fnSave();
		});
		
		hideLoading();
	});
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
	var student_id = $.cookie("username");
	if(cacheData.get("userInfoCache")) student_id = cacheData.get("userInfoCache");
	$.getJSON("jsondata/userData.json",{id:student_id},function(context){
		curPage.find('.list-block.media-list').html(compileScript('#userInfoTemplate', context));
		debug && console.log(student_id);
		cacheData.remove("userInfoCache");
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
					minlength: 50
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
					minlength: "不得少于50字"
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

				$.ajax({
					url: Template7.global.basePath + 'newUser',
					type: 'POST',
					data: json,
					dataType: 'json',
					success: function(data) {
						if (data.state) {
							myApp.alert(data.msg, function() {
								mainView.back();
							});
						} else {
							myApp.alert(data.msg);
						}
					}
				});
			}
		});
	};

	LoadValidationScript(applyForNewValidateFn);
	//  Template7.global
	$.getJSON("jsondata/department.json", {}, function(data) {
		$('select[name=dept]').html(compileScript("#DeptList", data));
	});

});

/*===== 18.志愿者活动页面 =====*/
myApp.onPageInit('voluntary-activity',function(page){
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
	
});

myApp.onPageInit('lesson-check-2',function(page){
	var fnFormart = function(e){
		var text = $(e.target).html();
		var substr = text.replace(/,/g,'<br>');
		debug && console.log(text);
		debug && console.log(substr);
		$('.student-list').off();
		$('.student-list').html(substr);
		$('.student-list').on('DOMNodeInserted',fnFormart);
	};
	var fnClear = function(){
		cacheData.remove('lessonCheck');
	};
	var fnSaveAll = function(){
		var arr = [];
		var obj = JSON.parse( cacheData.get("lessonCheck") );
		curPage.find('select option:checked').each(function(index, el) {
		    arr.push(el.value);
		});
		if( obj["need-number"]-obj["real-number"] != arr.length ){myApp.alert("人数不一致,请重新选择");return null;}
		obj["result"] = arr;
		return obj;
	}
	var fnSubmit = function(){
		var data = fnSaveAll();
		if(!data) return ;
		debug && console.log( data );
		showLoading();
//		此处可以将数据传到后台去
		debug || $.post(url,data,function(){;});
		setTimeout(function(){
			hideLoading();
			myApp.alert("提交成功",function(){
				mainView.back(mainView.back(mainView.back));
			});
		},3000);
		fnClear();
		$(this).off();
	};
	$.getJSON("jsondata/exercise.json",function(data){
		var htmlStr = compileScript("#lessonCheckTemplate",data);
		var container = curPage.find("#lessonCheckForm");
		$(htmlStr).appendTo(container);
		$('.student-list').on('DOMNodeInserted',fnFormart);
	});
	var curPage = $(page.container);
	// 只能提交一次
	curPage.find('.submit').on('click',fnSubmit);
});
/*===== 20.考勤功能列表页 =====*/
myApp.onPageInit('work-attendance',function(page){
	var curPage = $(page.container);
	var data ={  
		lists:[
			{url:"pages/attendence/morning-check.html",text:"查早寝"},
			{url:"pages/attendence/evening-check.html",text:"查晚寝"},
			{url:"pages/attendence/lesson-check-1.html",text:"查课"},
			{url:"pages/attendence/exercise-check.html",text:"查早操"},
			{url:"pages/attendence/meeting-check.html",text:"会议考勤"}
		]
	}
	var linkList = compileScript("#linkListTemplate",data);
	$(linkList).appendTo(curPage.find(".page-content"));
	
});

/*===== 21.通报列表页 =====*/
myApp.onPageInit('notification-list',function(page){
	var curPage = $(page.container);
	var data = {
		lists : [
			{url:"pages/notification/notification-detail-zlb.html",text:"第10周查寝通报",datetime:"2015-5-18"},
		    {url:"pages/notification/notification-detail-xxb.html",text:"第10周查课通报",datetime:"2015-5-18"},
		    {url:"pages/notification/notification-detail-pp.html",text:"通报批评",datetime:"2015-5-18"},
		    {url:"pages/notification/notification-detail-by.html",text:"通报表扬",datetime:"2015-5-18"}
		]
	}
	var linkList = compileScript("#linkListTemplate",data);
	$(linkList).appendTo(curPage.find(".page-content"));
});
/*=====  22.学习部通报  =====*/
myApp.onPageInit('notification-detail-xxb',function(page){
	var curPage = $(page.container);
	$.getJSON('jsondata/notification-lesson-check.json',{},function(context){
		var htmlElem = compileScript("#lessonCheckNoticeTemplate",context);
		$(htmlElem).appendTo(curPage.find('.page-content'));
	});
});
/*===== 23.自律部通报 =====*/
myApp.onPageInit('notification-detail-zlb',function(page){
	var curPage = $(page.container);
	
	$.getJSON('jsondata/notification-dorm-check.json',{},function(context){
		var htmlElem = compileScript("#dormCheckNoticeTemplate",context);
		$(htmlElem).appendTo(curPage.find('.page-content'));
	});
});
/*===== 24.通报批评详情页 =====*/
myApp.onPageInit('notification-detail-pp',function(page){
  var curPage = $(page.container);
  $.getJSON('jsondata/notification-pp.json',{},function(context){
    var htmlElem = compileScript("#PPNoticeTemplate",context);
    $(htmlElem).appendTo(curPage.find('.page-content'));
  });
});
/*===== 25.通报表扬详情页 =====*/
myApp.onPageInit('notification-detail-by',function(page){
  var curPage = $(page.container);
  $.getJSON('jsondata/notification-by.json',{},function(context){
    var htmlElem = compileScript("#BYNoticeTemplate",context);
    $(htmlElem).appendTo(curPage.find('.page-content'));
  });
});