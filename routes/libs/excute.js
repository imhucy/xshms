var mysql = require('mysql'),
		fs = require('fs'),
		util = require('./utils.js'),
		dbClient;

module.exports = function (dirname) {
	__constructor(dirname);
	var self = this;
	/**
	 * 查找整张表并返回数据
	 * @param  {[type]}   table    表名
	 * @param  {Function} callback 回调函数返回数据
	 * @return {[type]}            [description]
	 */
	this.findAll = function (table,callback) {
		var callback = callback || function(){};
		dbClient.query('select * from '+table,function(err,results){
			if(err){
				console.log('查询%s表失败：%s',	table, err);
				dbClient.release();
				callback(false);
			}else {
				if(results){
					callback(results);
				}
			}
		});
	};
	/**
	 * 通过id进行查询,返回结果json
	 * @param  {string}   table    待查询表名
	 * @param  {json  }   idJson   IDJson
	 * @param  {Function} callback 回调函数
	 * @return {null  }            null
	 */
	this.findById = function (table,idJson,callback) {
		var callback = callback || function () {};
		dbClient.query('select * from '+table+' where ?',idJson,function(err,results){
			if(err){
				console.log( '从数据库获取数据错误 : ' + err.message );
				dbClient.release();
				callback(false);
			}else{
				if(results){
					callback(results.pop());
				}else{
					callback(results);
				}
			}
		})
	};
	/**
	 * 向数据库插入数据
	 * @param  {string}   table    表名
	 * @param  {json  }   rowInfo  待插入数据		
	 * @param  {Function} callback 回调函数
	 * @return {null  }            null
	 */
	this.insert = function (table,rowInfo,callback) {
		var callback = callback || function () {};
		dbClient.query('insert into '+table+' SET ?', rowInfo,function  (err,result) {
			if (err) throw err;
			callback(result.insertId);
			/*
			{
			  fieldCount: 0,
			  affectedRows: 1,
			  insertId: 2,
			  serverStatus: 2,
			  warningCount: 0,
			  message: '',
			  protocol41: true,
			  changedRows: 0 
			 }
			 */
		});
	};
	/**
	 * 修改数据库数据
	 * @param  {string}   table    待更新表名
	 * @param  {json  }   id       待更新的id值
	 * @param  {json  }   rowInfo  更新值
	 * @param  {Function} callback function
	 * @return {null  }            null
	 */
	this.modify = function (table,id,rowInfo,callback) {
		var callback = callback || function () {};
		dbClient.query('update '+table+' SET ? where ?', [rowInfo,id],function  (err,result) {
			if (err) {
				console.log('修改失败......:\n'+err);
				callback (false);
			}else {
				callback(result);
			}
		});
	};
	/**
	 * 删除一条数据
	 * @param  {string}   table    表名称
	 * @param  {json  }   id       数据库中该表的主键 ：值
	 * @param  {Function} callback function
	 * @return {null  }            
	 */
	this.remove = function (table,id,callback) {
		var callback = callback || function () {};
		dbClient.query('delete from '+table+' where ?',id,function (err,results) {
			if(err){
				console.log('删除数据失败...... \n' +err );
				dbClient.release();
				callback(false);
			}else{
				callback(true);
			}
		});

	};

	/**
	 * 数据库条件查询
	 * @param  {string}   table       表名称
	 * @param  {json  }   whereJson   and和or的实现
	 * @param  {json  }   orderByJson {key : time ,type :desc }
	 * @param  {array }   limitArr    [第一个是返回偏移量，第二个是返回数量，若为空则全部返回]
	 * @param  {array }   fieldsArr   [返回哪些字段]
	 * @param  {Function} callback    [function]
	 * @return null
	 */
	this.find = function (tableName,whereJson,orderByJson,limitArr,fieldsArr,callback) {
		var andWhere   = whereJson['and']
		  , orWhere    = whereJson['or']
		  , andArr = []
		  , orArr  = []
		  , fieldsArr = fieldsArr || []
		  , limitArr = limitArr || [];
		/* 将数组转换为where and条件array */
		if(andWhere)
			for(var i=0; i<andWhere.length; i++){
				andArr.push(andWhere[i]['key'] + andWhere[i]['opts'] + andWhere[i]['value']);
			}
		 /* 将数组转换为where or条件array */
		if(orWhere)
			for(var i=0; i<orWhere.length; i++){
				orArr.push(orWhere[i]['key'] + orWhere[i]['opts'] +orWhere[i]['value']);
			}
		/* 判断条件是否存在，如果存在则转换相应的添加语句 */
		var filedsStr = fieldsArr.length>0 ? fieldsArr.join(',') : '*'
		  , andStr    = andArr.length>0    ? andArr.join(' and ') : ''
		  , orStr     = orArr.length>0     ? ' or '+orArr.join(' or ') : ''
		  , limitStr  = limitArr.length>0  ? ' limit ' + limitArr.join(',') : ''
		  , orderStr  = orderByJson ? ' order by ' + orderByJson['key'] + ' ' + orderByJson['type'] : '';
		/* 执行mysql语句 */
		dbClient.query('SELECT ' + filedsStr + ' FROM ' + tableName + ' where ' + andStr + orStr + orderStr + limitStr,
      function(error, results) {
          if (error) {
              console.log('GetData Error: ' + error.message);
              dbClient.release();
              callback(false);
          } else {
						callback(results);
					}	
    });
    
	};
	this.query = function (sql,json,callback) {
		if(typeof json === 'function')
		{
			callback = json;
			dbClient.query(sql,function (error,results) {
				if(error)
				{
					console.log('自定义查询失败 ：\n====>'　+ error.message);
					dbClient.release();
					callback(false);
				}else{
					callback(results);
				}
			});
		}
		else{
			dbClient.query(sql,json,function (error,results) {
				if(error)
				{
					console.log('自定义查询失败 ：\n====>'　+ error.message);
					dbClient.release();
					callback(false);
				}else{
					callback(results);
				}
			});
		}
	}
	this.close = function(){
		dbClient.release();
	}
	function __constructor (dirname) {
		var configPath = dirname + '/config.json';
		var dbConfig = util.getJson(configPath,'db');
		//console.log(dbConfig)
		var client = {}

		client.connectionLimit = 100;

		client.multipleStatements = true;

		// client.debug = true;
		
		client.host = dbConfig['host'];

		client.port = dbConfig['port'];

		client.user = dbConfig['user'];

		client.password = dbConfig['password'];

		client.database = dbConfig['database'];

		var pool = mysql.createPool(client);
		pool.getConnection(function (err,conn) {
			if(err){
				console.log('====> 连接数据库错误：' + err.message);
			}else{
				dbClient = conn;
				console.log('======>成功建立连接......');
				conn.on('error', handleError);
			}
		});
		function handleError (err) {
		  if (err) {
		    // 如果是连接断开，自动重新连接
		    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
		    	// 从连接池重新获取连接
		      pool.getConnection(function (err,conn) {
						if(err){
							console.log('====> 连接数据库错误：' + err.message);
						}else{
							dbClient = conn;
							console.log('======>断线重连......');
							conn.on('error', handleError);
						}
					});
		    } else {
		      console.error(err.stack || err);
		    }
		  }
		}
	}
}

