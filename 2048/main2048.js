// JavaScript Document 
var board =[];

$(function(){
	newGame();	
	
})

function newGame(){
	init();  //初始化
	generateOneNum();  //初始化两个数字  执行两次
	generateOneNum();	
};

function init() {		//初始化  把所有格子定位好  4列4行
	for(var i=0;i<4;i++) {
		for(var j=0;j<4;j++) {
			 var boxItem=$('#grid-cell-'+i+'-'+j)    //把所有格子都存到一个变量里面 方便使用
			 boxItem.css('top',getPositionTop(i));
			 boxItem.css('left',getPositionLeft(j));		
		};	
	};
	
	//生成二维数组  默认每个都是0
	
	for (var i=0;i<4;i++) {
		board[i]=[];
		for (var j=0;j<4;j++) {
			board[i][j]=0;
		}	
	};
	updateBoardView();
};

function updateBoardView() {
	$('.number-cell').remove();
	
	var html='';
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			
			str = 'number-cell-'+i+"-"+j;
			
			html+="<div class='number-cell' id="+str+"></div>";
		};	
	};
	
	
	$('#grid-container').append(html);

	for(var k=0;k<4;k++){
		for(var m=0;m<4;m++){
			
			var itemS = jQuery('#'+'number-cell-'+k+"-"+m);	
		
			if( board[k][m] == 0) {	
				itemS.css({width:'0px',height:'0px',left:getPositionLeft(k)+50+'px',top:getPositionTop(m)+50+'px'})	
			}else {
				//颜色
				itemS.css({width:'100px',height:'100px',left:getPositionLeft(m),top:getPositionTop(k),color:getNumberColor(board[k][m]),background:getNumbackground(board[k][m])});
				//赋值
				itemS.text(board[k][m]);		
			};
		}
	}
}

//生成数字
function generateOneNum () {
	if( noSpace(board) ) return false;
	
	//生成随机位置X Y  就是当这个位置的数字等于0 就生成
	var x=parseInt(Math.floor(Math.random()*4));
	var y=parseInt(Math.floor(Math.random()*4));
	
	//就是当这个位置的数字等于0 就生成
	while (!!'你咬我啊') {
		if(board[x][y] == 0) break;
		x=parseInt(Math.floor(Math.random()*4));
		y=parseInt(Math.floor(Math.random()*4));
	};
	//生成一个数字    判断0.5为临界值 各取50%  来赋值  2 或者  4
	var randomNum=Math.random() < 0.5 ? 2: 4;
	//在随机位置生成随机数字
	board[x][y]=randomNum;
	
	//动画函数    
	showNumWithAnimation (x,y,randomNum);
	return true;		
}

$(documnet).on('keydown',function(e){
	e=e.keycode;
	switch (e) {
		case 37 :  //left
			if(moveLeft()) {
				generateOneNumber();	
			}
			break;
		case 38 :  //up
			if(moveLeft()) {
				generateOneNumber();	
			}
			break;
		case 39 :  //right
			if(moveLeft()) {
				generateOneNumber();	
			}
			break;
		case 40 :  //down
			if(moveLeft()) {
				generateOneNumber();	
			}
			break;		
		default :  //default
			break;				
	}	
})	