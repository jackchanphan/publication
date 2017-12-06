//var map = require("../config/groupAuthMap")
var urlFilter={
	needRedirect:function(url){
		if(map['public'][url]){
			return false;
		}else{
			return true;
		}
	},
	hasUserAuth:function(user,url){
		var auths = user.auths;
		log(auths);
		if(auths[url]){
			return true;
		}else{
			return false;
		}
	}
}
module.exports = urlFilter;