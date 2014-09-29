module.exports = function(grunt) {

  grunt.registerTask('serve', [ 'connect:server', 'watch' ]);

  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'src/javascript/*.js'
        ],
        dest: 'static/js/app.js'
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'static/js/app.js': ['static/js/app.js']
        }
      }
    },
    sass: {
      style: {
        files: {
          "static/css/main.css": "src/scss/main.scss"
        }
      }
    },
    watch: {
      js: {
        files: ['src/javascript/*.js'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['scss:style'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: ['static/*.html'],
        options: {
          livereload: true,
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          base: 'static/',
          port: 9000
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

};
