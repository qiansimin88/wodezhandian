//组件hello world 

var Helloworld = React.createClass({displayName: "Helloworld",

	render : function () {

		return React.createElement("p", null, "Hello , world ")

	}

});

	React.render(

		React.createElement(Helloworld, null),	
		document.body
	)
