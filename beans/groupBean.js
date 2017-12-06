
class Group{
	constructor(type){
		this.type = type;
		this.auths = map[type];
	}
	getAuth(){
		return this.auths;
	}
}

module.exports = Group;