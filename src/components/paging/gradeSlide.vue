<template>
  <div>
    <div class="change" @click="showCon">
      <img :src="changeIcon" alt="">
      {{grade}}
    </div>
    <div class="selcetCon" v-if="conStatus">
      <ul>
        <li @click="select(7,'初一')" :class="grade == '初一' ? 'bule' : ''">初一</li>
        <li @click="select(2,'初二')" :class="grade == '初二' ? 'bule' : ''">初二</li>
        <li @click="select(3,'初三')" :class="grade == '初三' ? 'bule' : ''">初三</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      grade: '初一',
      gradeId: 7,
      conStatus: false
    }
  },
  computed: {
    changeIcon () {
      return require('@/assets/svg/icon_change.png')
    }
  },
  methods: {
    showCon () {
      this.conStatus = !this.conStatus
    },
    select (id, name) {
      this.grade = name
      this.gradeId = id
      this.conStatus = !this.conStatus
      this.$emit('grade', gradeId)
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
  z-index:99;
  background:rgba(255, 255, 255, 1);
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