 //javascript 
;(function() {
	
	$.fn.countDown=function(op) {

		var defaults = {
			
			time:'2100-12-9 10:10:10'
			
		};
		
		var op = $.extend(defaults,op || {});
		
		return this.each(function(i){
			
			var timeObj = op.time;
			
			if(timeObj.length != 19) {
				
				 alert('请填入正确的格式,小于10请补0');
				 
				 return;					
			}
			
			var _this = $(this);
			
			var timer =null;
			
			var futureObj = {
				//都是大写哦
				Y : parseInt(timeObj.substring(0,4)),
				M :	parseInt(timeObj.substring(5,7))-1,
				D : parseInt(timeObj.substring(8,10)),
				H : parseInt(timeObj.substring(11,13)),
				MI: parseInt(timeObj.substring(14,16)),
				S : parseInt(timeObj.substring(17))					
			};

			//设置未来时间
					
			var futureTime = new Date();
		
			futureTime.setFullYear(futureObj.Y);
			futureTime.setMonth(futureObj.M);
			futureTime.setDate(futureObj.D);
			futureTime.setHours(futureObj.H);
			futureTime.setMinutes(futureObj.MI);
			futureTime.setSeconds(futureObj.S);		
			
			
			function showTime () {

				//当前时间
				var nowTime = new Date();
				
				//未来的时间 和 当前的时间总共相差了多少秒
				var differenceSeconds = parseInt((futureTime.getTime() - nowTime.getTime())/1000);
	
				var oneHours = 3600,
				
					oneMin = 60;
				
				//相差的天
				var differenceD = Math.floor(differenceSeconds/(oneHours*24)) < 0 ?  0 : Math.floor(differenceSeconds/(oneHours*24)) < 10 ? '0' +Math.floor(differenceSeconds/(oneHours*24)) : Math.floor(differenceSeconds/(oneHours*24));
				
				//相差的时 			
				var differenceH = Math.floor((differenceSeconds/oneHours))%24 < 0 ? 0 : Math.floor((differenceSeconds/oneHours))%24 < 10 ? '0' +Math.floor((differenceSeconds/oneHours))%24 :Math.floor((differenceSeconds/oneHours))%24;
				
				//相差的分
				var differenceM = Math.floor(differenceSeconds/oneMin)%oneMin < 0 ? 0 :Math.floor(differenceSeconds/oneMin)%oneMin < 10 ? '0'+Math.floor(differenceSeconds/oneMin)%oneMin :Math.floor(differenceSeconds/oneMin)%oneMin;
				
				//相差的秒		
				var differenceS = differenceSeconds%60 < 10 ? '0'+differenceSeconds%60 :differenceSeconds%60;
				
				_this.text(differenceD+'天'+differenceH+'时'+differenceM+'分'+differenceS+'秒');
				
				//console.log(differenceD,differenceH,differenceM,differenceS)
				
			};
			
			showTime();
			
			//每秒都执行一次		
			timer = setInterval(showTime,1000);
							
		});
		
	};
		
})(jQuery)