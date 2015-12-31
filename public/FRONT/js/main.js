/**
 * 加载jQuery.cookie插件
 */
function LoadCookieScript(callback){
	if (!$.cookie){
		$.getScript('js/jquery.cookie.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
/**
 * 加载highchart插件
 * <script src="${frontPath}/js/exporting.js" type="text/javascript" charset="utf-8"></script>
    <script src="${frontPath}/js/export-excel.js" type="text/javascript" charset="utf-8"></script>
 */
function LoadHighchartScript(callback){

	if (!window.Highcharts){
		$.getScript('js/highcharts.js', callback);
		$.getScript('js/exporting.js');
		$.getScript('js/export-excel.js');
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
	
}
//validation.js
function LoadValidationScript(callback){

	if (!$.fn.validator){
		$.getScript('js/validation.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
	
}
/**
 * 加载framework7框架
 * @param callback
 */
function LoadFramework7Script(callback){
	if (!window.myApp){
		$.getScript('js/framework7.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

function LoadLazyImageScript(callback){	
	if (!window.imgReady){
		$.getScript('js/lazyImage.js',callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
/**
 * 加载应用内容
 * @param callback
 */
function LoadMyappScript(callback){
	if (!window.myApp){
		$.getScript('js/my-app.js', callback);
	}
	else{
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}


/**
 * 加载动画，加载未完成不会进入应用
 * @param val
 */
function loadWheelTo(val){
	clearInterval(window.timer);
	window.timer = setInterval(function(){
		var v = parseInt($('#loadWheel').text());
		if(v < val)
			$('#loadWheel').text(v+1);
		else{
			clearInterval(window.timer);
			if(v >= 100) $("#knobWapper").fadeOut(1000);
		}
	},1);
}

/**
 * 加载主页图片
 */
function LoadImage(callback,success,fail){
	var aImg = $('img');
	var readyFn = function(){console.log('width:' + this.width + 'height:' + this.height);};
	var errorFn = function(){console.log('加载失败');};
	
	if (success && typeof(success) === "function") {
		readyFn = success;
	};
	if (fail && typeof(fail) === "function") {
		errorFn = fail;
	};
	aImg.each(function(index,domElem){
		var url = $(this).attr('src');
		imgReady(url,readyFn,errorFn);
	});
	if (callback && typeof(callback) === "function") {
		callback();
	}
}
/**
 * 登录逻辑
 * @param username  ：用户名
 * @param password  ：密码
 */
function LoginBiz(username,password,callback){
//  	url:Template7.global.basePath + 'action/login.action', //,'login'
	var dataFn = function(data){
		// 使用数据编译dom
		var leftpanel = compileScript("#panelTemplate",data);
		// 插入dom
		$('.panel-left').html( leftpanel );
		
		hideLoading();
		// 保存cookie
		$.cookie('username',username,{'expires':7});
		$.cookie('password',password,{'expires':7});
		Template7.global.login_status = data.login_status;
		Template7.global.user = data;
		
		$('.panel-left').delegate('a[href="logout"]','click',LogoutBiz);
		
		if (callback && typeof(callback) === "function") {
			callback(data.msg ,data.login_status);
		}
	};
	if(username == "" || username == null || username == undefined) return;
	if (username.length !== 12) {
		myApp.alert("学号输入错误");
		return ;
	}
	showLoading();
	$.getJSON("jsondata/user.json",{
    	username:username,
    	password:password
    },dataFn);
	
}
/**
 * 登录注销逻辑
 * 清除cookie
 * 还原功能列表
 */
function LogoutBiz(){
  $.cookie('username','');
  $.cookie('password','');
  
  var loginBtn = '<div class="list-block"><ul><li><a href="pages/login/login.html" class="item-link item-content close-panel">您还未登陆，点击登陆</a></li></ul></div>'
  $('.panel-left').html(loginBtn);
  return false;
}

/**
 * 加载模板脚本
 * @param callback
 */
function LoadTemplates(callback){
	
	$("#template7Script").load("template/templates.tpl",function(){
		if (callback && typeof(callback) === "function") {
			callback();
		}
	});
	
}
/**
 * 编译模板
 * @param id  ：模板id
 * @param data：编译用的模板数据
 * @returns
 */
function compileScript(id,data){
	var template = $(id).html();
	console.log($(id));
	var compiledTemplate = Template7.compile(template);
	
	var context = data;

	return compiledTemplate(context);
}
/**
 * 显示加载图标
 */
function showLoading(){
	debug && console.log("showLoading");
	myApp.showPreloader('加载中');
}
/**
 * 隐藏加载图标
 */
function hideLoading(){
	debug && console.log("hideLoading");
	setTimeout( myApp.hidePreloader, 1000 );
}
/**
 * 本地存储API
 * @func : get
 * 		@parameter : 要获取数据的key值
 * @func : set
 * 		@parameter : 设置的数据key值
 * 		@parameter : 设置的数据value值
 * @func : remove
 * 		@parameter : 要删除的数据
 */
cacheData = {
    hname:location.hostname?location.hostname:'localStatus',
    isLocalStorage:window.localStorage?true:false,
    dataDom:null,

    initDom:function(){ //初始化userData
        if(!this.dataDom){
            try{
                this.dataDom = document.createElement('input');//这里使用hidden的input元素
                this.dataDom.type = 'hidden';
                this.dataDom.style.display = "none";
                this.dataDom.addBehavior('#default#userData');//这是userData的语法
                document.body.appendChild(this.dataDom);
                var exDate = new Date();
                exDate = exDate.getDate()+30;
                this.dataDom.expires = exDate.toUTCString();//设定过期时间
            }catch(ex){
                return false;
            }
        }
        return true;
    },
    set:function(key,value){
        if(this.isLocalStorage){
            window.localStorage.setItem(key,value);
        }else{
            if(this.initDom()){
                this.dataDom.load(this.hname);
                this.dataDom.setAttribute(key,value);
                this.dataDom.save(this.hname);
            }
        }
    },
    get:function(key){
        if(this.isLocalStorage){
            return window.localStorage.getItem(key);
        }else{
            if(this.initDom()){
                this.dataDom.load(this.hname);
                return this.dataDom.getAttribute(key);
            }
        }
    },
    remove:function(key){
        if(this.isLocalStorage){
            localStorage.removeItem(key);
        }else{
            if(this.initDom()){
                this.dataDom.load(this.hname);
                this.dataDom.removeAttribute(key);
                this.dataDom.save(this.hname);
            }
        }
    }
};

/**
 * 遍历宿舍列表遍历
 * 获取查寝的结果数据
 * 并返回
 * @returns {Array}
 */
function fnDormAttendSubmit() {
	var container = $('#ajaxContain_morning').size() ? $('#ajaxContain_morning') : $('#ajaxContain_evening');
	debug && console.log(container);
	if (container.html() == '') return ;
	
	var rooms = container.find('.room-number');
	var org = [];
	rooms.each(function(i,elem){
		var roomBreakRule = $(elem).next().find('input').val();
		var roomNumber = $(elem).text();
		var roomStudents = $(elem).parents('.room-students-prev').next().find('.student');
		if(roomBreakRule == "寝室情况(无)") {
			
			roomBreakRule = '';
		}
		roomStudents.each(function(i , stu){
			var stuBreakRule = $(stu).find('.breach-the-principle').text() ;
			var studentId = $(stu).find('.student-id').text();
			console.log(studentId + stuBreakRule);
			if(stuBreakRule=='无') stuBreakRule = '';
			if(stuBreakRule || roomBreakRule) {
				var obj = {id:studentId,rules:[]};
				stuBreakRule && obj["rules"].push(stuBreakRule);
				roomBreakRule && obj["rules"].push(roomBreakRule);
				org.push(obj);
			}
		});
	});
	return org;
};
function fnLoadDormAttendForm(){
	var container = $('#ajaxContain_morning').size() ? $('#ajaxContain_morning') : $('#ajaxContain_evening');
	var rooms = container.find('.room-number');
	var org = [];
	rooms.each(function(i,elem){
		var roomBreakRule = $(elem).next().find('input').val();
		var roomNumber = $(elem).text();
		var roomStudents = $(elem).parents('.room-students-prev').next().find('.student');
		if(roomBreakRule == "寝室情况(无)") {
			
			roomBreakRule = '';
		}
		roomStudents.each(function(i , stu){
			var stuBreakRule = $(stu).find('.breach-the-principle').text() ;
			var studentId = $(stu).find('.student-id').text();
			console.log(studentId + stuBreakRule);
			if(stuBreakRule=='无') stuBreakRule = '';
			if(stuBreakRule || roomBreakRule) {
				var obj = {id:studentId,rules:[]};
				stuBreakRule && obj["rules"].push(stuBreakRule);
				roomBreakRule && obj["rules"].push(roomBreakRule);
				org.push(obj);
			}
		});
	});
	return org;
}

/******************************************************
 * 初始化
 * function for index
 * MAIN FUNCTION
 ******************************************************/
function init(callback){
	// debug开关
	window.debug = true;
	// 加载cookie插件
	LoadCookieScript(function(){
		loadWheelTo(10);
		//  加载framework7插件
		LoadFramework7Script(function(){
			loadWheelTo(50);
			// 初始化framework7 应用
			LoadMyappScript(function(){
				loadWheelTo(60);
				LoadTemplates(function(){
					loadWheelTo(70);
					//检查cookie
					if($.cookie('username')){
						debug && console.log("有cookie");
						LoginBiz($.cookie('username'), $.cookie('password'), function(){
							hideLoading();
							loadWheelTo(100);
						});
					}
					else{
						debug && console.log("no cookie");
						loadWheelTo(100);
					}
				});
				
			});
		});
	});
	
	
	// 阻止uc浏览器左右滑动前进后退
	var control = navigator.control || {};
	if (control.gesture) {
		control.gesture(false);
	}
}// end init

// 日期格式化工具
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
