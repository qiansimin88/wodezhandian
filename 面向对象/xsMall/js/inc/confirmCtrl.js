;(function(){
	
	var sBtn = $('.sub-btn'),
	
		isChoose = $('.isChoose'),   //checkbox
	
		username = $('.username'),
		
		idcard = $('.idcard'),
		
		getusername = $('.getusername'),
		
		phoneNum = $('.phoneNum'),
		
		provinceSele  = $('.province-sele'),  //省
		
		addr  =  $('.addr ') ;  //具体街道  
		
		window.msg = ['姓名不能为空', '机主姓名必须是汉字', '请输入合法的身份证号码', '身份证号码不能为空', '身份证号码不能为同一字符', '手机号码不能为空', '请输入合法有效的手机号码', '请填写完整的收货地址']
		
		
		sBtn.on('tap',function(e){
			
			e.preventDefault();
			
			alert(1)

		})

		
})()
