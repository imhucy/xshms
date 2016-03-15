/*-------------------------------------------
Dynamically load plugin scripts
---------------------------------------------*/
//
//  Dynamically load Bootstrap Validator Plugin
//  homepage: https://github.com/nghuuphuoc/bootstrapvalidator
//
function LoadBootstrapValidatorScript(callback){
	if (!$.fn.bootstrapValidator){
		$.getScript('plugins/bootstrapvalidator/bootstrapValidator.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load DataTables plugin
//  homepage: http://datatables.net v1.9.4 license - GPL or BSD
//
function LoadDataTablesScripts(callback){
	function LoadDatatables(){
		$.getScript('plugins/datatables/jquery.dataTables.10.js', function(){
			$.getScript('plugins/datatables/ZeroClipboard.js', function(){
				$.getScript('plugins/datatables/TableTools.js', function(){
					$.getScript('plugins/datatables/dataTables.bootstrap.js', callback);
				});
			});
		});
	}
	if (!$.fn.dataTables){
		LoadDatatables();
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load Widen FineUploader
//  homepage: https://github.com/Widen/fine-uploader  v5.0.1 license - GPL3
//
function LoadFineUploader(callback){
	if (!$.fn.fineuploader){
		$.getScript('plugins/fineuploader/jquery.fineuploader-5.0.1.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load jQuery Select2 plugin
//  homepage: https://github.com/ivaynberg/select2  v3.4.5  license - GPL2
//
function LoadSelect2Script(callback){
	if (!$.fn.select2){
		$.getScript('plugins/select2/select2.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load  jQuery Timepicker plugin
//  homepage: http://trentrichardson.com/examples/timepicker/
//
function LoadTimePickerScript(callback){
	if (!$.fn.timepicker){
		$.getScript('plugins/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
//  Dynamically load Highcharts plugin
//
function LoadHighchartsScript(callback){
	if (!$.fn.highcharts){
		$.getScript('js/highcharts.js',function(){
			$.getScript('js/exporting.js',callback);
		});

	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
/*-------------------------------------------
Main scripts used by theme
---------------------------------------------*/
//
//  Function for load content from url and put in $('.ajax-content') block
//
function LoadAjaxContent(url){
	$('.preloader').show();
	$.ajax({
		mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
		url: url,
		type: 'GET',
		success: function(data) {
			$('#ajax-content').html(data);
			if( $('.main-menu .ajax-link.active').data('value') ) {
				var parent_id = $('.main-menu .ajax-link.active').data('value');
				var btns = {
					'add'    : $('#addBtn'),
					'modify' : $('#modifyBtn'),
					'remove' : $('#removeBtn'),
					'set'    : $('#setBtn')
				}

				var powerGroups = global.treeMenu.groups;
				
				if ( powerGroups[ parent_id ] ){
					$.each( powerGroups[ parent_id ],function (i,item) {
						btns[ item.power_url ].show();
					})
				}

			}
			// $('.preloader').hide();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$('#ajax-content').html(errorThrown);
			// $('.preloader').hide();
		},
		dataType: "html",
		async: false
	});
}
//
//  Helper for correct size of Messages page
//
function MessagesMenuWidth(){
	var W = window.innerWidth;
	var W_menu = $('#sidebar-left').outerWidth();
	var w_messages = (W-W_menu)*16.666666666666664/100;
	$('#messages-menu').width(w_messages);
}

//
//  Helper for open ModalBox with requested header, content and bottom
//
//
function OpenModalBox(header, inner, bottom){
	var modalbox = $('#modalbox');
	modalbox.find('.modal-header-name span').html(header);
	modalbox.find('.devoops-modal-inner').html(inner);
	modalbox.find('.devoops-modal-bottom').html(bottom);
	modalbox.fadeIn('fast');
	$('body').addClass("body-expanded");
}

//
//  Close modalbox
//
//
function CloseModalBox(){
	var modalbox = $('#modalbox');
	modalbox.fadeOut('fast', function(){
		modalbox.find('.modal-header-name span').children().remove();
		modalbox.find('.devoops-modal-inner').children().remove();
		modalbox.find('.devoops-modal-bottom').children().remove();
		$('body').removeClass("body-expanded");
	});
}
//
//  Function for create 2 dates in human-readable format (with leading zero)
//
function PrettyDates(){
	var currDate = new Date();
	var year = currDate.getFullYear();
	var month = currDate.getMonth() + 1;
	var startmonth = 1;
	if (month > 3){
		startmonth = month -2;
	}
	if (startmonth <=9){
		startmonth = '0'+startmonth;
	}
	if (month <= 9) {
		month = '0'+month;
	}
	var day= currDate.getDate();
	if (day <= 9) {
		day = '0'+day;
	}
	var startdate = year +'-'+ startmonth +'-01';
	var enddate = year +'-'+ month +'-'+ day;
	return [startdate, enddate];
}

//
//  Function set min-height of window (required for this theme)
//
function SetMinBlockHeight(elem){
	elem.css('min-height', window.innerHeight - 49);
}

//
// Helper for run TinyMCE editor with textarea's
//
function TinyMCEStart(elem, mode){
	var plugins = [];
	if (mode === 'extreme'){
		plugins = [ "advlist anchor autolink autoresize autosave bbcode charmap code contextmenu directionality ",
			"emoticons fullpage fullscreen hr image insertdatetime layer legacyoutput",
			"link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace",
			"tabfocus table template textcolor visualblocks visualchars wordcount"];
	}
	tinymce.init({selector: elem,
		theme: "modern",
		plugins: plugins,
		//content_css: "css/style.css",
		toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
		style_formats: [
			{title: 'Header 2', block: 'h2', classes: 'page-header'},
			{title: 'Header 3', block: 'h3', classes: 'page-header'},
			{title: 'Header 4', block: 'h4', classes: 'page-header'},
			{title: 'Header 5', block: 'h5', classes: 'page-header'},
			{title: 'Header 6', block: 'h6', classes: 'page-header'},
			{title: 'Bold text', inline: 'b'},
			{title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
			{title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
			{title: 'Example 1', inline: 'span', classes: 'example1'},
			{title: 'Example 2', inline: 'span', classes: 'example2'},
			{title: 'Table styles'},
			{title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
		]
	});
}
//
//  Function maked all .box selector is draggable, to disable for concrete element add class .no-drop
//
function WinMove(){
	$( "div.box").not('.no-drop')
		.draggable({
			revert: true,
			zIndex: 2000,
			cursor: "crosshair",
			handle: '.box-name',
			opacity: 0.8
		})
		.droppable({
			tolerance: 'pointer',
			drop: function( event, ui ) {
				var draggable = ui.draggable;
				var droppable = $(this);
				var dragPos = draggable.position();
				var dropPos = droppable.position();
				draggable.swap(droppable);
				setTimeout(function() {
					var dropmap = droppable.find('[id^=map-]');
					var dragmap = draggable.find('[id^=map-]');
					if (dragmap.length > 0 || dropmap.length > 0){
						dragmap.resize();
						dropmap.resize();
					}
					else {
						draggable.resize();
						droppable.resize();
					}
				}, 50);
				setTimeout(function() {
					draggable.find('[id^=map-]').resize();
					droppable.find('[id^=map-]').resize();
				}, 250);
			}
		});
}
//
// Beauty Hover Plugin (backlight row and col when cell in mouseover)
//
//
(function( $ ){
	$.fn.beautyHover = function() {
		var table = this;
		table.on('mouseover','td', function() {
			var idx = $(this).index();
			var rows = $(this).closest('table').find('tr');
			rows.each(function(){
				$(this).find('td:eq('+idx+')').addClass('beauty-hover');
			});
		})
		.on('mouseleave','td', function(e) {
			var idx = $(this).index();
			var rows = $(this).closest('table').find('tr');
			rows.each(function(){
				$(this).find('td:eq('+idx+')').removeClass('beauty-hover');
			});
		});
	};
})( jQuery );

//
//  Beauty tables plugin (navigation in tables with inputs in cell)
//  Created by DevOOPS.
//
(function( $ ){
	$.fn.beautyTables = function() {
		var table = this;
		var string_fill = false;
		this.on('keydown', function(event) {
		var target = event.target;
		var tr = $(target).closest("tr");
		var col = $(target).closest("td");
		if (target.tagName.toUpperCase() === 'INPUT'){
			if (event.shiftKey === true){
				switch(event.keyCode) {
					case 37: // left arrow
						col.prev().children("input[type=text]").focus();
						break;
					case 39: // right arrow
						col.next().children("input[type=text]").focus();
						break;
					case 40: // down arrow
						if (string_fill===false){
							tr.next().find('td:eq('+col.index()+') input[type=text]').focus();
						}
						break;
					case 38: // up arrow
						if (string_fill===false){
							tr.prev().find('td:eq('+col.index()+') input[type=text]').focus();
						}
						break;
				}
			}
			if (event.ctrlKey === true){
				switch(event.keyCode) {
					case 37: // left arrow
						tr.find('td:eq(1)').find("input[type=text]").focus();
						break;
					case 39: // right arrow
						tr.find('td:last-child').find("input[type=text]").focus();
						break;
				case 40: // down arrow
					if (string_fill===false){
						table.find('tr:last-child td:eq('+col.index()+') input[type=text]').focus();
					}
					break;
				case 38: // up arrow
					if (string_fill===false){
						table.find('tr:eq(1) td:eq('+col.index()+') input[type=text]').focus();
					}
						break;
				}
			}
			if (event.keyCode === 13 || event.keyCode === 9 ) {
				event.preventDefault();
				col.next().find("input[type=text]").focus();
			}
			if (string_fill===false){
				if (event.keyCode === 34) {
					event.preventDefault();
					table.find('tr:last-child td:last-child').find("input[type=text]").focus();}
				if (event.keyCode === 33) {
					event.preventDefault();
					table.find('tr:eq(1) td:eq(1)').find("input[type=text]").focus();}
			}
		}
		});
		table.find("input[type=text]").each(function(){
			$(this).on('blur', function(event){
			var target = event.target;
			var col = $(target).parents("td");
			if(table.find("input[name=string-fill]").prop("checked")===true) {
				col.nextAll().find("input[type=text]").each(function() {
					$(this).val($(target).val());
				});
			}
		});
	});
};
})( jQuery );

//
// Swap 2 elements on page. Used by WinMove function
//
jQuery.fn.swap = function(b){
	b = jQuery(b)[0];
	var a = this[0];
	var t = a.parentNode.insertBefore(document.createTextNode(''), a);
	b.parentNode.insertBefore(a, b);
	t.parentNode.insertBefore(b, t);
	t.parentNode.removeChild(t);
	return this;
};
/*-------------------------------------------
page demo of every pages 
---------------------------------------------*/
//
// Example form validator function
//
/*-------------------------------------------
	Function for Form Layout page (form_layouts.html)
---------------------------------------------*/
//
// Example form validator function
//
function DemoFormValidator(){
	$('#defaultForm').bootstrapValidator({
		message: 'This value is not valid',
		fields: {
			username: {
				message: 'The username is not valid',
				validators: {
					notEmpty: {
						message: 'The username is required and can\'t be empty'
					},
					stringLength: {
						min: 6,
						max: 30,
						message: 'The username must be more than 6 and less than 30 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_\.]+$/,
						message: 'The username can only consist of alphabetical, number, dot and underscore'
					}
				}
			},
			country: {
				validators: {
					notEmpty: {
						message: 'The country is required and can\'t be empty'
					}
				}
			},
			acceptTerms: {
				validators: {
					notEmpty: {
						message: 'You have to accept the terms and policies'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: 'The email address is required and can\'t be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			},
			website: {
				validators: {
					uri: {
						message: 'The input is not a valid URL'
					}
				}
			},
			phoneNumber: {
				validators: {
					digits: {
						message: 'The value can contain only digits'
					}
				}
			},
			color: {
				validators: {
					hexColor: {
						message: 'The input is not a valid hex color'
					}
				}
			},
			zipCode: {
				validators: {
					usZipCode: {
						message: 'The input is not a valid US zip code'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: 'The password is required and can\'t be empty'
					},
					identical: {
						field: 'confirmPassword',
						message: 'The password and its confirm are not the same'
					}
				}
			},
			confirmPassword: {
				validators: {
					notEmpty: {
						message: 'The confirm password is required and can\'t be empty'
					},
					identical: {
						field: 'password',
						message: 'The password and its confirm are not the same'
					}
				}
			},
			ages: {
				validators: {
					lessThan: {
						value: 100,
						inclusive: true,
						message: 'The ages has to be less than 100'
					},
					greaterThan: {
						value: 10,
						inclusive: false,
						message: 'The ages has to be greater than or equals to 10'
					}
				}
			}
		}
	});
}

/**
 * 首单词大写
 */
function wordUpper(str){
	return str.substring(0,1).toUpperCase()+str.substring(1,str.length);
}
/*-------------------------------------------
	Scripts for DataTables page (system_user.html)
	EditabeTable 编辑表格 用户管理
---------------------------------------------*/

function EditabeTableModel(option){
	// datatable汉化
	var oLanguage={
      "oAria": {
          "sSortAscending": ": 升序排列",
          "sSortDescending": ": 降序排列"
      },
      "oPaginate": {
          "sFirst": "首页",
          "sLast": "末页",
          "sNext": "下一页",
          "sPrevious": "上一页"
      },
      "sEmptyTable": "没有相关记录",
      "sInfo": "第 _START_ 到 _END_ 条记录，共 _TOTAL_ 条",
      "sInfoEmpty": "第 0 到 0 条记录，共 0 条",
      "sInfoFiltered": "(从 _MAX_ 条记录中检索)",
      "sInfoPostFix": "",
      "sDecimal": "",
      "sThousands": ",",
      "sLengthMenu": "每页显示条数: _MENU_",
      "sLoadingRecords": "正在载入...",
      "sProcessing": "正在载入...",
      "sSearch": "搜索: ",
      "sSearchPlaceholder": "",
      "sUrl": "",
      "sZeroRecords": "没有相关记录"
  }
	var defaults = {
		table:'#datatable-user',

		addBtn:'#addBtn',
		modifyBtn:'#modifyBtn',
		removeBtn:'#removeBtn',
		widths : [ 0,150,150,150,150,150,150,150,150,150,150 ],
		dbTable:'useres'
	};

	var args = $.extend({}, defaults, option);

	var $table  =  $(args.table);
	var $addBtn =  $(args.addBtn);
	var $modifyBtn = $(args.modifyBtn);
	var $removeBtn = $(args.removeBtn);

	var colWidth = [];
	for(var i = 0; i < args.widths.length;i++){
		colWidth.push({width:args.widths[i]});
	}

	var asInitVals = [];
	var columnsNames = [];
	// 初始化表格数据
	var dt = $table.dataTable( {
		"aaSorting": [[ 0, "asc" ]],
		"sDom": "<'box-content'<'col-sm-6'l><'col-sm-6 text-right'f><'clearfix'>>rt<'box-content'<'col-sm-6'i><'col-sm-6 text-right'p><'clearfix'>>",
		"sPaginationType": "bootstrap",
		"oLanguage": oLanguage,
		scrollX:true,
		columns:colWidth
	});
	var oTable = dt.api();
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	// 表格头过滤
	// ///////////////////////////////////////////////////////////////////////
	// ///////////////////////////////////////////////////////////////////////
	var header_inputs = $('.dataTables_scrollHeadInner').find('thead input');
	//$("#datatable-2 thead input");
	var $tbody = $table.find('tbody');
	var $trs = $tbody.find('tr');
	header_inputs.on('keyup', function(){
		dt.fnFilter( this.value, header_inputs.index(this) );
	})
	.on('focus', function(){
		if ( this.className === "search_init" ){
			this.className = "";
			this.value = "";
		}
	})
	.on('blur', function (i) {
		if ( this.value === "" ){
			this.className = "search_init";
			this.value = asInitVals[header_inputs.index(this)];
		}
	});
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	// 根据表格头，生成模态框表单
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	var modifyForm = $('<form id="modifyForm" method="post" class="form-horizontal bootstrap-validator-form"></form>')	
	modifyForm.append('<input type="hidden" name="id"  />');
	header_inputs.each( function (i, header_input) {
		asInitVals[i] = this.value;
		columnsNames[i] = $(this).attr('name');
		var formGroup;
		var inputIndex = i;
		// 跳过隐藏域
		if (i===0) return;
		// 用列名来生成表单
		// 生成何种类型的表单，要通过检测select属性和date属性来决定
		// 如果含有select属性
		// 查看是否需要请求数据形成下拉菜单
		var select = $(this).data('select');
		var date = $(this).data('date');
		var textarea = $(this).data('textarea');
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////
		// 如果需要生成下拉框的话
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////
		if( select ){
			$.ajax({
				url: '/all/'+select,
				type: 'get',
				dataType: 'json',
				async:false
			})
			.done(function( tableData ) {
				var options;
				// 所有的待选项全部写入forSelect中，等数据全部读取完毕再更新整个表格
				$(header_input).data('forSelect',tableData);
				
				/**
				 *  如果是多选的下拉框
				 *  给这个单元格加个数组
				 *  用来存放  id更改成的名字
				 */
				if( $(header_input).data('multiple') )
				{
					$tbody.find('tr').each(function (index,item){
						var cell = $(item).find('td').eq( i );
						cell.data('multipleArray',[]);
					});
				}
				/**
				 * 遍历子表数据
				 */
				$.each(tableData, function(index, elem) {
					// 生成单选项
					options += '<option value="'+ elem.id +'">'+(elem[select+'_name'])+'</option>';
					//将id处理成名字
					Id2Name(oTable,$tbody,header_input,elem,i,select);
					
				});
				// 处理后的名字写回去
				$tbody.find('tr').each(function (index,item) {
					var cell = $(item).find('td').eq( i );
					oTable.cell(cell[0]).data( cell.data('multipleArray') );
				});
				if( $(header_input).data('multiple') )
				{
					
					formGroup = 
					[
						'<div class="form-group">',
						'		<label class="col-sm-3 control-label">'+asInitVals[i]+'</label>',
						'		<div class="col-sm-5">',
						'<select name="'+columnsNames[i]+'" multiple="multiple">',
						options,
						'</select>',
						'		</div>',
						'	<small class="help-block col-sm-offset-3 col-sm-9" style="display: none;"></small>',
						'</div>'
					].join(' ');
				}
				else{
					formGroup = 
					[
						'<div class="form-group">',
						'		<label class="col-sm-3 control-label">'+asInitVals[i]+'</label>',
						'		<div class="col-sm-5">',
						'<select name="'+columnsNames[i]+'" id="">',
						options,
						'</select>',
						'		</div>',
						'	<small class="help-block col-sm-offset-3 col-sm-9" style="display: none;"></small>',
						'</div>'
					].join(' ');
				}
			});
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////
		// 如果需要生成日期选择器的话
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////

		}else if( date ){
			formGroup = 
			[
				'<div class="form-group">',
				'		<label class="col-sm-3 control-label">'+asInitVals[i]+'</label>',
				'		<div class="col-sm-5">',
				'<input type="text" class="form-control datepicker" name="'+columnsNames[i]+'" >',
				'		</div>',
				'	<small class="help-block col-sm-offset-3 col-sm-9" style="display: none;"></small>',
				'</div>'
			].join(' ');
		}
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////
		// 如果需要生成富文本框的话
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////
		else if( textarea ){
			formGroup = 
			[
				'<div class="form-group">',
				'		<label class="col-sm-3 control-label">'+asInitVals[i]+'</label>',
				'		<div class="col-sm-9">',
				'<textarea name="'+columnsNames[i]+'" class="form-control" row="5" id="TinyMCEField" ></textarea>',
				'		</div>',
				'	<small class="help-block col-sm-offset-3 col-sm-9" style="display: none;"></small>',
				'</div>'
			].join(' ');

		}
		else{
			// 默认的是生成input:text
			formGroup = [
			'<div class="form-group">',
			'		<label class="col-sm-3 control-label">'+asInitVals[i]+'</label>',
			'		<div class="col-sm-5">',
			'			<input type="text" class="form-control" name="'+columnsNames[i]+'" data-original-title=""	title="">',
			'		</div>',
			'	<small class="help-block col-sm-offset-3 col-sm-9" style="display: none;"></small>',
			'</div>'
			].join(' ');
		}
		// 生成模态框表单
		modifyForm.append(formGroup);
	});
	/**
	 * id  to  name
	 * @param {object} oTable       表格api
	 * @param {jQuery} $tbody       表格体部
	 * @param {D O M } header_input 表格头部
	 * @param {record} elem         子表的一条数据
	 * @param {number} i            待处理的单元格列数
	 * @param {string} table  			子表的表名称
	 */
	function Id2Name(oTable,$tbody,header_input,elem,i,tableName) {
		if( $(header_input).data('multiple') )
		{
			//将多个id更换为名字
			$tbody.find('tr').each(function (index,item){
				var cell = $(item).find('td').eq( i );
				var cellData = cell.text();
				var cellArray = cellData.split(',');// $.parseJSON("[" +cellData+ "]");

				// console.log('=====>'+cell.data('multipleArray'))
				// console.log(cellData);
				// console.log(cellArray);
				// console.log('================================================');
				// if(index === 0) // console.log(cell)
				$.each(cellArray, function(cellArrayIndex, idVal) {
					if( idVal == elem.id ) {	
						cell.data('multipleArray').push( elem[tableName+'_name'] );
					}
				});
			});
			
		}
		else{
			// 将单个id更换为名字
			$tbody.find('tr').each(function (index,item) {
				var cell = $(item).find('td').eq( i );
				if( parseInt(cell.text()) == elem.id ) {
					oTable.cell( cell[0] ).data( elem[tableName+'_name'] );
				}
			});
		}

	}
	// 一个模态框
	var modal = $([
		'<div class="modifyModal addModal modal fade">',
		'  <div class="modal-dialog modal-lg">',
		'    <div class="modal-content">',
		'      <div class="modal-header">',
		'        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
		'        <h4 class="modal-title">Modal title</h4>',
		'      </div>',
		'      <div class="modal-body">',
		'      </div>',
		'      <div class="modal-footer">',
		'        <button type="button" class="btn btn-primary save">保存</button>',
		'        <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>',
		'      </div>',
		'    </div>',
		'  </div>',
		'</div>'
	].join(' '));
	
	var modalBody = modal.find('.modal-body');
	var modalTitle = modal.find('.modal-title');
	var saveBtn = modal.find('.save');
	var cancelBtn = modal.find('.cancel');
	modalBody.append(modifyForm);

	$('#ajax-content').append(modal);
	// 初始化select2
	LoadSelect2Script(function () {
		$('select').select2();
	});
	// 初始化日期选择器
	$('.datepicker').datepicker({dateFormat: "yy-mm-dd"});
	// 初始化textarea
	// TinyMCEField
	TinyMCEStart('#TinyMCEField',null);
	// 操作
	// 单击行选中
	
	$tbody.on('click','tr', function(event) {
		event.preventDefault();
		$this = $(this);
		$(this).toggleClass('active');
		$(this).siblings('tr').removeClass('active');
		return false;
	});
	/**
	 * 翻页重绘表格
	 */
	oTable.on('draw', function(event) {
		// console.log('load a line');
		$('.preloader').show();
		
		
		header_inputs.each(function (i,header_input) {

			if( $(header_input).data('select') ){
				var tableName = $(header_input).data('select');
				var tableData = $(header_input).data('forSelect')
				$.each(tableData,function(index,elem) {
					/**
					 *  如果是多选的下拉框
					 *  给这个单元格加个数组
					 *  用来存放  id更改成的名字
					 */
					if( $(header_input).data('multiple') && index === 0 )
					{
						$tbody.find('tr').each(function (index,item){
							var cell = $(item).find('td').eq( i );
							cell.data('multipleArray',[]);
						});
					}
					Id2Name(oTable,$tbody,header_input,elem,i,tableName);
				});
				// 修改后的名字写回去
				$tbody.find('tr').each(function (index,item) {
					var cell = $(item).find('td').eq( i );
					oTable.cell(cell[0]).data( cell.data('multipleArray') );
				});
			}
		});
		$('.preloader').hide();
		
		
	});

	
	// 添加按钮
	$addBtn.on('click',function(e){
		e.preventDefault();
		modalTitle.html('添加记录');
		$('.modifyModal').modal();
		$.each(columnsNames,function (i,elem) {
			modifyForm.find('input[name='+elem+']').val( '' );
		});
	});
	// 修改按钮
	$modifyBtn.on('click',function(e){
		e.preventDefault();
		var activeRow = $tbody.find('.active');
		if(activeRow.size() === 0 ) return;
		modalTitle.html('修改记录');
		// 读取被激活的行的值
		activeRow.find('td').each(function(i,elem){
			var item = $(elem);
			if( item.find('input').size() ) {
				// 读取隐藏域的id
				modifyForm.find('input[name='+columnsNames[i]+']').val( item.find('input').val() );
			}else{
				var formElem = modifyForm.find('[name='+columnsNames[i]+']');
				if(formElem[0].tagName === 'INPUT')
					formElem.val( item.text() );
				else if(formElem[0].tagName === 'SELECT'){
					if(formElem.attr('multiple')){
						var arr = [];
						// console.log(item.text());
						var nameArray = item.text().split(',');
						formElem.find('option').each(function(i, el) {
							$.each(nameArray,function( nameArrayIndex,nameVal ){
								if ($(el).text() === nameVal ) arr.push($(el).val());
							})
						});
						
						formElem.val( arr ).trigger('change');
					}
					else{
						formElem.find('option').each(function(i, el) {
							if ($(el).text() === item.text()) formElem.val( $(el).val() ).trigger('change');
						});
					}
				}
				else if(formElem[0].tagName === 'TEXTAREA'){
					// 读取单元格 的值到富文本框
					tinyMCE.activeEditor.setContent( item.text() );
				}
				// formElem.val( item.text() );
			}
		})
		$('.modifyModal').modal();
	});
	// 保存按钮
	saveBtn.on('click',function(e){
		e.preventDefault();
		// 保存到数据库post 关闭模态窗口
		// 根据隐藏域值的有无来区分是添加还是更新
		var url ;
		var data = {};
		var values = [];
		modifyForm.find('[name]').each(function(i, el) {
			var elem = $(el);
			if(i === 0 && elem.val() === '') url = '/insert/'+args.dbTable;
			if(i === 0 && elem.val() !== '') url = '/modify/'+args.dbTable;

			if( elem.attr('multiple') ) 
				data[ elem.attr('name') ] = elem.val().join();
			else if(el.tagName === 'TEXTAREA')
				data[ elem.attr('name') ] = tinyMCE.activeEditor.getContent();
			else
				data[ elem.attr('name') ] = elem.val();
			

			if(i===0)
				values.push('<input type="hidden" name="id" value="'+elem.val()+'" />')
			else{
				if(elem.val() === '' && el.tagName !== 'TEXTAREA')
					values.push('-');
				else{
					if(el.tagName === 'INPUT'){
						values.push(elem.val());
					}
					else if(el.tagName === 'TEXTAREA'){
						values.push( tinyMCE.activeEditor.getContent() );
					}
					else{
						if( elem.attr('multiple') )
						{
							var nameArray = [];
							elem.children('option:selected').each(function (i ,item) {
								nameArray.push($(item).text());
							});
							values.push( nameArray.join() );
						}
						else{
							values.push(elem.children('option:selected').text());
						}
					}
				}
			}
			// console.log(values)
		});
		// console.log(JSON.stringify(data) + '\n' + url );
		$('.modifyModal').modal('hide');
		$('.preloader').show();
		// console.log( data )
		$.post(url, data)
		.done(function () {

			setTimeout(function () {
				if( url === '/modify/'+args.dbTable ){
					$('#successModal').modal('show').find('.modal-body').text('修改成功');
					// 修改成功的数据进行回显
					var activeRow = $tbody.find('.active');
					oTable.row( activeRow[0] ).data( values );
				}
				else{
					$('#successModal').modal('show').find('.modal-body').text('添加成功');
					// 添加成功的数据进行回显
					// data = this.datatable.row.add([ '', '', '', actions ]);
					// $row = this.datatable.row( data[0] ).nodes().to$();
					oTable.row.add(values).draw();
				}
				$('.preloader').hide();
			},1000)
		})
		.fail(function(){
			alert('失败');
			$('.preloader').hide();
		})
	});
	// 删除记录
	$removeBtn.on('click',function (e){
		var activeRow = $tbody.find('.active');
		if(activeRow.size() === 0 ) return;

		$('#removeModal').modal('toggle');
	});

	$('#removeSureBtn').on('click', function(event) {
		event.preventDefault();
		var url = '/remove/'+args.dbTable;
		var data = {};
		var activeRow = $tbody.find('.active');
		data['id']=activeRow.find('td').eq(0).find('input[type=hidden]').val();
		$('.preloader').show();
		$.post(url,data)
		.done(function (r) {
			$('#removeModal').modal('toggle');
			setTimeout(function () {
				$('#successModal').modal('toggle').find('modal-body').text('删除成功');
				oTable.row( activeRow.get(0) ).remove().draw();
			},1000);
			// console.log(r);
		})
		.fail(function(){

			alert('删除失败');

		})
		.always(function () {
			
			$('.preloader').hide();
		});

	});
	$('.preloader').hide();

}//end of EditabeTable


/*-------------------------------------------
	Demo graphs for Flot Chart page (table-test.html)
---------------------------------------------*/
// Data Tables - Config
(function($) {

	'use strict';

	if ( $.isFunction( $.fn.dataTable ) ) {

		$.extend(true, $.fn.dataTable.defaults, {
			sDom: "<'row datatables-header form-inline'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>r><'table-responsive't><'row datatables-footer'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>",
			oLanguage: {
				sLengthMenu: '_MENU_ records per page',
				sProcessing: '<i class="fa fa-spinner fa-spin"></i> Loading'
			},
			fnInitComplete: function( settings, json ) {
				// select 2
				if ( $.isFunction( $.fn.select2 ) ) {
					$('.dataTables_length select', settings.nTableWrapper).select2({
						minimumResultsForSearch: -1
					});
				}

				var options = $( 'table', settings.nTableWrapper ).data( 'plugin-options' ) || {};

				// search
				var $search = $('.dataTables_filter input', settings.nTableWrapper);

				$search
					.attr({
						placeholder: typeof options.searchPlaceholder !== 'undefined' ? options.searchPlaceholder : 'Search'
					})
					.addClass('form-control');

				if ( $.isFunction( $.fn.placeholder ) ) {
					$search.placeholder();
				}
			}
		});

	}

});

// 
// 
// 初始化用户数据
// 
// 
if( !$.cookie('useres') ){
	location.href = 'login.html';
}

var global = {
	'useres' : $.parseJSON( $.cookie('useres') )
}

// 
// 
// 解析权限列表
// 
// 
function treeMenu(a){
  this.tree=a||[];
  this.groups={};
};
treeMenu.prototype={
  init:function(pid){
    this.flag = true;
    this.group();
    return this.getDom(this.groups[pid]);
  },
  group:function(){
    for(var i=0;i<this.tree.length;i++){
      if(this.groups[this.tree[i].parent_id]){
        this.groups[this.tree[i].parent_id].push(this.tree[i]);
      }else{
        this.groups[this.tree[i].parent_id]=[];
        this.groups[this.tree[i].parent_id].push(this.tree[i]);
      }
    }
    // console.log( JSON.stringify(this.groups) )
  },
  getDom:function(a){
    if(!a){return ''}
    if(this.flag){
      var html='\n<ul class="nav main-menu">\n';
      this.flag = !this.flag;
    }
    else{
      var html='\n<ul class="dropdown-menu">\n';
    }
    for(var i=0;i<a.length;i++){
      html+='<li class="dropdown">';
      if ( a[i].power_url ) {
      	html+='<a href="'+(a[i].power_url || 'javascript:;')+'" class="ajax-link" data-value="'+a[i].id+'">';
      }
      else {
      	html+='<a href="'+(a[i].power_url || 'javascript:;')+'" class="dropdown-toggle" data-value="'+a[i].id+'">';
      }
      if( a[i].power_icon ){
      	html+='<i class="'+a[i].power_icon+'"></i>';
      	html+='<span class="hidden-xs">'+a[i].power_name+'</span>';
      }else{
      	html+=a[i].power_name;
      }
      html+='</a>';
      if(a[i]["power_level"] < 2) html+=this.getDom(this.groups[a[i].id]);
      html+='</li>\n';
    };
    html+='</ul>\n';
    return html;
  }
};
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//
//      MAIN DOCUMENT READY SCRIPT
//
//      In this script main logic of theme
//
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
$(document).ready(function () {
	$('#username').text( global.useres.useres_name );
	$('.fa-power-off').parent().click(function(e) {
		$.cookie('useres','',{ path:'/', expires:-1 });
		location.href = '/admin';
	});
	// 初始化左侧功能列表
	$.ajax({
		url: '/getRolePower',
		type: 'POST',
		async:false,
		dataType: 'json',
		data: { roleId : global.useres.role_id }
	})
	.done(function(json) {
		roleInfo = json.value[0];
		powerList = json.value[1];
		// console.log(powerList);
		global.treeMenu = new treeMenu(powerList);
		var html = global.treeMenu.init(0);
		// console.log( html );
		$('#sidebar-left').html( html );
	});
	

	$('.show-sidebar').on('click', function (e) {
		e.preventDefault();
		$('div#main').toggleClass('sidebar-show');
		setTimeout(MessagesMenuWidth, 250);
	});
	var ajax_url = location.hash.replace(/^#/, '');
	if (ajax_url.length < 1) {
		ajax_url = 'ajax/welcome.html';
	}
	// console.log(5);
	LoadAjaxContent(ajax_url);
	
	$('.main-menu').on('click', 'a', function (e) {
		var parents = $(this).parents('li');
		var li = $(this).closest('li.dropdown');
		var another_items = $('.main-menu li').not(parents);
		another_items.find('a').removeClass('active');
		another_items.find('a').removeClass('active-parent');
		if ($(this).hasClass('dropdown-toggle') || $(this).closest('li').find('ul').length === 0) {
			$(this).addClass('active-parent');
			var current = $(this).next();
			if (current.is(':visible')) {
				li.find("ul.dropdown-menu").slideUp('fast');
				li.find("ul.dropdown-menu a").removeClass('active');
			}
			else {
				another_items.find("ul.dropdown-menu").slideUp('fast');
				current.slideDown('fast');
			}
		}
		else {
			if (li.find('a.dropdown-toggle').hasClass('active-parent')) {
				var pre = $(this).closest('ul.dropdown-menu');
				pre.find("li.dropdown").not($(this).closest('li')).find('ul.dropdown-menu').slideUp('fast');
			}
		}
		if ($(this).hasClass('active') === false) {
			$(this).parents("ul.dropdown-menu").find('a').removeClass('active');
			$(this).addClass('active');
		}
		if ($(this).hasClass('ajax-link')) {
			e.preventDefault();
			if ($(this).hasClass('add-full')) {
				$('#content').addClass('full-content');
			}
			else {
				$('#content').removeClass('full-content');
			}
			var url = $(this).attr('href');
			//window.location.hash = url;
			// console.log(1)
			//LoadAjaxContent(url);
		}
		if ($(this).attr('href') === '#') {
			e.preventDefault();
		}
	});
	var height = window.innerHeight - 49;
	$('#main').css('min-height', height)
		.on('click', '.expand-link', function (e) {
			var body = $('body');
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			button.toggleClass('fa-expand').toggleClass('fa-compress');
			box.toggleClass('expanded');
			body.toggleClass('body-expanded');
			var timeout = 0;
			if (body.hasClass('body-expanded')) {
				timeout = 100;
			}
			setTimeout(function () {
				box.toggleClass('expanded-padding');
			}, timeout);
			setTimeout(function () {
				box.resize();
				box.find('[id^=map-]').resize();
			}, timeout + 50);
		})
		.on('click', '.collapse-link', function (e) {
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			var content = box.find('div.box-content');
			content.slideToggle('fast');
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			setTimeout(function () {
				box.resize();
				box.find('[id^=map-]').resize();
			}, 50);
		})
		.on('click', '.close-link', function (e) {
			e.preventDefault();
			var content = $(this).closest('div.box');
			content.remove();
		});
	$('#locked-screen').on('click', function (e) {
		e.preventDefault();
		$('body').addClass('body-screensaver');
		$('#screensaver').addClass("show");
		ScreenSaver();
	});
	$('body').on('click', 'a.close-link', function(e){
		e.preventDefault();
		CloseModalBox();
	});
	$('body').on('click', 'a.ajax-link', function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		window.location.hash = url;
		//// console.log(2);
		LoadAjaxContent(url);
	});
	$('#top-panel').on('click','a', function(e){
		if ($(this).hasClass('ajax-link')) {
			e.preventDefault();
			if ($(this).hasClass('add-full')) {
				$('#content').addClass('full-content');
			}
			else {
				$('#content').removeClass('full-content');
			}
			var url = $(this).attr('href');
			window.location.hash = url;
			// console.log(3)
			LoadAjaxContent(url);
		}
	});
	$('#search').on('keydown', function(e){
		if (e.keyCode === 13){
			e.preventDefault();
			$('#content').removeClass('full-content');
			ajax_url = 'ajax/page_search.html';
			window.location.hash = ajax_url;
			// console.log(4)
			LoadAjaxContent(ajax_url);
		}
	});
	$('#screen_unlock').on('mouseover', function(){
		var header = 'Enter current username and password';
		var form = $('<div class="form-group"><label class="control-label">Username</label><input type="text" class="form-control" name="username" /></div>'+
					'<div class="form-group"><label class="control-label">Password</label><input type="password" class="form-control" name="password" /></div>');
		var button = $('<div class="text-center"><a href="index.html" class="btn btn-primary">Unlock</a></div>');
		OpenModalBox(header, form, button);
	});
});


