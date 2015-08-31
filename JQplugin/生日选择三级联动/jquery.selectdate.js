/**
 * [三级联动的日期选择插件]
 * @Author   QSM
 * @DateTime 2015-08-31T17:26:57+0800
 * QQ:348867341
 * Demo ：http://www.liuband.com/mall.php/fang/apartment/info
 * @param    {[type]}                 require            [description]
 * @param    {[type]}                 exports            [description]
 * @param    {[type]}                 module){	return   function       ($){		$.fn.selectDate [description]
 * @param    {selectDate}             arg||{});				var initSelectDate [description]
 * @param    {[type]}                 arg                ||             {});			var           option        [description]
 * @return   {[type]}                                    [description]
 */
define(function (require,exports,module){
	return function ($){
		$.fn.selectDate = function (arg) {
			return $(this).each(function (i,o) {
				var defaultParam = $.extend({
					target : $(o)            //jquery插件形式就改变target
				},arg||{});

				var initSelectDate = new selectDate(defaultParam).init();  //启动
			});
		};

		function selectDate (arg) {	
			this.option = $.extend({
				target : $('.date'),				//外层的盒子
				yearBoxname : 'year',				//年的name
				monthBoxname : 'month',				
				dayBoxname:'day',
				rangeYear : 80
			},arg || {});

			var option = this.option;
			this.target = option.target;
			this.rangeYear = option.rangeYear;
			this.yearBox = this.target.find('select[name='+option.yearBoxname+']');
			this.monthBox = this.target.find('select[name='+option.monthBoxname+']');
			this.dayBox = this.target.find('select[name='+option.dayBoxname+']');
		};

		selectDate.prototype.init = function (){
			var optionHTMl = '';
				this.year = new Date().getFullYear();		//2015
				this.monthDayArray = [31,28,31,30,31,30,31,31,30,31,30,31];   //每月的天数  2月份的闰年是29天哦
			//year 
			for(var i = this.year;i>=(this.year - this.rangeYear);i--) {	
				optionHTMl+= '<option value="'+i+'">'+i+'</option>';
			};
			this.yearBox.append(optionHTMl);

			optionHTMl = '';

			//month
			for(var j= 1 ; j<=12;j++) {
				optionHTMl+='<option value="'+j+'">'+j+'</option>';
			}
			this.monthBox.append(optionHTMl);

			optionHTMl='';
			//day   因为每个月的天数是不同的  这次初始化显示1月的天数
			for(var k= 1 ; k<=this.monthDayArray[0];k++) {
				optionHTMl+='<option value="'+k+'">'+k+'</option>';
			}
			this.dayBox.append(optionHTMl);

			this.changeShow();
			return this;
		};

		selectDate.prototype.changeShow = function () {
			var _this = this;
			//年和月 切换  那么天数必须重置
			this.target.children('select[name='+this.option.yearBoxname+'],select[name='+this.option.monthBoxname+']').on('change',function () {
				_this.dayBox.html('');

				var chooseYear = _this.yearBox.find('option:selected').val(),		//选取选中的值
					chooseMonth = _this.monthBox.find('option:selected').val(),
					dayHTML = '';

					//下面给天数赋值
					if(_this.isRUNYEAR(chooseYear) && chooseMonth == 2) {   //是闰年并且选中的是2月   2月29天
						for(var i =1; i<= 29;i++) {
							dayHTML+= '<option value="'+i+'">'+i+'</option>';
						}; 
					}else {					//选择了其他的月份或者年份   所有的2月都是28天咯	
						for(var j=1;j<=_this.monthDayArray[chooseMonth-1];j++) {		//选择的月数就相当于上面数组当中相应的天的数组
							dayHTML+='<option value="'+j+'">'+j+'</option>';
						}
					}
					_this.dayBox.append(dayHTML);	
			});
		};

		//判断是否闰年
		selectDate.prototype.isRUNYEAR = function (year){
			return (year%4 == 0 &&  year%100 != 0) || (year%400==0);  
		};
		return selectDate;
	};	
});