// JavaScript Document
function getPositionTop (i) {
	return 20+120*i
};

function getPositionLeft (j) {
	return 20+120*j;
};

//背景色  
function getNumbackground (n){
	switch (n) {
		 case 2 : return '#eee4da';break;
		 case 4 : return '#ede0c8';break;
		 case 8 : return '#f2b179';break;
		 case 16 : return '#f59563';break;
		 case 32 : return '#f67c5f';break;
		 case 64 : return '#f65e3b';break;
		 case 128 : return '#edcf72';break;
		 case 256 : return '#edcc61';break;
		 case 512 : return '#9c0';break;
		 case 1024 : return '#33b5e5';break;
		 case 2048 : return '#09c';break;
		 case 4096 : return '#a6c';break;	
		 case 8192 : return '#93c';break;	
	}
	return 'black';	
}

function getNumberColor (n) {
	if (n <=4) {
		return '#776e65'	
	}
	return '#fff';	
}

//是否还有空间
function noSpace (board) {
	for (var i=0;i<4;i++) {
		for(var j=0;j<4;j++) {
			if(board[i][j] == 0 ){
				return false	
			}	
		}	
	}
	return true;
}

//能否向左移动
function isCanMoveLeft(board) {
	for(var i=0;i<4;i++) {
		for (var j=1;j<4;j++) {
			if(board[i][j-1] != 0 || board[i][j-1] ==board[i][j]) return true;	
		}	
	}
	return false;			
}

function moveLeft() {
		
}
