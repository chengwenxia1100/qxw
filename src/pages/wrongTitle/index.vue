<template>
  <div class="user_wrongTitle">
    user_wrongTitle
  </div>
</template>

<script>
import { getOrderList } from './wrongtit.api'

export default {
  data () {
    return {
    }
  },
  mounted () {
    this.getOrderListData()
  },
  methods: {
    async getOrderListData () {
      const data = await getOrderList({
        current: 1,
        size: 12,
        status: 3,
        userId: 82
      })
      console.log(data)
    }
  }
}
</script>

<style lang="less">

</style>
