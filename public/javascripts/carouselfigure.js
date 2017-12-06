function CarouselFigure(){
	this.width = 0;
	this.height = 0;
	this.upOrDown = -1;//-1 stands for to left
	this.stepLen = 1;
	this.scrolltype = 1;//1 stands for continuously scroll, 2 stands for step
	this.picUl;
	this.dotUl;
	this.aLi;
	this.aDot;
	this.duration = 2000;
	this.timer = null;
	this.index =0;
	this.picLen=0;
	this.offsetTop = 0;//修正偏移量
	this.init = function(picUl,dotUl,scrolltype){
		var target = this;
		if(scrolltype && scrolltype==1){
		var aLi = picUl.getElementsByTagName('li');
		var aDot = dotUl.getElementsByTagName('li');
		this.picLen = aLi.length;
		picUl.innerHTML+=picUl.innerHTML;
		picUl.style.position = "absolute";
		picUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
		this.picUl = picUl;
		this.dotUl = dotUl;
		this.aLi = aLi;
		this.aDot = aDot;
		this.stepLen = aLi[0].offsetWidth;
		this.index =1;
		aDot[0].className = "current";
		for(var i=0;i<aDot.length;i++){
			aDot[i].index = i;
			aDot[i].onmouseenter = function(){
				clearInterval(target.timer);
				this.style.cursor = "pointer";
				picUl.style.left= -target.stepLen*this.index+'px';
				for(var i=0;i<aDot.length;i++){
					aDot[i].className = "";
				}
				this.className = "current";
				target.index = this.index;
			}
			aDot[i].onmouseleave = function(){
				this.style.cursor = "default";
				target.move(target);
			}
		}
			this.move(this);
		}else if(scrolltype && scrolltype==-1){
			picUl.innerHTML+=picUl.innerHTML;
			this.picUl = picUl;
			this.picUl.style.position = "absolute";
			this.duration = 50;
			picUl.onmouseenter = function(){
				clearInterval(target.timer);
			}
			picUl.onmouseleave = function(){
				target.scroll(target);
			}
			this.scroll(this);
		}
	}
	this.move = function(obj){
		obj.timer = setInterval(function(){
		if(obj.index<obj.picLen){
			obj.picUl.style.left = -obj.stepLen * obj.index+'px';
			for(var i=0;i<obj.picLen;i++){
				obj.aDot[i].className = "";
			}
			obj.aDot[obj.index].className = "current";
			obj.index++;
		}else{
			obj.picUl.style.left = 0+'px';
			for(var i=0;i<obj.picLen;i++){
				obj.aDot[i].className = "";
			}
			obj.aDot[0].className = "current";
			obj.index = 1;
		}
	},obj.duration);
}
	this.scroll = function(obj){
		obj.timer = setInterval(function(){
			if(obj.picUl.offsetTop<-obj.picUl.offsetHeight/2){
				obj.picUl.style.top=obj.offsetTop;
			}else{
				obj.picUl.style.top = obj.picUl.offsetTop-obj.stepLen+'px';
			}
		},obj.duration);
	}
}