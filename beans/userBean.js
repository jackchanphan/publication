var Group = require('./groupBean')
class User{
	constructor(user){
		this.username=user.username;
		this.psw = user.psw;
		this.auths = {};
		log('user.group:')
		log(user.group)
		if(user.group){
			this.group = new Group(user.group.type)
		}else{
		this.group = new Group(user.grouptype);
		}
		if(this.group){
			this.auths=utils.mergeMap(this.auths , this.group.getAuth());
		}
		this.auths=utils.mergeMap(this.auths , map['user_'+this.username]?map['user_'+this.username]:{});
		this.authsVersion = mapVersion;
		//this.auths = this.auths.concat(map['user_'+this.username]?map['user_'+this.username]:[]);
		/*var tmpMap = {};
		for(var i=0,pAuths = this.auths,len=this.auths.length;i<len;i++){
			tmpMap[pAuths[i]]=true;
		}
		this.authsMap = tmpMap;*/
	}
	getUserName(){return this.username;}
	setUserName(userName){this.userName = userName;}
	getPsw(){return this.psw;}
	setPsw(psw){this.psw = psw;}
	getGroup(){return this.group;}
	setGroup(group){this.group = group;}
	getAuths(){return this.auths;}
	setAuths(auth){this.auths = this.auths.concat(auth);}
}
module.exports = User;