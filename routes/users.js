var express = require('express');
var db = require('../db')();
var router = express.Router();
var User = require('../beans/userBean');
var Group = require('../beans/groupBean');


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login'});
});

router.get('/logout', function(req, res, next) {
	req.session.user = null;
	res.redirect("/");
});

router.post('/login',function(req,res,next){
	var username = req.body.username;
	var psw = req.body.psw;
	username = username.replace(/[\/|\%|\*]/g,'');
	username = username.substring(0,128);
	db.get('select * from user where username=\"'+username+'\"',function(err,row){
		if(err){
			log('e:'+err)
			throw new Error(err);
			return;
		}
		if(psw==row.psw){
			req.session.user = new User(row);
			log(req.session.user);
			res.redirect('/main');
		}else{
			res.render('login',{title:'Login',err:'用户名密码不匹配'});
		}
	});
});

module.exports = router;
