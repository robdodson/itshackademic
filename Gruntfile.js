module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

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
    autoprefixer: {
      options: {
        // options
      },
      overwrite: {
        src: 'static/css/main.css'
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
        tasks: ['sass:style', 'autoprefixer:overwrite'],
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
    appengine: {
      frontend: {
        root: '.'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      server: ['appengine:run:frontend', 'watch']
    }
  });

  grunt.registerTask('default', ['concurrent']);

};
