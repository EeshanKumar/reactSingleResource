'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');

	grunt.initConfig({
		jshint: {
			dev: { src: [
				'Gruntfile.js',
				'server.js',
				'test/**/*.js',
        'lib/**/*.js',
				'models/**/*.js',
				'routes/**/*.js',
        'app/**/*.js'
			]},
			options: {
				node: true,
				globals: {
					describe: true,
					after: true,
					it: true,
					before: true,
					beforeEach: true
				}
			}
		},
    webpack: {
      client: {
        entry: './app/js/client.jsx',
        output: {
          path: 'build/',
          file: 'bundle.js'
        },
        module: {
          loaders: [{
            test: /\.jsx$/,
            loader: 'jsx-loader'
          }]
        }
      },
		},
    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },
    clean: {
      dev: {
        src: 'build/'
      }
    },
    watch: {
      files: ['./app/**/*'],
      tasks: ['build']
    },
		simplemocha: {
			dev: {src: ['test/**/*.js']},
			options: {timeout: 1000}
		}
	});

	grunt.registerTask('linter', ['jshint:dev']);
	grunt.registerTask('test', 'simplemocha:dev');
	grunt.registerTask('build', ['webpack:client', 'copy:html']);
  grunt.registerTask('cleanup', ['clean:dev']);
  grunt.registerTask('default', ['linter', 'test']);
};
