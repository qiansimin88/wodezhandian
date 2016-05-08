import Vue from 'vue'
import 	Vuex from 'vuex'

Vue.use(Vuex);

//启动时的状态
const state = {
	//Todo 
	count : 0
}

//mutations函数 都是一些改变状态的方法集合
const mutations = {
	//todo 设置
	INCREMENT (state,amount) {
		state.count = state.count+amount
	}	
}

// 通过 new Vuex.Store 结合初始 state 和 mutations，创建 store
// 这个 store 将和我们的 vue 应用链接起来
export default new Vuex.Store({
	state,
	mutations
})