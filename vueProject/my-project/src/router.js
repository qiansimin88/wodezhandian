'use strict'
export default function (router) {
    router.map({
		 '/':{
       		 component: require('./components/home/home.vue')
   		 },
		 '/list':{
       		 component: require('./components/list/list.vue')
   		 },
		  
      '/scroll':{
   		   component: require('./components/scroll/index.vue')
   		 },
       'scrollbar': {
         component: require('./components/scrollbar/index.vue')
       },
       'toast': {
         component: require('./components/toast/index.vue')
       },
       'touchtab': {
        component: require('./components/touchtab/index.vue')
       }
	})
}