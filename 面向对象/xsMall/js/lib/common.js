	//icon旋转控制
	$(document).ready(function(){
		
					
			(function(){
				
				var oRateLi = $('.nav-list>li');
				

				function showAnimate (callback) {

					oRateLi.each(function(i,o){
			
					$(o).css({
			
							transition : 'all .8s ease-out '+(0.5*10*i)/10+'s'
			
						});
			
					});
					
					return callback();

				};
				
				showAnimate(function(){
					
					setTimeout(function(){
						
						oRateLi.addClass('rotateY180');
						
					},200);
					
				});

			})();
		
		
	})
