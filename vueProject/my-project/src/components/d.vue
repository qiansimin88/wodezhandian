<template>

  <div id="wrapper">
        <ul>
            <li v-for="i in a" v-text="i"></li>
        <a href="javascript:void(0);" v-on:touchstart="add" class="btn">点击</a>

        </ul>
  </div>
  
</template>
<style>
* {margin:0;padding:0;}
  #wrapper {
    width: 800px;height: 500px;border: 1px solid #000;overflow: hidden;margin:0 auto;font-size: 14px;
  }

   li {height: 30px;border:1px solid red;}
  .btn {display: block;width:100%;height: 40px;background: green;text-align: center;}
</style>
<script>
import iScroll from 'iscroll';
export default {
  data () {
    return {
      a : [],
      s:10,
      is : null
    }
  },
  methods : {
      hehe () {
        alert(21)
      },
      setDate () {
          var a = 0,
              b = []
          for(;a<3;a++) {
              this.a.push(a)
          }
      },
      add () {
        var b = [];
        var niw = this.a;
          for (var i=this.s ; i<this.s+10;i++) {
              b.push(i)
          };
          this.s = i;
        this.a = niw.concat(b);
        this.$nextTick(function (){
          this.is.refresh()
        })
      }
  },
  ready () {
    this.setDate();
    this.$nextTick(function () {
      var myscroll=new iScroll("#wrapper",{
        checkDOMChanges:true
      });
      this.is = myscroll;
    })
  }
}
</script>
