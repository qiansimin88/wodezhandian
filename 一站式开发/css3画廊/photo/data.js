


var dataList ='片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
片名：糖妈你好<br/>\
呆萌蠢的女盆友\
<br/>\
<br/>\
'

var data = [];
var dataArr =  dataList.split('<br/><br/>');

	dataArr.forEach(function (o,i) {

		var nowData = o.split('<br/>');

		var pianming = nowData[0].replace('片名：','')

		data.push({

			img : i+'.jpg',
			title : pianming,
			desc : nowData[1]

		})

	});
