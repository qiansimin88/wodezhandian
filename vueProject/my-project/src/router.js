'use strict'
export default function (router) {
    router.map({
		 '/':{
       		 component: require('./components/home/home.vue')
   		 },
		 '/list':{
       		 component: require('./components/list/list.vue')
   		 }
	})
}