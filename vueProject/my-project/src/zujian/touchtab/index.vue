<template>
    <div class="tab-box">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'touchtab',
        data () {
            return {

            }
        },
        methods: {
            init () {
                this.setCssStyle()
            },
            setCssStyle () {
                // topDom： 组件的顶级元素
                // topDomList: 组件切换的子元素
                // screenWidth:  当前手机屏幕的 宽度
                let [topDom, topDomSonList, screenWidth] = [this.$el, [...this.$el.children], document.documentElement.clientWidth || document.body.clientWidth]
                
            }
        },
        ready () {
            this.init()
        }
    }
</script>
<style lang="less">
    .tab-box {
        width: 200%; height: 100%;
    }
    .tab-item {

    }
    .redbg {
        background: red;
    }
    .bluebg {
        background: blue;
    }
</style>