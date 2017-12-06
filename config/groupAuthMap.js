var map = {
'public':[
'/favicon.ico',
'/users/login',
'/users/logout',
'/',
'/main',
'/news/addNews',
'/filterLog'
],
'admin':[
'/main',
'/reloadAuth',
'/news/mknews',
'/news/addNews',
'/news/delNews',
'/news/listNews',
'/gainInfo'
]	
};
for(var k in map){
	if(k=='version') continue;
	var tmap = {};
	for(var i=0;map[k].length && i<map[k].length;i++){
		tmap[map[k][i]]=true;
	}
	map[k] = tmap;
}
for(var k in map){
	if(k=='version') continue;
	if(k!="public"){
		map[k] = utils.mergeMap(map[k],map['public']);
	}
}
module.exports = map;