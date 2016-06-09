<!-- toast 弹框-->
<template>
    <div class="toast-pop {{addClassList}}" transition="mint-toast-pop" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
        <span class="mint-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }" v-text="message"></span>
    </div>
</template>
<script>
    export default {
      name: 'toast',
      props: {
        message: {
          type: String,     //弹框的描述文字
          default: '呵呵'
        },
        iconClass: {       //自定义icon的class
          type: String,
          default: ''
        },
        addClass: {      //用户自定义的class
          type: String,
          default: ''
        },
        position: {     //弹框的位置 top  middle bottom 
          type: String,
          default: 'middle'
        }
      },
      computed: {
        addClassList () {   //混合用户自定义的class和位置class 插入到html中
          const LIST = [] 
          switch(this.position) {
            case 'top':
              LIST.push('is-placetop')
              break
            case 'middle': 
              LIST.push('is-placemiddle')
              break
            case 'bottom':
              LIST.push('is-placebottom')
          }
          LIST.push(this.addClass)
          return LIST.join(' ')  //空格分开
        }
      },
      ready () {
      }
    }
</script>
<style lang='less'>
  .toast-pop  {
    position: fixed; max-width: 80%; border-radius: 5px; background: rgba(0,0,0,.7); color: #fff; box-sizing: border-box; text-align: center; z-index: 1000; 
  }
  .is-placebottom {
     bottom: 50px;
      left: 50%;
      transform: translate(-50%, 0);
  }
  .is-placemiddle {
     left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
  }
  .is-placetop {
      top: 50px;
      left: 50%;
      transform: translate(-50%, 0);
  }
  .mint-toast-pop {
     transition: opacity .3s linear;
  }
  .mint-toast-pop-enter,.mint-toast-pop-leave {
    opacity: 0;
  }
  .mint-toast-text {
      font-size: 14px;
      display: block;
      text-align: center;
  }
  .mint-toast-icon {
     display: block;
     text-align: center;
     font-size: 56px;
  }
</style>