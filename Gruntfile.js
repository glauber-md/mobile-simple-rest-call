module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '// <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %> - Licenced under GPL-3.0\n// Copyright (C) <%= grunt.template.today("yyyy") %> Glauber M. Dantas (opensource@glauber.me)',
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        }
      },
      build: {
        src: 'src/js/**/*.js',
        dest: 'build/cordova-simplerestcall.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};