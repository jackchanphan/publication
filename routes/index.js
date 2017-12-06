var express = require('express');
var db = require('../db')();
var path = require('path');
var router = express.Router();

router.get('/gainInfo', function(req, res, next) {
  var data = [];
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    stmt.run("Ipsum " + (Math.random()*1000)>>0);
    stmt.finalize();

    db.all("SELECT rowid AS id, info FROM lorem", function(err, ress) {
      data=data.concat(ress);
      res.render('index', { title: 'Express',data: data });
    });
  });
});

router.get('/', function(req, res, next) {
  res.redirect('/index.html');
});

router.get('/main', function(req, res, next) {
  var user = req.session.user;
  res.render('index', { title: 'Main',user:user });

});

router.get('/reloadAuth', function(req, res, next) {
  log(map);
  log("<<<<_____before");
  delete require.cache[require.resolve("../config/groupAuthMap")];
  global.map = require("../config/groupAuthMap");
  global.mapVersion++;
  log(map);
  log("<<<<_____after");
  res.render('index', { title: 'ReloadAuth Done',user:req.session.user });

});

router.get('/filterLog',function(req,res,next){
  logger.filter(path.join(rootdir,'log/access-20171128.log'),'28/Nov/2017:15:54:19 +0000',function(e,r){
    log('rst:'+r);
    res.end(r)
  })
});


module.exports = router;
