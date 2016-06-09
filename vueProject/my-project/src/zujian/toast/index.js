import Vue from 'vue'

const Toast = Vue.extend(require('./toast.vue'))

//存放toast实例的  数组对象  其实是为了 缓存 不用每次都 new一次
let toastInstance = []

//得到require进来的实例
let getInstance = function () {
  //如果缓存了 就用这个
  if(!!toastInstance.length) {
      let instance = toastInstance[0]
      toastInstance.splice(0, 1)   //删除这个缓存
      return instance //返回实例
  }
  //没有缓存的话  直接new 
  return new Toast({
    el: document.createElement('div')   //new 的实例 必须要 绑定el 元素  
  })
}

/**
 * [缓存实例]
 * @param  {[typeof Object ]} instanceObj [用来缓存的实例对象]
 */
let catchInstance = function (instanceObj) {
  instanceObj && toastInstance.push(instanceObj)
}

/**
 * [toast]
 * @param  {[options]} options [toast的参数选项  有 iconClass message addClass position duration]
 * @return {[function]}         [返回的是函数对象 包含vue实例]
 */
export default function (options = {}) {  

  let message,duration,iconClass,addClass,position,timer,callback

  if(typeof options  == 'string') {  //大部分场景下 用户只需要填写message内容就好了  这样很快速
      //默认赋值即可
      [message, duration, iconClass, addClass, position] = [options, 3000, '', '', 'middle']
  }
  //如果用户传的是一个对象的话
  if(typeof options == 'object') {
     [message, duration, iconClass, addClass, position, callback] 
     = 
     [options.message, options.duration || 3000, options.iconClass || '', options.addClass || '', options.position || 'middle', options.closed || function () {}]
  }


  //生成实例
  let instance =  getInstance();
  //给实例 赋值
  instance.message = message
  instance.iconClass = iconClass
  instance.addClass = addClass
  instance.position = position

  //插入DOM  记住 这种插入 必须页面渲染完在进行 所以要用nextTick
  Vue.nextTick(() => {
    instance.$appendTo(document.body)   //插入body

    clearTimeout(timer)
    //删除实例
     timer = setTimeout(() => {
      //$remove 是从DOM中删除 实例 所以真正的new出来的toast的实例还是存在的
      //我们不需要每次 运行函数都new一次了 直接缓存起来就好了。 
      instance.$remove(callback)  //删除并执行回调函数
      //缓存实例
      catchInstance(instance)
     }, duration);
  })
}   