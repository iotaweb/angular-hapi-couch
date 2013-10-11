var path    = require('path');
var nano    = require('nano')('http://localhost:5984');
var dbName  = 'angular-hapi-couch';

module.exports = function(grunt) {

    grunt.initConfig({

        jade: {
            compile: {
                options: {
                    doctype: '5', // needed for angular.js directives
                    pretty: true
                },
                files: [{
                    expand: true,
                    src: '**/*.jade',
                    dest: 'app/public/lib/cores/templates',
                    cwd: 'app/views/templates',
                    ext: '.html'
                }]
            }
        },

        stylus: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    'app/public/css/styles.css': 'app/views/styles/styles.styl'
                }
            }
        },

        ngtemplates: {
            cores: {
                src: 'app/public/lib/cores/templates/*.html',
                dest: 'app/public/lib/cores/templates/templates.js',
                options: {
                    base: 'app/public/lib/cores/templates',
                    prepend: 'cr-',
                    module: 'cores.templates'
                }
            }
        },

        concat: {       
            components: {
                src: [
                    'app/public/components/jquery/jquery.js',
                    'app/public/components/angular/angular.js',
                    'app/public/components/angular-route/angular-route.js',                    
                    'app/public/components/bootstrap/dist/js/bootstrap.js',
                    'app/public/components/markdown/lib/markdown.js',
                    'app/public/components/jquery-autosize/jquery-autosize.js'
                ],
                dest: 'app/public/components/components.js'
            },
            cores: {
                src: [  // order matters!
                    'app/public/lib/cores/index.js',
                    'app/public/lib/cores/templates/templates.js',
                    'app/public/lib/cores/controllers/*.js',
                    'app/public/lib/cores/services/*.js',
                    'app/public/lib/cores/directives/*.js'
                ],
                dest: 'app/public/lib/cores.js'
            },
            app: {             
                src: [
                    'app/public/js/app.js',
                    'app/public/js/controllers.js',
                    'app/public/js/directives.js',
                    'app/public/js/filters.js',
                    'app/public/js/services.js'
                ],
                dest: 'app/public/js/main.js',
                options: {
                    // Replace all 'use strict' statements with a single one at the top
                    banner: "'use strict';\n\n",
                    process: function(src, filepath) {
                        return '/* ---------- Source: ' + filepath + ' ----------- */\n\n' + 
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1') + '\n';
                    }
                }                
            }
        },
        
        ngmin: {
            cores: {
                src: 'app/public/lib/cores.js',
                dest: 'app/public/lib/cores.js'
            },
            app: {
                src: 'app/public/js/main.js',
                dest: 'app/public/js/main.js'
            }
        },
        
        uglify: {
            components: {
                files: {
                    'app/public/components/components.min.js': ['app/public/components/components.js']
                }
            },
            cores: {
                files: {
                    'app/public/lib/cores.min.js': ['app/public/lib/cores.js']
                }
            },
            main: {
                files: {
                    'app/public/js/main.min.js': ['app/public/js/main.js']
                }
            }
        },
                  
        watch: {
            styles: {
                files: 'app/views/styles/*.styl',
                tasks: 'stylus'
            },
            cores: {
                files: 'app/public/lib/cores/**/*.js',
                tasks: 'concat'
            },
            templates: {
                files: 'app/views/templates/*.jade',
                tasks: ['jade', 'ngtemplates', 'concat']
            }
        }

    });

    // npm tasks
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-ngmin');    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // single tasks
    grunt.registerTask('db', 'db:create');
    grunt.registerTask('server', 'server:run');
    
    // multi tasks
    grunt.registerTask('default', ['jade', 'stylus', 'ngtemplates', 'concat']);
    //grunt.registerTask('min', ['jade', 'stylus', 'ngtemplates', 'concat', 'ngmin', 'uglify']);
    grunt.registerTask('users', ['db', 'db:fixtures']);    

    // db tasks
    grunt.registerTask('db:create', 'create DB', function() {

        var done = this.async();

        // create db for testing
        nano.db.get(dbName, function(err, body) {

            if (!err) {
                // db exists, recreate
                nano.db.destroy(dbName, function(err) {

                    if (err) {
                        done(err);
                    }
                    nano.db.create(dbName, done);
                });
            } else if (err.reason === 'no_db_file') {
                // create the db
                nano.db.create(dbName, done);

            } else {
                done(err);
            }
        });
    });

    grunt.registerTask('db:fixtures', 'populate DB', function() {

        var done = this.async();
        var db = nano.use(dbName);
        var users = require('./test/fixtures/users.json');

        // add test users
        db.bulk(users, function (err, body) {

            if(err) {
                done(err);
            }
        });
    });

    // server tasks
    grunt.registerTask('server:run', 'start server', function() {

        var done = this.async();
        var startServer = require('./app/server.js');

        startServer(function(err) {

            if (err) {
                console.log(err);
            }
        });

        // never call done to run endlessly

    });

};