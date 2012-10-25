
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

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

app.get('/', routes.index);
app.get('/users', user.list);

// temporary site model with presets and users tables, for now no authentication
var presets = [
    {
      id : 1,
      name : 'preset',
      pattern : [1,2,3,4,5],
      //synthConfig : {},
      userId : 1,
      descr : 'A very cool preset'
    }
]
var users = [
  {
    id : 1,
    name : 'admin',
    email: 'admin@sol.pl'
  }
]

//
// those functions just represent a basic prototype of rest API, not complete in any way
//

// get all presets
app.get('/presets', function(req, res) {
    res.send(presets);
});

// get preset by id
app.get('/presets/:id', function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    if (!presets[indx]) {
        res.send('There is no preset with id of ' + req.params.id);
    } else {
        res.send(presets[indx]);
    }
});

//  get user by id; for tests only, not safe in real world
app.get('/users/:id', function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    if (!users[indx]) {
        res.send('There is no user with id of ' + req.params.id);
    } else {
        res.send(users[indx]);
    }
});

// get presets by user; /presets/user/:id or /user/:id/presets?
app.get('/presets/user/:id', function(req, res) {
    var userId = parseInt(req.params.id);
    if (!users[userId-1]) {
        res.send('There is no presets made by user with id of ' + req.params.id);
    } else {
        res.send(presets.filter(function (p) { return p.userId === userId}));
    }
});

// add a preset, for now in the same way as in the example - by form
app.post('/presets/add', function(req, res) {
    var indx = presets.length + 1;
    presets[presets.length] =
        { id : indx,
        name : req.body.presetName,
        pattern : req.body.presetPattern,
        descr : req.body.presetDesc,
        userId : req.body.presetUserId };

    console.log(presets[indx-1]);
    res.send('preset ' + req.body.presetname + ' added with id ' + indx);
});

//add a user
app.post('/user/add', function(req, res) {
    var indx = users.length + 1;
    users[users.length] =
        { id : indx,
        name : req.body.userName,
        pattern : req.body.userEmail,
      };

    console.log(users[indx-1]);
    res.send('user ' + req.body.presetname + ' added with id ' + indx);
});

// delete a preset
app.del('/presets/:id/delete', function(req,res) {
    var indx = req.params.id - 1;
    delete presets[indx];
    console.log('deleted ' + req.params.id);
    res.send('deleted ' + req.params.id);
});

// delete a user
app.del('/user/:id/delete', function(req,res) {
    var indx = req.params.id - 1;
    delete user[indx];
    console.log('deleted user ' + req.params.id);
    // maybe lets send some emoticons in the rest response additionally?:]
    res.send('deleted user ' + req.params.id);
});

// update/edit a preset
app.put('/presets/:id/update', function(req,res) {
    var indx = parseInt(req.params.id) - 1;
    presets[indx] =
        { id : indx,
        name : req.body.presetName,
        pattern : req.body.presetPattern,
        descr : req.body.presetDesc,
        userId : presets[indx].userId };
    console.log(presets[indx]);
    res.send ('Updated preset' + req.params.id);
});

// update/edit a user
app.put('/users/:id/update', function(req,res) {
    var indx = parseInt(req.params.id) - 1;
    users[indx] =
      { id : indx,
        name : req.body.userName,
        email : req.body.userEmail,
      };
    console.log(users[indx]);
    res.send ('Updated user ' + req.params.id);
});

//maybe additionaly methods:
// - delete presets by user,
// - add anonymous preset,
// - get featured presets
// - search preset/user by name/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
