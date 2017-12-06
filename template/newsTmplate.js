var newstmplate = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="/stylesheets/style.css">
	<title>#{title}</title>
	</head>
	<body>
	<div class="newsHead"><h1>重庆市XXX污水处理厂</h1></div>
	<div class="newsContainer">
		<h1 class="newstitle">#{title}</h1>
		<div class="info clearfix">
			<small class="author">#{author}</small>
			<small class="date">#{date}</small>
		</div>
		<p class="content">#{content}</p>
	</div>
	<div class="newsFooter">
		<div class="wrap">
		<ul class="clearfix">
				<li>联系电话：023-88888888</li>
				<li>邮箱：xx@xx.xx</li>
				<li>地址:重庆市xx区</li>
				<li>招聘</li>
				<li>关于我们</li>
			</ul>
		</div>
	</div>
	</body>
	</html>
`;
module.exports = newstmplate;