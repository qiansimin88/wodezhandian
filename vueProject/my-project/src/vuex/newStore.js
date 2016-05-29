import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//状态state  必须是state其他名字不可以
const state = {
	count : 10,
	run : false,
	timer: null
} 

const mutations = {
	['CUST_DOWN'] (state) {
		state.run = true 
		state.timer = setInterval(() => {
			state.count -- 
			if(state.count < 1) {
				mutations.STOP(state)
			}
		},1000);
	},
	['STOP'] (state) {
		clearInterval(state.timer)
		state.run = false 
	}
}

export default new Vuex.Store({
	state,
	mutations
})