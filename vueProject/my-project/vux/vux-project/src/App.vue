<template>
 <div>
   <search placeholder='你好' autoFixed=false value="呵呵"></search>
  </div>
</template>

<script>
import Group from 'vux/components/group'
import search from 'vux/components/search'
export default {
  components: {
    Group,
    search
  }
}
</script>

<style>
@import '~vux/vux.css';
</style>
