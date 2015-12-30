module.exports = function(grunt){


	// LiveReload的默认端口号，你也可以改成你想要的端口号
	var lrPort = 35729;
	// 使用connect-livereload模块，生成一个与LiveReload脚本
	// <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
	var lrSnippet = require('connect-livereload')({
		port: lrPort
	});
	// 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
	var serveStatic = require('serve-static');
	var serveIndex = require('serve-index');
	var lrMiddleware = function(connect, options, middlwares) {
		return [
			lrSnippet,
			// 静态文件服务器的路径
			serveStatic(options.base[0]),
			// 启用目录浏览(相当于IIS中的目录浏览)
			serveIndex(options.base[0])
		];
	};


	// 任务配置，所有插件的配置信息
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint:{
			load: [ 'src/devoops/js/loadPlugin/*.js' ],
			theme: [ 'src/devoops/js/theme/*.js' ],
			pageDemo:[ 'src/devoops/js/pageDemo/*.js' ],
			main: ['src/devoops/js/*.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},
		uglify:{
			build:{
				options: {
					banner:'/* main.min.js -- <%=grunt.template.today("yyyy-mm-dd") %>*/\n',
				},
				files: {
					'admin/js/main.min.js':[ 'admin/js/main.js' ],
				},
			},
		},
		cssmin:{
			main:{
				options: {
					banner: '/* main style <%=grunt.template.today("yyyy-mm-dd") %> */',
				},
				files : {
					'admin/css/main.min.css':[ 'src/devoops/css/reset.css' , 'src/devoops/css/font-awesome.css' , 'src/devoops/css/style.css' ],
				},
			},
		},
		concat:{
			options:{
				separator: '\n',
				stripBanners: false,
			},
			loadjs:{
	    	src:[ 'src/devoops/js/loadPlugin/banner.txt', 'src/devoops/js/loadPlugin/*.js'],
	    	dest: 'admin/js/loadPlugin.js',
	    },
	    theme:{
	    	src:[ 'src/devoops/js/theme/banner.txt', 'src/devoops/js/theme/*.js'],
	    	dest: 'admin/js/theme.js',
	    },
	    pageDemo:{
	    	src:[ 'src/devoops/js/pageDemo/banner.txt', 'src/devoops/js/pageDemo/*.js'],
	    	dest: 'admin/js/pageDemo.js',
	    },
	    merge:{
	    	src:['admin/js/loadPlugin.js','admin/js/theme.js','admin/js/pageDemo.js','src/devoops/js/main.js'],
	    	dest: 'admin/js/main.js',
	    },
		},
		copy:{
			move: {
		    files: [
		      {	
		      	cwd:'src/devoops',
		      	// src: ['plugins/**','img/**','fonts/**','ajax/**','index.html'],
		      	src: ['index.html'],
		      	dest: 'admin',
		      	filter: 'isFile',
		      	expand: true,
		      	flatten: false,
		      },
		    ],
		  },
		},
		watch:{
			loadjs:{
				files:['src/devoops/js/loadPlugin/*.js','src/devoops/js/loadPlugin/*.txt'],
				tasks:['jshint:load','concat:loadjs'],
			},
			themejs:{
				files:['src/devoops/js/theme/*.js','src/devoops/js/theme/*.txt'],
				tasks:['jshint:theme','concat:theme'],
			},
			pagejs:{
				files:['src/devoops/js/pageDemo/*.js','src/devoops/js/pageDemo/*.txt'],
				tasks:['jshint:pageDemo','concat:pageDemo'],
			},
			merge:{
				files:['admin/js/loadPlugin.js','admin/js/theme.js','admin/js/pageDemo.js','src/devoops/js/main.js'],
				tasks:['jshint:main','concat:merge','uglify'],
			},
			css:{
				files:['src/devoops/css/*.css'],
				tasks:['cssmin'],
			},
			// others:{
			// 	files:['src/devoops/plugins/**','src/devoops/img/**','src/devoops/fonts/**','src/devoops/ajax/**','src/devoops/index.html'],
			// 	tasks:['copy:move'],
			// },
			others:{
				files:['src/devoops/index.html'],
				tasks:['copy:move'],
			},
			client: {
				// 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
				options: {
					livereload: lrPort
				},
				// '**' 表示包含所有的子目录
				// '*' 表示包含所有的文件
				files: ['admin/**/*']
			},
		},

		// 通过connect任务，创建一个静态服务器
		connect: {
			options: {
				// 服务器端口号
				port: 8019,
				// 服务器地址(可以使用主机名localhost，也能使用IP)
				hostname: 'localhost',
				// 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
				base: '.'
			},
			livereload: {
				options: {
					// 通过LiveReload脚本，让页面重新加载。
					middleware: lrMiddleware,
				},
			},
		},


	});
//告诉grunt我们将使用插件
	// js语法验证器
	grunt.loadNpmTasks('grunt-contrib-jshint');
	// js压缩
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// css语法验证器(然而这并没有什么卵用)
	grunt.loadNpmTasks('grunt-contrib-csslint');
	// css压缩(貌似也有合并的功能)
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// 文件合并
	grunt.loadNpmTasks('grunt-contrib-concat');
	// 文件复制
	grunt.loadNpmTasks('grunt-contrib-copy');
	// 将文件监控
	grunt.loadNpmTasks('grunt-contrib-watch');
	// 告诉grunt当我们再终端输入grunt时 需要做些什么（注意先后顺序）
	grunt.registerTask('default',[ 'jshint' ,'uglify' , 'cssmin' , 'concat' , 'watch' ]);

	// 加载插件livereload
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// reload Task
	grunt.registerTask('live', ['connect', 'watch']);
};