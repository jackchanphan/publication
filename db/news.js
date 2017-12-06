var db = require('./index.js')();
var news_db = {
	addOne : function(news,fn){
		try {
			db.run("INSERT INTO news VALUES(?,?,?,?,?,?,?)",[null,news.title,news.author,news.date,news.content,news.channel,null],fn);
		} catch(e) {
			log("db/news.js line 7:");
			log(news);
			log(e);
		}
		
	},
	listAll : function(fn){
		db.all("SELECT * FROM news", fn);
	},
	updatePath : function(filename,newsid,fn){
		db.run("update news set path=\""+filename+"\" where id="+newsid,fn);
	},
	del : function(ids,fn){
		if(ids.constructor!='[]'){
			db.run("delete from news where id="+ids,fn);
		}else{
			for(var i=0;i<ids.length;i++){
				db.run("delete from news where id="+ids[i],fn);
			}
		}
	}

}
module.exports = news_db;