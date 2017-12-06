var utils = {
	mergeMap : function(map1){
		for (var i=1;i<arguments.length;i++){
			map2=arguments[i];
			for (var k in map2){
				map1[k]=map2[k]
			}
		}
		return map1
	}
}
module.exports = utils;