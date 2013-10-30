module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    'LongZhou <pancnlz@gmail.com> ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\r'
            },
            my_target: {
                files: {
                    'js/jquery.vpop.min.js': ['js/jquery.vpop.js']
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    'LongZhou <pancnlz@gmail.com> ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\r'
                },
                files: {
                    'css/jquery.vpop.min.css': ['css/jquery.vpop.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);
};