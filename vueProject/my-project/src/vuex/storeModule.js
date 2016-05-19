export default {
	state : {
		count : 60,
		run : false,
		customerMobile: '',
		defaultCount:60
	},
	custDown () {
		this.state.run = true 
		this.timer = setInterval(() => {
			this.state.count -- 
			if(this.state.count < 1) {
				this.stop()
			}
			console.log(this.state.count);
		},1000)
	},
	stop () {
		clearInterval(this.timer)
		this.state.run = false 
		this.state.count = 60 
	}
}