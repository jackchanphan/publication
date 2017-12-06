var express = require('express');
global.path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
global.utils = require('./utils/utils');
global.map = require('./config/groupAuthMap');
global.mapVersion = 0;

var myRouter = require('./utils/myRouter');
var loggerUtil = require('./utils/logger');
var filter = require('./utils/urlFilter');
var User = require('./beans/userBean');
var Group = require('./beans/groupBean');
global.logger = new loggerUtil();
global.log = logger.log(logger);
var app = express();
global.rootdir = __dirname;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger.logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({  
  resave: true, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored  
  secret: 'love'  
}));  

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
  if (!req.session.user) {  
    if(filter.needRedirect(req.url)){
      res.redirect('/users/login');  
    }else{
      next();
    }
  } else if (req.session.user) {  
    if(req.session.user.authsVersion!=mapVersion){
      log("user before update:")
      log(req.session.user)
      req.session.user = new User(req.session.user);
      log('user updated:');
      log(JSON.stringify(req.session.user));
    }
    if(filter.hasUserAuth(req.session.user,req.url)){
      next();
    }else{
      log(req.session.user.username+' has no auth to access '+req.url);
      res.redirect('/');
    } 
  }  
});

myRouter(app,path.join(__dirname, 'routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  log(req.url);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
