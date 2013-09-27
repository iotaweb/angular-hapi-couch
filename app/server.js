var
    coresServer     = require('cores-server'),
    fs              = require('fs'),
    jade            = require('jade'),
    nano            = require('nano')('http://localhost:5984'), 
    path            = require('path');
    
var 
    dbName          = 'angular-hapi-couch';     
    
function configureServer(server, callback) {

    server.on('response', function(req) {
    
        console.log(req.method, req.path, req.raw.res.statusCode);
    });

    server.on('internalError', function(req, error) {
    
        console.log('ERROR', error);
    });

    // listen on pack events to get plugin log events as well 
    server.pack.events.on('log', function(e) {
    
        console.log('-- log', e.tags, e.data);
    });
    
    // Define the route handlers

    var getIndex = function (request) {
          
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
            request.reply.view(partial); 
        }
           
    }; 
    
    var populateUsers = function (request) {
  
        var self = this;          
        var db = nano.use(dbName);            
        var users = require('../test/fixtures/users.json');        
    
        // add date for testing
        db.bulk(users, function (err, body) {   
            if (err) {
                console.log('ERROR', err);
            } else {
                 self.reply.redirect('/users'); 
            }           
        }); 
    };

    // routes
    server.route([
        // Routes with partials (pages)
        { method: 'GET', path: '/',                     handler: getIndex },       
        { method: 'GET', path: '/users',                handler: getIndex }, 
        { method: 'GET', path: '/users/populate',       handler: populateUsers }, 
        { method: 'GET', path: '/user/{path*}',         handler: getIndex },              
        { method: 'GET', path: '/partials/{path*}',     handler: getPartial }, 
        
        // Routes for static resources, e.g. bower components, css, img, js, libs
        { method: 'GET', path: '/components/{path*}',   handler: { directory: { path: './components' } } },
        { method: 'GET', path: '/css/{path*}',          handler: { directory: { path: './css' } } },
        { method: 'GET', path: '/img/{path*}',          handler: { directory: { path: './img' } } },
        { method: 'GET', path: '/js/{path*}',           handler: { directory: { path: './js' } } },
        { method: 'GET', path: '/lib/{path*}',          handler: { directory: { path: './lib' } } },
        { method: 'GET', path: '/upload/{path*}',       handler: { directory: { path: './upload' } } },

        // All remaining routes - redirect to index
        { method: 'GET', path: '/{path*}',              handler: get404 }
    ]);    

    // app data
    var app = server.pack.app = {
        upload: {
            dir: path.join(__dirname, '/public/upload'),
            url: '/test/public/upload/'
        }
    };

    // create upload dir
    fs.mkdir(app.upload.dir, function(err) {
        if (err && err.code !== 'EEXIST') {
            return callback(err);
        }
        server.start(callback);
    });
}


module.exports = function setupServer(callback) {

    var host = 'localhost';
    var port = 8080;

    // Hapi options
    var options = {
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
  
    coresServer({
        server: {
            host: host,
            port: port,
            options: options  
        },
        db: {
            name: 'angular-hapi-couch'
        },
        resourcesDir: __dirname + '/models',
        apiPath: '/cores'
    }).then(
        function(server) {

            configureServer(server, callback);
        }, function(err) {
    
            callback(err);
        }
    );
};