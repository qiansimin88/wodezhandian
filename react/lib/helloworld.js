//组件hello world 


var style = {
	color: 'red',
	border : '1px solid #000'
}

var Helloworld = React.createClass({

	render : function () {

		return <p>Hello , world </p>

	}

});

	React.render(
		//引用样式
		<div style={style}><Helloworld/></div>,	
		document.body
	)
