/*-------------------------------------------
	Scripts for DataTables page (table-test.html)
	EditabeTable 编辑表格
---------------------------------------------*/

function EditabeTable(option){

	var defaults = {
		table:'#datatable-2',
		addBtn:'#addBtn',

		rowAdd:fnAdd,
		rowEdit:fnEdit,
		rowSave:fnSave,
		rowCancel:fnCancel,
		rowRemove:fnRemove,
		rowSetActionsEditing:fnSetActionEditing,
		rowSetActionsDefault:fnSetActionDefault
	};

	var args = $.extend({}, defaults, option);

	var $table  =  $(args.table);
	var $addBtn =  $(args.addBtn);
	
	var asInitVals = [];
	// 初始化表格数据
	var dt = $table.dataTable( {
		"aaSorting": [[ 0, "asc" ]],
		"sDom": "<'box-content'<'col-sm-6'l><'col-sm-6 text-right'f><'clearfix'>>rt<'box-content'<'col-sm-6'i><'col-sm-6 text-right'p><'clearfix'>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sSearch": "",
			"sLengthMenu": '_MENU_',
			"sInfo": "显示 _START_ 到 _END_ 条记录 共 _TOTAL_ 条记录",
			"oPaginate": {
          "sPrevious": "上一页",
          "sNext":     "下一页"
      }
		},
		bAutoWidth: false,
		bScrollX:true
	});
	var oTable = dt.api();
	// 表格头过滤
	var header_inputs = $table.find('thead input');//$("#datatable-2 thead input");
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
	header_inputs.each( function (i) {
		asInitVals[i] = this.value;
	});
// 操作
	$table
				.on('click', 'a.save-row', function( e ) {
					e.preventDefault();

					args.rowSave( $(this).closest( 'tr' ) );
				})
				.on('click', 'a.cancel-row', function( e ) {
					e.preventDefault();

					args.rowCancel( $(this).closest( 'tr' ) );
				})
				.on('click', 'a.edit-row', function( e ) {
					e.preventDefault();

					args.rowEdit( $(this).closest( 'tr' ) );
				})
				.on( 'click', 'a.remove-row', function( e ) {
					e.preventDefault();

					var $row = $(this).closest( 'tr' );

					$('#removeModal').modal('toggle');

					$('#removeBtn').on('click',function(e){

						args.rowRemove( $row );

						$('#removeModal').modal('hide');

						$('#removeBtn').off();

					});

				});

			$addBtn.on( 'click', function(e) {
				e.preventDefault();

				args.rowAdd();
			});

	//===========================================================
	// row function
	//===========================================================
	function fnAdd () {
		$addBtn.attr({ 'disabled': 'disabled' });

		var actions,
				data,
				$row;
		actions = [
				'<a href="javascript:;" class="btn btn-info hidden on-editing save-row"> 保 存 <i class="fa fa-save"></i></a>',
				'<a href="javascript:;" class="btn btn-info hidden on-editing cancel-row"> 取 消 <i class="fa fa-times"></i></a>',
				'<a href="javascript:;" class="btn btn-info on-default edit-row"> 编 辑 <i class="fa fa-pencil"></i></a>',
				'<a href="javascript:;" class="btn btn-info on-default remove-row"> 删 除 <i class="fa fa-trash-o"></i></a>',
			].join(' ');
		var arr = [];
		for (var i = 0; i < header_inputs.size(); i++) {
			arr.push('');
		}
		arr.push(actions);
		data = oTable.row.add(arr);
		$row = oTable.row( data[0] ).nodes().to$();

		$row.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			args.rowEdit( $row );

			oTable.order([0,'asc']).draw();

	}// end of add function
	function fnEdit( $row ){
		var data = oTable.row( $row.get(0) ).data();

		$row.children( 'td' ).each(function( i ) {
			var $this = $( this );

			if ( $this.hasClass('actions') ) {
				args.rowSetActionsEditing( $row );
			} else {
				$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
			}
		});
	}
	function fnSave( $row ){
		var $actions,
				values    = [];

			if ( $row.hasClass( 'adding' ) ) {
				$addBtn.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);

				if ( $this.hasClass('actions') ) {
					args.rowSetActionsDefault( $row );
					return oTable.cell( this ).data();
				} else {
					return $.trim( $this.find('input').val() );
				}
			});

			oTable.row( $row.get(0) ).data( values );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				args.rowSetActionsDefault( $row );
			}

			oTable.draw();
	}
	function fnCancel( $row ){
		var $actions,
				i,
				data;

			if ( $row.hasClass('adding') ) {
				args.rowRemove( $row );
			} else {

				data = oTable.row( $row.get(0) ).data();
				oTable.row( $row.get(0) ).data( data );

				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					args.rowSetActionsDefault( $row );
				}

				oTable.draw();
			}
	}
	function fnRemove( $row ){
		if ( $row.hasClass('adding') ) {
			$addBtn.removeAttr( 'disabled' );
		}

		oTable.row( $row.get(0) ).remove().draw();
	}
	function fnSetActionEditing( $row ){
		
		$row.find( '.on-editing' ).removeClass( 'hidden' );

		$row.find( '.on-default' ).addClass( 'hidden' );
		
	}
	function fnSetActionDefault( $row ){

		$row.find( '.on-editing' ).addClass( 'hidden' );
		
		$row.find( '.on-default' ).removeClass( 'hidden' );
	
	}
}//end of EditabeTable