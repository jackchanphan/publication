function get(selector,obj){
	if(!obj){
		return document.querySelectorAll(selector);
	}else{
		return obj.querySelectorAll(selector);
	}
}
function getOne(selector,obj){
	if(!obj){
		return document.querySelector(selector);
	}else{
		return obj.querySelector(selector);
	}
}/*
function initLinks(){
	var aLi = get('a');
	var aLiLen = aLi.length;
	var tagP;
	for(var i=0;i<aLiLen;i++){
		if((tagP=aLi[i].querySelector('p'))!=undefined){
			aLi[i].hasTagP = true;
			aLi[i].tagP = aLi[i].querySelectorAll('p');
			for(var j=0;j<aLi[i].tagP.length;j++){
				aLi[i].tagP[j].oriColor = aLi[i].tagP[j].style.color;
			}
		}else{
			aLi[i].hasTagP = false;
		}
		aLi[i].onmouseover = (function(superfunc,obj){
			return function(){
				if(typeof(superfunc) == 'function'){
					superfunc();
				}
				obj.style.color='pink';
				if(obj.hasTagP){
					for(var i=0;i<obj.tagP.length;i++){
						obj.tagP[i].style.color = 'pink';
					}
				}
			}
		})(aLi[i].onmouseover,aLi[i]);
		aLi[i].onmouseout = (function(superfunc,obj,oriColor){
			return function(){
				if(typeof(superfunc) == 'function'){
					superfunc();
				}
				obj.style.color=oriColor;
				if(obj.hasTagP){
					for(var i=0;i<obj.tagP.length;i++){
						obj.tagP[i].style.color = obj.tagP[i].oriColor;
					}
				}
			}
		})(aLi[i].onmouseout,aLi[i],aLi[i].style.color);
	}
}
function initBtns(){
	var btns = get('.btn-more');
	for(var i=0;i<btns.length;i++){
		btns[i].oriBg = btns[i].style.background;
		btns[i].oriColor = btns[i].style.color;
		btns[i].onmouseenter = function(){
			this.style.background = "#DFDFDF";
			this.style.color = "#232323";
		}
		btns[i].onmouseleave = function(){
			this.style.background = this.oriBg;
			this.style.color = this.oriColor;
		}
	}
}
function initLogin(){
	var input = get(' .login-bar input');
	input[0].value = "用户名";
	input[1].value = "密码";
	input[0].onfocus = function(){
		if(this.value == "" || this.value == "用户名"){
			this.value = "";
		}
	}
	input[0].onblur = function(){
		if(this.value==""){
			this.value = "用户名";
		}
	}
	input[1].onfocus = function(){
		if(this.value == "" || this.value == "密码"){
			this.value = "";
		}
	}
	input[1].onblur = function(){
		if(this.value==""){
			this.value = "密码";
		}
	}
}
function initSearchBox(){
	var searchInput = getOne('.search-box input');
	searchInput.onfocus = function(){
		this.placeholder = "";
	}
	searchInput.onblur = function(){
		if(this.value == ""){
			this.placeholder = "搜索您感兴趣的咨讯...";
		}
	}
}
function initSectitleHead(){
	var secTitles = get('.sectitle-head');
	var fonts = get('.sectitle-mask');
	for(var i=0;i<secTitles.length;i++){
		secTitles[i].index = i;
		secTitles[i].oriBg = secTitles[i].style.background;
		fonts[i].oriBackgroundImage = fonts[i].style.backgroundImage;
		secTitles[i].onmouseenter = function(){
			this.style.cursor = "pointer";
			this.style.background = 'linear-gradient(0deg,#232323,#000)';
			fonts[this.index].style.backgroundImage = '-webkit-gradient(linear, 0 0, 0 bottom,from(#f6a12c), to(#FFF))';
		}
		secTitles[i].onmouseleave = function(){
			this.style.background = this.oriBg;
			fonts[this.index].style.backgroundImage = fonts[this.index].oriBackgroundImage;
		}
	}
}
function setPicHover(obj,a){
	return function(){
		obj.style.cursor = "pointer";
		a.style.opacity = '0.3';
			a.style.height="100%";
	}
}
function cancelPicHover(obj,a){
	return function(){
		obj.style.cursor = "default";
		a.style.opacity = '0.0';
			a.style.height="0";
	}
}
function appendA(obj){
			var a  = document.createElement('a');
			a.style.display = "block";
			a.style.width="100%";
			a.style.height="0";
			a.style.background = '#f8e1ea';
			a.style.opacity = '0';
			a.style.margin = '0';
			a.style.padding = '0';
			a.style.transition +=' all .5s ease';
			obj.appendChild(a);
			return a;
}
function initPicHover(){
	var arr = get('i');
	var a ;
	for(var i=0;i<arr.length;i++){
			a = appendA(arr[i]);
		arr[i].onmouseenter = setPicHover(arr[i],a);
		arr[i].onmouseleave = cancelPicHover(arr[i],a);
	}
	arr = get('div');
	for(var i=0;i<arr.length;i++){
		if(arr[i].className.startsWith('pic-') 
			|| arr[i].className.startsWith('img-')){
				a = appendA(arr[i]);
		arr[i].onmouseenter = setPicHover(arr[i],a);
		arr[i].onmouseleave = cancelPicHover(arr[i],a);
		}
	}
}
function initShowItem(){
	var showItems = get('.show-item');
	for(var i=0;i<showItems.length;i++){
				var subPic = showItems[i].querySelector('div');
				var subA = showItems[i].querySelectorAll('a')[1];
				var aP = subA.querySelectorAll('p');
				for(var j=0;j<aP.length;j++){
					aP[j].oriColor=aP[j].style.color;
				}
				subPic.subA = subA;
				subA.subPic = subPic;
				subA.onmouseenter = null;
				subA.onmouseleave = null;
				subPic.onmouseenter = null;
				subPic.onmouseleave = null;
		showItems[i].onmouseover = (function(pic,a){
			return function(){
					setPicHover(pic,pic.querySelector('a'))();
					var aP = a.querySelectorAll('p');
					for(var i=0;i<aP.length;i++){
						aP[i].style.color="pink";
					}
		};
	})(subPic,subA);
	showItems[i].onmouseout = (function(pic,a){
		return function(){
					cancelPicHover(pic,pic.querySelector('a'))();
					var aP = a.querySelectorAll('p');
					for(var i=0;i<aP.length;i++){
						aP[i].style.color=aP[i].oriColor;
					}}
	})(subPic,subA);
	}
}
function initMenu(){
	var menu = get('li',get('.menu ul')[0]);
	var contents = get('.menu .news-list');
	for(var i=0;i<menu.length;i++){
		menu[i].index = i;
		menu[i].onmouseover = function(){
			for(var i=0;i<menu.length;i++){
				menu[i].className = "";
				contents[i].style.display = "none";
			}
			this.className = "current";
			contents[this.index].style.display = "block";
		}

	}
}
function initNewsList(){
	var lists = get('.news-list');
	for(var i=0;i<lists.length;i++){
		var aLi = lists[i].querySelectorAll('li');
		var aLiLen = aLi.length;
		for(var j=0;j<aLiLen;j++){
			aLi[j].dataset.order = j+1;
		}
	}
}*/
function initCF(){
	var cf1 = new CarouselFigure();
	cf1.init(getOne('.carousel-figure-box1 .pics'),getOne('.carousel-figure-box1 .btns'),1);
	/*var cf2 = new CarouselFigure();
	cf2.init(getOne('.carousel-figure-box2 .pics'),getOne('.carousel-figure-box2 .btns'),1);
	var cf3 = new CarouselFigure();
	cf3.offsetTop = "-6px";
	cf3.init(getOne('.scroll-tips'),null,-1);*/
}/*
function initSubNav(){
	var aSubNavTitle = get('.nav-title');
	var aSubNav = get('.sub-nav');
	var timer=null;
	for(var i=0;i<aSubNavTitle.length;i++){
		var tmp = getOne('.sub-nav',aSubNavTitle[i].parentNode);
		aSubNavTitle[i].index = i;
		if(tmp!=undefined){
		tmp.index = i;
		aSubNavTitle[i].onmouseenter = (function(sn){
			return function(){
			this.style.cursor = 'pointer';
			getOne('p',this).style.color = 'pink';
			clearTimeout(timer);
			for(var i=0;i<aSubNav.length;i++){
				aSubNav[i].style.display = 'none';
				var tmpP;
				if((tmpP = getOne('p',aSubNavTitle[i]))!=undefined){
					tmpP.style.color = '#fff';
				}
			}
				sn.style.display = 'block';
				tmpP = getOne('p',aSubNavTitle[sn.index]);
				if(tmpP!=undefined){
					tmpP.style.color = 'pink';
				}
		}})(tmp);
		aSubNavTitle[i].onmouseleave = (function(sn){
			return function(){
			this.style.cursor = 'default';
			var target = this;
			timer = setTimeout(function(){
				sn.style.display = 'none';
				getOne('p',target).style.color = '#fff';
			}, 200);
		}})(tmp);
		tmp.onmouseenter = function(){
			if(this.dataset.subnav){
				clearTimeout(timer);
			}
		}
		tmp.onmouseleave = function(){
			var target = this;
			timer = setTimeout(function(){
				target.style.display = 'none';
				getOne('p',aSubNavTitle[target.index]).style.color = '#fff';
			}, 200);
		}
		}
	}
	
}
function initSideBar(){
	var sideShare = getOne('.side-share');
	var sideShareTab = getOne('.tab',sideShare);
	sideShare.style.transition = 'right .5s';
	sideShare.oriRight = sideShare.style.right;
	sideShareTab.onmouseenter = function(){
		sideShare.style.right = '0';
	}
	sideShare.onmouseleave= function(){
		sideShare.style.right = sideShare.oriRight;
	}
	var qqservice = getOne('.side-qq-service');
	var qqserviceTab = getOne('.tab',qqservice);
	qqservice.style.transition = 'left .5s';
	qqservice.oriLeft = qqservice.style.left;
	qqserviceTab.onmouseenter = function(){
		qqservice.style.left = '0';
	}
	qqservice.onmouseleave= function(){
		qqservice.style.left = qqservice.oriLeft;
	}
}*/
window.onload = function(){
	initCF();
	/*initLinks();
	initBtns();
	initLogin();
	initSearchBox();
	initSectitleHead();
	initPicHover();
	initShowItem();
	initMenu();
	initNewsList();
	initSubNav();
	initSideBar();*/
}



function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}