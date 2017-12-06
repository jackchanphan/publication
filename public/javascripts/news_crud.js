function delNews(id){
    ajax.post('/news/delNews',{newsid:id},function(e,r){
        console.log(e+r);
    });
}