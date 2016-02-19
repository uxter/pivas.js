module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*!\n'
            + '* <%= pkg.name %> v<%= pkg.version %>\n'
            + '* <%= pkg.homepage %>\n'
            + '*\n'
            + '* <%= pkg.description %>\n'
            + '*\n'
            + '* Copyright 2012, <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'
            + '* Released under the <%= pkg.license.type %> license\n'
            + '* <%= pkg.license.url %>\n'
            + '*\n'
            + '* Date: <%= (new Date()).toString() %>\n'
            + '*/\n\n'
      },
      main: {
        src: [
          'lib/PV.js',
          'lib/PV.*.js'
        ],
        dest: 'dest/pivas.js'
      }
    },
    uglify: {
      main: {
        options: {
          mangle: false
        },
        files: {
          'dest/pivas.min.js': '<%= concat.main.dest %>'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat:main', 'uglify:main']);

};
