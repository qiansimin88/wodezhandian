//组件hello world 

var Helloworld = React.createClass({

	render : function () {

		return <p>Hello , world </p>

	}

});

	React.render(

		<Helloworld/>,	
		document.body
	)
