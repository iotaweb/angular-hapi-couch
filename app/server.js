var cs = require('cores-server');
var fs = require('fs');
var Q = require('kew');
var jade = require('jade');
var nano = require('nano')('http://localhost:5984');
var path = require('path');
var common = require('./lib/common');
    
var host = 'localhost';
var port = 8080;
var dbName = 'angular-hapi-couch';   


function init(server) {

    server.on('response', function(req) {
    
        console.log('%s %s %s',
            req.raw.res.statusCode, 
            common.pad(req.method.toUpperCase(), 6),
            req.path
        );
    });

    server.on('internalerror', function(req, error) {
    
        console.log('error', error);
    });

    // listen on pack events to get plugin log events as well 
    server.pack.events.on('log', function(e) {
    
        console.log('-- log', e.tags, e.data);
    });
    
    // Define the route handlers

    getIndex = function(request) {
          
        request.reply.view('index');
    };
    
    var get404 = function (request) {
    
        request.reply.view('index').code(404);          
        
    };

    var getPartial = function (request) {
    
        var path = request.params.path;
        var partial = 'partials/' + request.params.path;
        
        if (path == '404') {
            request.reply.view(partial).code(404);
        } else {
            request.reply.view(partial)
                .header('Cache-Control', 'no-cache, no-store, must-revalidate')
                .header('Pragma', 'no-cache')
                .header('Expires', 0) ; 
        }
           
    }; 
    
    var addUsers = function (request) {
  
        var self = this;          
        var db = nano.use(dbName);            
        var users = require('../test/fixtures/users.json');        
    
        // add test users
        db.bulk(users, function (error, body) {   
            if (error) {
                console.log('error', error);
            } else {
                 self.reply.redirect('/users'); 
            }           
        }); 
    };
    
    // routes
    server.route([
        { method: 'GET', path: '/', handler: getIndex },
        { method: 'GET', path: '/api', handler: getIndex },            
        { method: 'GET', path: '/users', handler: getIndex },        
        { method: 'GET', path: '/users/add', handler: addUsers }, 
        { method: 'GET', path: '/user/{path*}', handler: getIndex },              
        { method: 'GET', path: '/partials/{path*}', handler: getPartial }, 
        { method: 'GET', path: '/components/{path*}', handler: { directory: { path: './components' } } },
        { method: 'GET', path: '/css/{path*}', handler: { directory: { path: './css' } } },
        { method: 'GET', path: '/img/{path*}', handler: { directory: { path: './img' } } },
        { method: 'GET', path: '/js/{path*}', handler: { directory: { path: './js' } } },
        { method: 'GET', path: '/lib/{path*}', handler: { directory: { path: './lib' } } },
        { method: 'GET', path: '/upload/{path*}', handler: { directory: { path: './upload' } } },
        { method: 'GET', path: '/{path*}', handler: get404 }        
    ]);        

    // app data
    var app = server.pack.app = {
        upload: {
            dir: path.join(__dirname, '/public/upload'),
            url: '/upload/'
        }
    };
    
    // image resource handlers    
    function imageHandler(payload) {
    
        var doc = payload;
    
        if (payload.isMultipart) {
    
            var numFiles = parseInt(payload.numFiles, 10);
            // console.log('isMultipart, numFiles', numFiles);
            // for (var i = 0; i < numFiles; ++i) {
            //   console.log('file', i, payload['file' + i]);
            // }
            doc = payload.doc;
        
            if (numFiles > 0) {
                var file = payload['file0'];
                var destFile = app.upload.dir + '/' + file.name;
                var defer = Q.defer();
        
                fs.rename(file.path, destFile, function(error) {
                
                    if (error) return defer.reject(error);
                    doc.file.url = '/upload/' + file.name;
                    defer.resolve(doc);
                });
                return defer.promise;
            }
        }
        return Q.resolve(doc);
    };
    
    server.app.api.setHandler('create', 'Image', function(payload) {
    
        return imageHandler(payload);
    });
    
    server.app.api.setHandler('update', 'Image', function(payload) {
    
        return imageHandler(payload);
    });    
       
    // create upload dir
    var defer = Q.defer();
    fs.mkdir(app.upload.dir, function(error) {
    
        if (error && error.code !== 'EEXIST') {
        
            return defer.reject(error);
        }
        server.start(function(error) {
            
            if (error) {
                return defer.reject(error);
            }
            defer.resolve();
        });
        
    });
    return defer.promise;
}


module.exports = function setupServer(callback) {

    var options = {};

    options.hapi = {
        cors: {
            origin: ['*'],
            headers: ['X-Requested-With', 'Content-Type']
        },
        files: {
            relativeTo: path.join(__dirname, 'public')
        },
        location: 'http://' + host + ':' + port,
        payload: {
            maxBytes: 10 * 1024 * 1024 // 10MB
        },
        views: {
            engines: { 
                jade: 'jade'
            },
            path: path.join(__dirname, 'views'),
            layout: false,
            compileOptions: {
                pretty: true
            }
        }
    };
    
    options.cores = {
        server: {
            host: host,
            port: port,
            options: options.hapi  
        },
        db: {
            name: dbName
        },
        resourcesDir: path.join(__dirname, 'models'),
        api: {
            path: '/api',
            auth: false            
        }
    };
  
    cs.createServer(options.cores).then(function(server) {

        return cs.createApi(server, options.cores.api);
    }).then(function(server) {
            
        return init(server);
        
    }).then(function(success) {
            
            callback(
               console.log('\nHapi server started on %s\n',options.hapi.location)
            );
        }, function(error) {
        
            callback(error);
    });
};