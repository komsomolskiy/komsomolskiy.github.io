module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	var pugMinify = true,
		mapfile = '';
		optionsPug = {
			pretty: '\t',
			separator:  '\n'
		},
		tasksConfig = {
			pkg: grunt.file.readJSON("package.json"),
			meta: {
				banners: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License | <%= pkg.homepage %>*/",
				glyphsicon: "<%= meta.banners %>\n/*! glyphsicon font komsomolskiy */"
			},
			uglify: {
				app: {
					options: {
						sourceMap: false,
						compress: true
					},
					files: [
						{
							expand: true,
							flatten : true,
							src: [
								'test/js/appjs.js'
							],
							dest: 'assets/templates/komsomolskiy/js/',
							filter: 'isFile'
						}
					]
				},
				js: {
					options: {
						banner: '<%= meta.banners %>',
						sourceMap: false,
						compress: true
					},
					files: [
						{
							expand: true,
							flatten : true,
							src: [
								'src/pug/inc/yepnope.js'
							],
							dest: 'test/js/',
							filter: 'isFile'
						},
						{
							expand: true,
							flatten : true,
							src: [
								'test/js/main.js'
							],
							dest: 'assets/templates/komsomolskiy/js/',
							filter: 'isFile'
						}
					]
				}
			},
			jshint: {
				options: {
					expr: true,
					jshintrc: true,
					scripturl: true
				},
				src: [
					'test/js/main.js',
					'src/pug/inc/yepnope.js'
				],
			},
			less: {
				compile: {
					options : {
						compress: false,
						ieCompat: false,
						banner: '<%= meta.banners %>',
						plugins: [
							new (require('less-plugin-clean-css'))({
								level: {
									1: {
										specialComments: 0
									}
								}
							})
						]
					},
					files : {
						'test/css/main.css' : [
							'src/less/main.less',
						],
						'test/css/preloader.css' : [
							'src/less/preloader.less'
						]
					}
				},
				font: {
					options : {
						compress: false,
						ieCompat: false,
						banner: '<%= meta.glyphsicon %>',
						plugins: [
							new (require('less-plugin-clean-css'))({
								level: {
									1: {
										specialComments: 0
									}
								}
							})
						]
					},
					files : {
						'test/css/komsomolskiy.css' : [
							'src/less/komsomolskiy.less'
						]
					}
				}
			},
			autoprefixer:{
				options: {
					browsers: ['last 2 versions', 'Android 4', 'ie 8', 'ie 9', 'Firefox >= 27', 'Opera >= 12.0', 'Safari >= 6'],
					cascade: true
				},
				css: {
					files: {
						'tests/css/main.css' : ['test/media/main.css'],
						'tests/css/preloader.css' : ['test/media/preloader.css'],
						'tests/css/komsomolskiy.css' : ['test/media/komsomolskiy.css']
					}
				},
			},
			group_css_media_queries: {
				group: {
					files: {
						'test/media/main.css': ['test/css/main.css'],
						'test/media/preloader.css': ['test/css/preloader.css'],
						'test/media/komsomolskiy.css': ['test/css/komsomolskiy.css']
					}
				}
			},
			cssmin: {
				options: {
					mergeIntoShorthands: false,
					roundingPrecision: -1
				},
				minify: {
					files: {
						'assets/templates/komsomolskiy/css/main.css' : ['tests/css/main.css'],
						'assets/templates/komsomolskiy/css/preloader.css' : ['tests/css/preloader.css'],
						'assets/templates/komsomolskiy/css/komsomolskiy.css' : ['tests/css/komsomolskiy.css']
					}
				}
			},
			concat: {
				options: {
					separator: "\n",
				},
				appjs: {
					src: [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jquery.cookie/jquery.cookie.js',
						'bower_components/jquery.transform.js/jquery.transform2d.js',
						'bower_components/slick-carousel/slick/slick.js',
						'bower_components/fancybox/dist/jquery.fancybox.js',
						'src/js/snazzy-info-window.js',
					],
					dest: 'test/js/appjs.js'
				},
				main: {
					src: [
						'src/js/eye.js',
						'src/js/navsite.js',
						'src/js/tooltip.js',
						'src/js/select.js',
						'src/js/main.js'
					],
					dest: 'test/js/main.js'
				},
				hypher: {
					src: [
						'bower_components/hypher/dist/jquery.hypher.js',
						'bower_components/hypher/dist/en-us.js',
						'bower_components/hypher/dist/ru-ru.js',
					],
					dest: 'assets/templates/komsomolskiy/js/hypher.js'
				}
			},
			copy: {
				fonts: {
					expand: true,
					cwd: 'src/fonts',
					src: [
						'**.*'
					],
					dest: 'assets/templates/komsomolskiy/fonts/',
				},
			},
			pug: {
				files: {
					options: optionsPug,
					files: {
						"index.html": ['src/pug/index.pug'],
						"news.html": ['src/pug/news.pug'],
						"photogallery.html": ['src/pug/photogallery.pug']
					}
				}
			},
			imagemin: {
				compile: {
					options: {
						optimizationLevel: 7,
						svgoPlugins: [
							{
								removeViewBox: false
							}
						]
					},
					files: [
						{
							expand: true,
							flatten : true,
							src: [
								'src/images/*.{png,jpg,gif,svg}'
							],
							dest: 'assets/templates/komsomolskiy/images/',
							filter: 'isFile'
						}
					]
				}
			},
			delta: {
				options: {
					livereload: true,
				},
				compile: {
					files: [
						'src/**/*.*'
					],
					tasks: [
						'notify:watch',
						'newer:imagemin',
						'less',
						'group_css_media_queries',
						'autoprefixer',
						'cssmin',
						'newer:concat',
						'newer:copy',
						'jshint',
						'newer:uglify:app',
						'uglify:js',
						'pug',
						'notify:done'
					]
				}
			},
			notify: {
				watch: {
					options: {
						title: "<%= pkg.name %> v<%= pkg.version %>",
						message: 'Запуск',
						image: __dirname+'\\src\\notify.png'
					}
				},
				done: {
					options: {
						title: "<%= pkg.name %> v<%= pkg.version %>",
						message: "Успешно Завершено",
						image: __dirname+'\\src\\notify.png'
					}
				}
			}
		};
	
	grunt.initConfig(tasksConfig);
	
	grunt.renameTask('watch',		'delta');
    grunt.registerTask('dev',		[ 'jshint', 'delta']);
	grunt.registerTask('default',	tasksConfig.delta.compile.tasks);
}