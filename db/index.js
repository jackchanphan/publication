var sqlite3 = require('sqlite3').verbose();
var __db;
function _db(){

	this.db = new sqlite3.cached.Database("chap06.sqlite3", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
		function(err){
			if (err){
				this.logger.log('FAIL on creating database ' + err);
			} 
		});
}
__db = new _db();
init_db();
function init_db(){
	var db = __db.db;
	db.get("select * from user",function(e,r){
		if(e){
			doinit();
		}
	});
	function doinit(){
		db.serialize(function() {
			db.run("CREATE TABLE IF NOT EXISTS news (id integer PRIMARY KEY autoincrement,title TEXT,author TEXT,date DATE,content TEXT,channel integer NOT NULL,path TEXT)");
			var stmt = db.prepare("INSERT INTO news VALUES (?,?,?,?,?,?,?)");
			stmt.run([null,"新闻测试页面","jack",new Date(),` 以下信息根据您的兴趣推荐  
穆加贝辞职是否会对中津关系造成影响?外交部回应
网易新闻 11-22 16:42 热点
水利部部署进一步规范小型病险水库除险加固项目管理工作
金融界 11-22 19:55
 
津巴布韦执政党推选前副总统姆南加古瓦为总统
`.toString(),"news",null]);
			stmt.run([null,"test2","jackchan",new Date(),"content","flfg",null]);
			stmt.finalize();
			db.run("CREATE TABLE IF NOT EXISTS user (uid integer PRIMARY KEY autoincrement,username TEXT NOT NULL"
				+",psw TEXT NOT NULL,grouptype TEXT NOT NULL)");
			db.run("INSERT INTO user VALUES (?,?,?,?)",[null,'admin','123','admin']);
      //stmt.run([null,'admin','123','admin']);
      //stmt.finalize();
  });
	}
}
function db(){
	return __db.db;
}
module.exports = db;

