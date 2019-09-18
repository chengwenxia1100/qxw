<template>
  <div class="paper_detail_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="title_container">
      <div class="title">第{{papermess.topic_number}}题</div>
      <div class="tit_con" v-html="paperConData.content"></div>
      <div class="ansow">
        <div class="tit">试题答案</div>
        <div class="con">
          <div class="con_list" v-html="paperConData.answer"></div>
        </div>
      </div>
      <div class="kao">
        <div class="tit">知识考点</div>
        <div class="con">
          <div class="con_list" v-for="(item, i) in paperConData.topic_point" :key="i" v-show="item">{{item}}</div>
        </div>
      </div>
    </div>
    
    <!-- <div class="paper">
      <div class="con" v-html="paperConData.content"></div>
    </div>
     <div class="paper">
      <div class="tit">试题答案</div>
      <div class="con">
        <div class="con_list">{{paperConData.answer}}</div>
      </div>
    </div> -->
    <!-- <div class="paper">
      <div class="tit">知识考点</div>
      <div class="con">
        <div class="con_list" v-for="(item, i) in paperConData.topic_point" :key="i" v-show="item">{{item}}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { PaperTopicInfo } from '@/api/analy';

export default {
  data () {
    return {
      paperConData: {},
      papermess: {},
      mess: {},
      loading: false, // 进入页面的弹窗
      id: ''
    }
  },
  onLoad (option) {
    this.loading = true;
    this.mess = option
    this.PaperTopicInfo()
  },
  computed: {
    topicId () {
      return this.mess.topic_id
    },
    id () {
      if (this.mess.id) { return this.mess.id }
    }
  },
  methods: {
    async PaperTopicInfo () {
      const data = await PaperTopicInfo({
        topic_id: this.topicId,
        id: this.id
      })
      this.loading = false
      this.paperConData = data
      this.papermess = data.topic_info
    },
  },
  onUnload () {
    this.paperConData = {}
  }
}
</script>
<style lang="less">
page {
  background:#fff;
}
</style>
<style lang="less" scoped>
.paper_detail_container {
  font-size:0.26rem;
  color:#666;
  .title_container {
    padding:0.4rem;
    .title {
      font-size:0.36rem;
      color:#333;
      padding:0.2rem 0;
    }
  }
  .ansow {
    padding-top:0.4rem;
  }

    .tit {
      color:#333;
      font-size:0.36rem;
    }
    .con {
      background:#fff;
      .con_list {
        padding:0.2rem;
      }
    }
  
}
</style>
