(function () {

	window.onload = function (){

		var music = document.getElementById('music'),

		audio = document.getElementsByTagName('audio')[0];

		//音乐暂停和播放
		music.addEventListener('touchstart',function(){

			if(audio.paused) {		//音频的属性

				audio.play();  //html5的
				this.className = 'play';
				this.style.animationPlayState = 'running';	//css3的动画暂停和播放属性  兼容太差
				this.style.webkitAnimationPlayState = 'running';	//兼容iphone6  安卓还是不可以

			}else {

				audio.pause();
				this.style.animationPlayState = 'paused';
				this.style.webkitAnimationPlayState = 'paused';	//兼容iphone6安卓还是不可以

			}

		},false)

		/////////////////////////////////////
		//音乐播放完 暂停归位   ended是audio的播放结束的事件 
		//监听音乐的结束事件
		/////////////////////////////////////
		audio.addEventListener('ended',function(){

			music.setAttribute('class','');   //放完就清除play标签

		},false)	

	}

})();