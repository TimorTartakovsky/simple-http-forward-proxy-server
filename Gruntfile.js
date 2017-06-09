/**
 * Created by Timor on 6/8/2017.
 */
module.exports =  (grunt) => {
    grunt.initConfig({
        mandrill: {
            mailer: {
                options: {
                    key: 'fpcNJAURJNSY34mTWIgGrw',
                    sender: 'teymurbey86@mail.ru',
                    recipient: 'teymurbey86@mail.ru',
                        subject: 'Confirmation E-Mail'
                    },
                    src: ['./templates/conf/*.html']
                }
        },
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
        git_deploy: {
            your_target: {
                options: {
                    url: 'git@github.com:TimorTartakovsky/simple-http-forward-proxy-server.git'
                },
                src: './src'
            },
        }
    });

    grunt.loadNpmTasks('grunt-mandrill');
    grunt.loadNpmTasks('grunt-minified');
    grunt.loadNpmTasks('grunt-git-deploy');

    grunt.registerTask('default',['minified','mandrill','git_deploy']);

}