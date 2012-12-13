
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , main = require('./controllers/main')
  , preset = require('./controllers/presets')
  , api = require('./controllers/api')
  , mongoose = require('mongoose')
  , app = express();

//MongoDB
mongoose.connect('mongodb://127.0.0.1/SofDB');

mongoose.connection.on('open', function() {
   console.log('Connected to Mongoose');
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', main.index);
app.get('/preset/:sn', preset.index);
app.get('/api/preset/:sn', api.getPreset);
//debug only
app.get('/api/initDb', api.initDb);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
