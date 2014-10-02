module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		clean: {
			src: ["assets/css", "assets/img"]
		},
		compass: {
			dist: {
				options: {
					sassDir: 'assets/scss',
					cssDir: 'assets/css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'assets/scss',
					cssDir: 'assets/css',
					environment: 'development'
				}
			}
		},
		watch: {
			options: {
				atBegin: true
			},
			sass: {
				files: [
					'assets/scss/**/*.scss'
				],
				tasks: [
					'compass:dev'
				]
			}
		},
		imagemin: {                          // Task
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					// Set to true to enable the following options…
					expand: true,
					// cwd is 'current working directory'
					cwd: 'assets/images/',
					src: ['**/*.png'],
					// Could also match cwd line above. i.e. project-directory/img/
					dest: 'assets/img/',
					ext: '.png'
				}]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [{
					// Set to true to enable the following options…
					expand: true,
					// cwd is 'current working directory'
					cwd: 'assets/images/',
					src: ['**/*.jpg'],
					// Could also match cwd. i.e. project-directory/img/
					dest: 'assets/img/',
					ext: '.jpg'
				}]
			},
			gif: {
				options: {
					interlaced: true
				},
				files: [{
					expand: true,
					cwd: 'assets/images/',
					src: ['**/*.gif'],
					dest: 'assets/img/',
					ext: '.gif'
				}]
			}
		},
		uglify: {
			production: {
				files: {
					//'assets/js/head.js': ['assets/js/head/*.js']
				}
			}
		},
		cssmin: {
			production: {
				expand: true,
				cwd: 'assets/css',
				src: ['*.css'],
				dest: 'assets/css/build'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('prebuild', [
	    'clean',
	    'compass:dist'
	]);

	grunt.registerTask('postbuild', [
		'imagemin',
		'uglify:production',
		'cssmin:production'
	]);

	grunt.registerTask('buildProduction', [
		'prebuild',
		'postbuild'
	]);

	grunt.registerTask('deployProduction', [
		'buildProduction'
	]);

	grunt.registerTask('default', [ 'watch' ]);
};
