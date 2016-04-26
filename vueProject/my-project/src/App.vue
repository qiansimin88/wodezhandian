<template>
    <d></d>
    <input type="text" v-model='msg'>
    <div id="demo" v-demo:hello.a.b="msg"></div>
</template>

<script>
import Hello from './components/Hello.vue';
import d from './components/d.vue';
import Vue from 'vue';

Vue.directive('demo', {
  bind: function () {
    console.log('demo bound!')
  },
  update: function (value,old) {
    console.log(this);
    this.el.innerHTML =
      'name - '       + this.name + '<br>' +
      'expression - ' + this.expression + '<br>' +
      'argument - '   + this.arg + '<br>' +
      'modifiers - '  + JSON.stringify(this.modifiers) + '<br>' +
      'value - '      + value
  }
})


export default {
  data () {
    return {
       msg : 'hello'
    } 
  },
  components:{
    d,Hello
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  
}

#app {
  margin-top: -100px;
  max-width: 600px;
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
