<template>
  <div>
    <div class="select" @click="sectionCon">
      {{section}}
      <img :src="downIcon" alt="">
    </div>
    <div class="selcetCon" v-if="conStatus">
      <ul>
        <li @click="select(1,'一')" :class="section == '一' ? 'bule' : ''">一</li>
        <li @click="select(2,'二')" :class="section == '二' ? 'bule' : ''">二</li>
        <li @click="select(3,'三')" :class="section == '三' ? 'bule' : ''">三</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      conStatus: false,
      section: '选择章节'
    }
  },
  computed: {
    downIcon () {
      return require('@/assets/svg/icon_down.png')
    }
  },
  methods: {
    sectionCon () {
      this.conStatus = !this.conStatus
    },
    select (id, name) {
      this.section = name
      this.conStatus = !this.conStatus
      this.$emit('section', id)
    }
  }
}
</script>

<style lang="less">
.bule {
  color: #1296db
}
.selcetCon {
  width:100%;
  background:#fff;
  position:fixed;
  top:1.8rem;
  left:0;
  ul {
    padding:0.2rem 0.3rem;
    li {
      padding:0.2rem 0;
      border-bottom:0.02rem #f2f2f2 solid;
    }
  }
}
</style>
