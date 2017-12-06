if (typeof String.prototype.startsWith != 'function') { 
    String.prototype.startsWith = function(suffix) {  
        return this.indexOf(suffix) > -1; 
    }
}

var ajax = {
    ajax_base:function(method,url,data,fn){
        var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open(method,url,true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && xhr.status==200){
                fn(null,xhr.responseText);
            }else if(xhr.readyState==4 && xhr.status!=200){
                fn(xhr.status,xhr.responseText);
            }
        }
        if(method=='POST'){
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            var sendstr = '';
            for(var k in data){
                sendstr+=k+'='+JSON.stringify(data[k])+'&';
            }
            sendstr = sendstr.substring(0,sendstr.length-1);
            console.log(sendstr);
            xhr.send(sendstr);
        }else{
            xhr.send();
        }
    },
    get:function(url,fn){
        this.ajax_base('GET',url,null,fn);
    }  ,
    post:function(url,data,fn){
        this.ajax_base('POST',url,data,fn);
    }  

};