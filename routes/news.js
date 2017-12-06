var express = require('express');
var db = require('../db')();
var newsDao = require('../db/newsDao');
var router = express.Router();
var fs = require('fs');
var path = require("path");
var dirname = __dirname.substring(0,__dirname.lastIndexOf(path.sep));
log(dirname);
var htmlPath = path.resolve(path.join(dirname,'/public/html'));
log(htmlPath)
fs.mkdir(htmlPath,function(e){});
//var newstmplate = require('../template/newstmplate');
/* maka all news html files to /public/html */
function mkNewsHtml(news){
	var newstmplate = require('../template/newstmplate');
	if(!news.channel){return;}
	var channelpath = path.join(htmlPath,news.channel);
	fs.mkdir(channelpath,function(e){
		var date = new Date(news.date);
		var datestr = ''+date.getFullYear()+(date.getMonth()+1)+date.getDate();
		channelpath = path.join(channelpath,datestr);
		fs.exists(channelpath, function(exists){
			if(!exists){
				fs.mkdir(channelpath,function(e){
					if(e){log("news.js line 28:");log(e);return;}
					doMkNews(news);
				});
			}else{
				doMkNews(news);
			}
		});
		function doMkNews(news){
			var filename = path.join(channelpath,datestr+'_'+news.id+'.html');
			var html = newstmplate.replace(/#{title}/g,news.title).replace(/#{date}/g,(new Date(news.date)).toLocaleString()).replace(/#{author}/g,news.author).replace(/#{content}/g,news.content);
			fs.writeFile(filename, html, function(err) {
				if (err) {
					throw err;
				}
				newsDao.updatePath(filename,news.id,function(e){
					if(e){
						log('newsDao updatePath failed!');
						log(e);
					}
				});
			});
		}
	});
}
/* maka all news html files to /public/html end */
router.get('/mknews',function(req,res,next){
	var data = [];
	newsDao.listAll(function(err, ress) {
		data=data.concat(ress);
		for(var i=0;i<data.length;i++){
			mkNewsHtml(data[i]);
		}
		res.render('news', { title: 'NEWS',news: data });
	});
});
router.get('/listNews',function(req,res,next){
	var data = [];
	newsDao.listAll(function(err, ress) {
		data=data.concat(ress);
		res.render('news', { title: 'NEWS',news: data });
	});
});
router.get('/addNews',function(req,res,next){
	res.render('addNews',{title:'Add News'});

});
router.post('/delNews',function(req,res,next){
	var id = req.body.newsid;
	log('delNews.id='+id);
	newsDao.del(id);
	res.render('addNews',{title:'Add News'});

});
router.post('/addNews',function(req,res,next){
	var news = {};
	news.title = req.body.title || 'no_title';
	news.author = req.body.author || req.session.user.username;
	news.date = req.body.date || (new Date());
	news.content = req.body.content || 'no_content';
	news.channel = req.body.channel || 'default';
	news.path = null;
	newsDao.addOne(news,function(e){
		if(e){
			 log('news add failed');
			 res.render('error',{info:'news add failed'});
		}else{
			res.render('success',{info:'news add success'});
		}
	});
});

module.exports = router;