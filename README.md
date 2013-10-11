# Angular Hapi Couch

This is an example application that uses Angular.js, the node.js based web and API server Hapi and CouchDB for storage. It make heavy use of the cores-ng library created by [Till Reitemeyer] (https://github.com/skoni), but with architecture geared towards a future project I have in mind. It includes a single Users schema and supports basic CRUD operations. You can also load sample users into CouchDB from the home page.

I created this application to learn how the following components work together:

1. [Angular.js](http://angularjs.org/) - front-end framework (1.2.0-rc.2)
2. [Bootstrap](http://getbootstrap.com/) - css & layouts (3.0.0)
3. [Hapi.js](http://spumko.github.io/) - node.js based API and web server (1.10.0)
4. [CouchDB](http://couchdb.apache.org/) - storage 


In terms of connecting all this together, [Till Reitemeyer] (https://github.com/skoni) has already provided the beginnings of a workable framework, including:

1. [cores-server] (https://github.com/skoni/cores-server) - bootstrap for hapi server (0.1.3)
2. [cores-ng] (https://github.com/skoni/cores-ng) - angular.js cores layer
3. [cores-hapi] (https://github.com/skoni/cores-hapi) - hapi cores resource api (0.4.2)
4. [cores] (https://github.com/skoni/cores) - couchdb resource layer with validation (0.4.2)

Note: the above libraries appear to be very much under development and there is documentation yet.

## Prerequisites

1. CouchDB (port 5984)
2. NPM & Bower installed globally

## Installation

Clone the repository locally.

```
cd angular-hapi-couch
npm install
```
Note: you may need to run `sudo npm install`.

```
bower install
```

When prompted for the Bootstrap version, choose 2) ~3.x.x

## Database Setup

Create the database:

```
grunt db
```

To add test users, you can run the following grunt task. This will add 20 users to the CouchDB database. You can also do this later from the application home page.

```
grunt users
```

## Build and Run

Build the application (various tasks including compiling templates, jade and stylus files, combining the cores-ng files):

```
grunt
```
Start the web server:

```
grunt server
```

Browse to: [http://localhost:8080] (http://localhost:8080)

You can add a set of 20 test users from the home page by clicking the **Create Users** button. Note: this option will only be available if there are no users in the database.

## Watch

In development you can run the following to watch for changes to jade, stylus and templates:

```
grunt watch
```

Note: you will still need to stop and start your web server to see these changes in the browser. It just saves you having to manually recompile everything with `grunt` when your code changes.

TODO: setup watch on Hapi server.

## Screens

Screen captures of a few pages are available here:

 - [Screens] (https://github.com/iotaweb/angular-hapi-couch/wiki/Screens)

## Known Issues

This sample application is quite incomplete and is being refactored constantly to incorporate changes and new developments in the various **cores** libraries. The following are what I know to be incomplete or buggy:

 - No thoughts have been given to security yet, i.e. restricting actions via the API.
 - Pagination in Users page - no ability to navigate to pages directly. Also would be nice if pages were represented in the url path and could handle a page refresh, e.g. users/page/2 (maybe need to use `offset` instead of `startkey`?).
 - Create/edit forms show validation before record is dirty (still works, just unsightly IMO).
 - Incomplete support for input type validations, e.g. email.
 - I have attempted to convert most templates to Bootstrap 3, but have not tested all of these.
 - No tests (bad Rob...).
 
## Endnote

I am very much a beginner when it comes to node, angular.js, hapi.js and couchDB - so there are no doubt fundamental mistakes in the way I have approached things. This is very much a learning exercise for me.

A big thank you to Till for his work in this space - it is appreciated (well, at least by me :)