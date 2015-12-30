var fs = require('fs'),
		formidable = require('formidable');

module.exports = function (req,res,dir,callback) {

	var form = new formidable.IncomingForm();   //创建上传表单

  form.encoding = 'utf-8';
  // form.uploadDir = '../public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
  form.uploadDir = '../public' + dir;
  form.keepExtensions = true;	 //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小 max = 2M

  res.setHeader('content-type', 'text/plain;charset=utf-8');
  // 返回给前台
  var msg = '';
  // 用于设置文件名不重复
  var d = new Date();
  // 解析表单
	form.parse(req, function(err, fields, files) {

	  if (err) {
	    msg = res.locals.error = err;
	    res.end(msg);
	    return;
	  }  
	   
	  var extName = '';  //后缀名
	  
	  extName = getExtName(files.fulAvatar.type);

	  if(extName.length == 0){
	      msg = res.locals.error = '只支持png和jpg格式图片';
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
		
		msg = res.locals.success = '上传成功';
	  
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