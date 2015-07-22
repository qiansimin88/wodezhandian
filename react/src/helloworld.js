//组件hello world 


var style = {
	color: 'red',
	border : '1px solid #000'
}

var Helloworld = React.createClass({displayName: "Helloworld",

	render : function () {

		return React.createElement("p", null, "Hello , world ")

	}

});

	React.render(
		//引用样式
		React.createElement("div", {style: style}, React.createElement(Helloworld, null)),	
		document.body
	)
