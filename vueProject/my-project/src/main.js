import Vue from 'vue'
import layout from './App'
import Router from './router'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const state = {
//   count: 0
// }

// const mutations = {
//   INCREMENT (state) {
//     state.count++
//   }
// }

// const store = new Vuex.Store({
//   state ,
//   mutations
// })

// store.dispatch('INCREMENT');

// console.log(store.state) // -> 1


var router = new VueRouter({
	history : true
})

Router(router)

router.start(layout,'#app');
