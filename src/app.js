/**
 * Module dependencies.
 */
var express = require('express'),
  http = require('http'),
  path = require('path');  

/** Main app */  

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');  
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
  res.render('index');
});



// Server started
http.createServer(app).listen(app.get('port'), function(){
  console.log('info', 'Express server listening on port 3000');
});




