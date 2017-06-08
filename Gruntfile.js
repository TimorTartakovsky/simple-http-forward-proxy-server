/**
 * Created by Timor on 6/8/2017.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        minified : {
            files: {
                src: [
                    './dist/**/*.js',
                    './dist/*.js'
                ],
                dest: './dist/js/min/'
            },
            options : {
                sourcemap: true,
                allinone: false
            }
        },
        gitcommit: {
            your_target: {
                options: {
                    cwd: "https://github.com/TimorTartakovsky/simple-http-forward-proxy-server.git"
                },
                files: [
                    {
                        src: ["./dist/server.js", "./dist/serverUtils.js"],
                        expand: true,
                        cwd: "https://github.com/TimorTartakovsky/simple-http-forward-proxy-server.git"
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-minified');
    grunt.loadNpmTasks('grunt-git');
    grunt.registerTask('default',['minified','gitcommit']);
}