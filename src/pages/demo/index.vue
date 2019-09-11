<template>
<div>
  <password-layer
    :passwordtip = "passwordtip"
    :layerStatus = "layerStatus"
    @password="password"
  ></password-layer>
</div>
</template>

<script>
import passwordLayer from '@/components/layer/passwordLayer'

export default {
  components: {
      passwordLayer
  },
  data () {
    return {
      passwordtip: '请设置密码',
      layerStatus: false
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
 
</style>
