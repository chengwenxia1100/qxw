<template>
  <div class="paper_detail_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="paper">
      <div class="tit">试题内容</div>
      <div class="con" v-html="paperConData.content"></div>
    </div>
     <div class="paper">
      <div class="tit">试题答案</div>
      <div class="con">
        <div class="con_list">{{paperConData.answer}}</div>
      </div>
    </div>
     <div class="paper">
      <div class="tit">知识考点</div>
      <div class="con">
        <div class="con_list" v-for="(item, i) in paperConData.topic_point" :key="i" v-show="item">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { PaperTopicInfo } from '@/api/analy';

export default {
  data () {
    return {
      paperConData: {},
      loading: false, // 进入页面的弹窗
      id: ''
    }
  },
  computed: {
    topicId () {
      return this.$root.$mp.query.topic_id
    },
    id () {
      if (this.$root.$mp.query.id) { return this.$root.$mp.query.id }
    }
  },
  onLoad () {
    this.loading = true;
    this.PaperTopicInfo()
  },
  methods: {
    async PaperTopicInfo () {
      const data = await PaperTopicInfo({
        topic_id: this.topicId,
        id: this.id
      })
      this.loading = false
      this.paperConData = data
    },
  }
}
</script>

<style lang="less">
.paper_detail_container {
  font-size:0.26rem;
  .paper {
    .tit {
      padding:0.2rem;
      border-left:0.1rem #666 solid;
    }
    .con {
      background:#fff;
      .con_list {
        padding:0.2rem;
      }
    }
  }
}
</style>
