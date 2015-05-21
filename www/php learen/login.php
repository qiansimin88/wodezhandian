<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<script src="../aJax.js"></script>
<script>
window.onload=function()
{
	var oTxt=document.getElementById('txt1');
	var oTxt2=document.getElementById('txt2');
	var oBtn=document.getElementById('btn1');

	oBtn.onclick=function()
	{
			
		var url='login2.php?user='+oTxt.value+'&pass='+oTxt2.value;
		ajax(url,function(str)
		{
			if(str=='1')
			{
				alert(oTxt.value+'欢迎回来');	
			}
			else
			{
				alert('账号或密码有误');	
			}
		})	
	}
}
</script>
</head>

<body>
<input type="text" id="txt1"/>
<input type="password" id="txt2" />
<input type="button" id="btn1" value="提交"/>
</body>
</html>