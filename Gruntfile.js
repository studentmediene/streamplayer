/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
        requirejs: {
            compile: {
                options: {
                    dir: './build/scripts',
                    baseUrl: './app/scripts',
                    paths: {
                        'requireLib': '../bower_components/requirejs/require',
                        'jquery': 'empty:',
                        'angular': 'empty:',
                        'config': 'buildConfig'
                    },
                    modules: [
                        {
                            name: 'main',
                            include: ['requireLib']
                        },
                    ],
                    mainConfigFile: './app/scripts/main.js'
                }

            }
        },

        cssmin: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['css/*.css'],
                        dest: 'build/',
                        ext: '.min.css'
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['index.html'],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['img/**'],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'app/bower_components/soundmanager2/',
                        src: ['swf/**'],
                        dest: 'build/'
                    }
                ],
                options: {
                    process: function (content) {
                        return content.replace('.css', '.min.css').
                            replace(
                            '<script data-main="scripts/main" src="bower_components/requirejs/require.js"></script>',
                            '<script src="scripts/main.js"></script>');
                    },
                    noProcess: '**/*.{png,swf}'

                }

            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task.
    grunt.registerTask('default', ['jshint', 'requirejs', 'cssmin', 'copy']);

};
