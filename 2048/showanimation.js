// JavaScript Document 
function showNumWithAnimation (x,y,randomNum) {
	var numCeil= $('#number-cell-'+x+'-'+y);
	
	numCeil.css({background:getNumbackground(randomNum),color:getNumberColor(randomNum)});
	numCeil.text(randomNum);
	
	numCeil.animate({
		width:100+'px',
		height:100+'px',
		left:getPositionLeft(y),
		top:getPositionTop(x)
	},300);
	
}