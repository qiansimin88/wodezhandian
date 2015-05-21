//javascript document
//jquery-easing
jQuery.extend(jQuery.easing,{easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c}}),function(a){a.fn.soScrollTo=function(b){var c;b=a.extend({direction:"y",speed:800,easeType:"easeInOutExpo"},b||{}),c=a(this),c.click(function(){var d,c=a(this).attr("href");return c=a("#"!=c?c:"body"),c.length&&(d={t:c.offset().top||0,l:c.offset().left||0},"x"==b.direction?a("html,body").stop().animate({scrollLeft:d.l},b.speed,b.easeType):a("html,body").stop().animate({scrollTop:d.t},b.speed,b.easeType)),!1})}}(jQuery);
/* jquery.mousewheel */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});


//////////////////////////
//athor:qsm             //
//date:2015-3-8   献给妇女节 //
//address:魔都  朗阁留学      //
//////////////////////////

;(function ($) {

	function scrollPage(ele,arg) {

		this.config = $.extend({

			page : '.page',

			thumbCls : 'pageThumb-list'

		},arg || {});

		config = this.config;

		this.pageThumbClass= config.thumbCls;

		this.$ele = ele ;

		this.$page = $(config.page);


		//动画锁   为0 可以动画  为1在动画中 不允许动画
		this.lock = 0;
		// 当前索引
		this.now = 0;
		
	};


	scrollPage.prototype = {

		'constructor' :  scrollPage , 
		//初始化
		'init' : function () {

			var self = this;

				self.setBoxHeight();

				self.createThumb();

				self.clickThumb();

		},

		//设置box的高度
		'setBoxHeight' : function () {

			var windowH = $(window).outerHeight(true);

			this.$ele.height(windowH);
			this.$page.height(windowH);

		},

		//动态创建翻页的点
		'createThumb': function () {

			var self = this,

				pageThumb = '<div class="pageThumb">',

				len = self.$page.length;

			for(var i=0;i<len;i++) {

				pageThumb+='<span class='+self.pageThumbClass+'></span>';

			};

			pageThumb+= '</div>';

			self.$ele.append(pageThumb);

			//创建对象新属性
			self.$pageThumbList = $('.'+self.pageThumbClass);

		},

		//点击翻页的点

		'clickThumb' : function () {

			var self = this;

			this.$pageThumbList.on('click',function () {


				var ix = $(this).index();

				self.ThumbTab(ix);

			});

		},


		//翻页的点的效果

		'ThumbTab' : function (i) {

			this.$pageThumbList.removeClass('now').eq(i).addClass('now');

		}



	};

	$.fn.scrollPgae = function (arg) {

		this.each(function (i,o) {

			var _this = $(this);

			var scrollPageInit = new scrollPage(_this,arg).init();

			_this.data('scrollPageInit',scrollPageInit);

			return this;

		})	

	};

})(jQuery);