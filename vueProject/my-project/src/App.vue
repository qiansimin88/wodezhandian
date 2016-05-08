<template>
  <!-- 加个顶层不会导致成为片段实例   -->
  <div id="top">
    <!--监听组件的事件  由子组件的dispatch来触发-->
    <layout-header :header="headerway"></layout-header>
     <!-- 路由外链 -->
    <router-view transition="expand"></router-view>
    
    <layout-dock></layout-dock>
  </div>
</template>

<script>
import header from "./components/header"
import dock from './components/dock'
//状态机
import store from './vuex/store'

export default {
  // 在根组件加入 store，让它的子组件和 store 连接
  store ,
  data () {
    return {
       msg : 'hello',
       headerway : null
    } 
  },
  components : {
    "layout-header" : header,
    'layout-dock' : dock
  },
  //当前实例绑定的方法
  events : {
    headerway : function (got) {
        this.headerway = got;
    }
  }

}
</script>

<style>
html {
  height: 100%;
}

</style>
