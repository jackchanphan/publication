var express = require('express');
var logger = require('./logger')();
var log = logger.log(logger);
var router = express.Router();
var myrouter;
function _myrouter(){
	this.app = null;
	this.root = null;
	this.list = [];
	this.add = function(url,fn){
		this.list.push({url:url,fn:fn});
	}
	this.doList = function(){
		var list = this.list;
		for(var i=0,len=list.length;i<len;i++){
			if(list[i].url=='index'){
				this.app.use('/',list[i].fn);
				for(var j=0;list[i].fn.stack && j<list[i].fn.stack.length;j++){
					var t = list[i].fn.stack[j].regexp.toString().substring(4);
					if(t == "?$/i"){
						log('init paths : /');
					}else{
						t = t.substring(0,t.indexOf("\\/?$/i"));
						log('init paths : /'+t);
					}
				}
			}else{
				this.app.use('/'+list[i].url,list[i].fn);
				for(var j=0;list[i].fn.stack && j<list[i].fn.stack.length;j++){
					var t = list[i].fn.stack[j].regexp.toString().substring(4);
					if(t == "?$/i"){
						log('init paths : /'+list[i].url+'/');
					}else{
						t = t.substring(0,t.indexOf("\\/?$/i"));
						log('init paths : /'+list[i].url+'/'+t);
					}
				}
			}
		}
	}
}
var __myrouter = new _myrouter();

function scanRouteFiles(root){
	var fs = require("fs");
	var rst = {};
	var path = require("path");
	var filePath = path.resolve(root);

	function loadFileList(filePath){
		var files = fs.readdirSync(filePath);
		var list = [];
		list = list.concat(files);
		var tmpList = [];
		while(list.length>0){
			var tmpName = list.pop();
			var tmpPath = path.join(filePath,tmpName);
			var stat = fs.statSync(tmpPath);
			if(stat.isDirectory()){
				tmpList = tmpList.concat(loadFileList(tmpPath));
			}else{
				var tstr = path.resolve(tmpPath);
				tmpList.push(tstr.substring(tstr.indexOf("routes")+("routes"+path.sep).length));
			}
		}
		return tmpList;
	}
	var tmpList = loadFileList(filePath);

	function proc(rpath){
		rpath = rpath.replace(/\\/g,'/')
		var requirePath = '../routes/'+rpath.substring(0,rpath.indexOf(".js"));
		var tmpVarName = rpath.substring(0,rpath.indexOf(".js")).replace(/\//g,'__');
		eval(tmpVarName+" = require(\""+requirePath+"\")");
		rst[tmpVarName] = rpath.substring(0,rpath.lastIndexOf("\/"));
	}

	for(var i=0,len = tmpList.length;i<len;i++){
		proc(tmpList[i]);
	}
	return rst;
}

function myRouter(app,path){
	__myrouter.app = app;
	__myrouter.root = path;
	var rst = scanRouteFiles(path);
	for(var k in rst){
		var path = k.replace(/__/g,'\/');
		__myrouter.add(path,eval(k));
	}
	__myrouter.doList();
}
module.exports = myRouter;