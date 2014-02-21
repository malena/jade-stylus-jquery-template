module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		concat: {   
		    dist: {
				src: [
				    'js/libs/*.js', // All JS in the libs folder
				    'js/global.js'  // This specific file
				],
				dest: 'js/production.js',
		    }
		},

		uglify : {
			build: {
				src: 'js/production.js',
				dest: 'public/production.min.js' 
			}
		},

		watch: {
			options:{
				livereload: true,
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['css/*.styl'],
				tasks: ['stylus'],
				options: {
					spawn: false,
				}
			},
			html: {
				files: ['index.jade'],
				tasks: ['jade'],
				options: {
					spawn: false,
				}
			}
		},

		stylus: {
			options: {
				compress: true
			},
			compile: {
				files: {
					'public/global.css' : 'css/global.styl'
				}
			}
		},

		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'index.html' : 'index.jade'
				}
			}
		},

		connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 8000
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('serve', ['connect', 'concat', 'uglify', 'stylus', 'jade', 'watch']);

};
