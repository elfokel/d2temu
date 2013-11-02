/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */

(function () {
	'use strict';

    var http = require('http'),
        express = require('express'),
        path = require('path'),
        app = express(),
        port = process.env.PORT || 5000,
        Client = require('ftp'),
        config = require('./d2t.config.json');



    //configure the express app
    app.configure(function () {
        app.set('views', __dirname + '/views');
        app.engine('html', require('ejs').renderFile);
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(app.router);
    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });

    //Routes:
    app.get('/', function (req, res) {
        res.render('index.html');
    });

    app.get('/getDirectory', function (req, res) {
        // res.send(JSON.stringify({folder : "this is a folder"}));
        var c = new Client();
        var fileList = [];
        var i = 0;
          c.on('ready', function() {
            c.list("roms",function(err, list) {
              if (err) throw err;
              for (i = 0; i < list.length; i++) {
                fileList.push({
                    name: list[i].name,
                    size: list[i].size,
                    date: list[i].date

                });
              }
              res.send(JSON.stringify(fileList));
              c.end();
            });
          });
          // connect to localhost:21 as anonymous
          c.connect(config);
    });

    app.get('/getDirectorygba', function (req, res) {
        // res.send(JSON.stringify({folder : "this is a folder"}));
        var c = new Client();
        var fileList = [];
        var i = 0;
          c.on('ready', function() {
            c.list("roms/gba",function(err, list) {
              if (err) throw err;
              for (i = 0; i < list.length; i++) {
                fileList.push({
                    name: list[i].name,
                    size: list[i].size,
                    date: list[i].date

                });
              }
              res.send(JSON.stringify(fileList));
              c.end();
            });
          });
          // connect to localhost:21 as anonymous
          c.connect(config);
    });

    app.get('*', function (req, res) {
        res.render('404.html');
    });


    //Start the server:
    var server = http.createServer(app).listen(port, function () {
        console.log("express server listening on port " + port);
    });
}());