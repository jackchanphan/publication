
function Logger(){
	var logger = require('morgan');
	var path = require('path');
	var fs = require('fs');
	var FileStreamRotator = require('file-stream-rotator');
	//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

	var logDirectory = path.resolve(__dirname);
	logDirectory = logDirectory.substring(0,logDirectory.lastIndexOf(path.sep))+path.sep+'log';
	// ensure log directory exists
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

	// create a rotating write stream
	var accessLogStream  = FileStreamRotator.getStream({
		date_format: 'YYYYMMDD',
		filename: path.join(logDirectory, 'access-%DATE%.log'),
		frequency: 'daily',
		verbose: false
	});
	this.getStream = function(){
		return this.g_stream;
	}

	var clfdate=function(dateTime) {
		var date = dateTime.getUTCDate()
		var hour = dateTime.getUTCHours()
		var mins = dateTime.getUTCMinutes()
		var secs = dateTime.getUTCSeconds()
		var year = dateTime.getUTCFullYear()
		var clfmonth = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var month = clfmonth[dateTime.getUTCMonth()]
		function pad2(num) {
			var str = String(num)

			return (str.length === 1 ? '0' : '')
			+ str
		}
		return pad2(date) + '/' + month + '/' + year
		+ ':' + pad2(hour) + ':' + pad2(mins) + ':' + pad2(secs)
		+ ' +0000'
	}
	return {logger:logger('combined', {stream: accessLogStream}),
	getStream:accessLogStream,fn:{clfdate:clfdate},log:function(obj){
		return function(str){
			console.log(str);
			obj.getStream.write('['+obj.fn['clfdate'](new Date())+'] - [fn logger] - ['+JSON.stringify(str)+']\n');
		};
	},filter:function(filename,date,fn){
		log('filter:'+filename);
		fs.readFile(filename,function(e,r){
			log(e);
			var rst = [];
			if(!e){
				r = r.toString();
				var reg = new RegExp('['+date+'].+','gm');
				log(reg);
				var r = r.match(reg);
				for(var i=0;r && i<r.length;i++){
					rst.push(r[i].split('-')[2]);
					log(r[i])
				}
			}
			fn(e,rst.join('\n'));
		})
	}};
}
module.exports = Logger;