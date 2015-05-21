$(function(){
	
	var tips = '<section class="mask"><div class="tips"></div></section>';
	
	var clientHeights  = $(document,'body').height();
	
	$('body').prepend(tips);
	
	$('.mask').height(clientHeights);

})
