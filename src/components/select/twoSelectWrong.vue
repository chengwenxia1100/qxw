<template>
  <div class="main_box">
    <div class="navTab">
      <ul>
        <li @click="subjectTab"> 
          {{subject}}
          <img src="../../assets/svg/icon_down.png" v-if="downStatus">
          <img src="../../assets/svg/icon_up.png" v-if="!downStatus">
        </li>
        <li @click="gradeTab">
          {{grade}}
          <img src="../../assets/svg/icon_down.png" v-if="upStatus">
          <img src="../../assets/svg/icon_up.png" v-else>
        </li>
        <li @click="chapterTab">
          {{chapter}}
          <img src="../../assets/svg/icon_down.png" v-if="chapterStatus">
          <img src="../../assets/svg/icon_up.png" v-else>
        </li>
      </ul>
    </div>
    <div class="con" v-if="!downStatus">
      <div class="slide_con">
        <ul>
          <li v-for="(item, i) in subjectList" :key="i" @click="selectSubject(item.label, item.value)" :class="subject == item.label ? 'bule' : ''">{{item.label}}</li>
        </ul>
      </div>
    </div>
    <div class="con" v-if="!upStatus">
      <div class="slide_con">
        <ul>
          <li v-for="(item, i) in gradeList" :key="i"  @click="selectGrade(item.label, item.value)" :class="grade == item.label ? 'bule' : ''">{{item.label}}</li>
        </ul>
      </div>
    </div>
    <div class="con" v-if="!chapterStatus">
      <div class="slide_con">
        <ul>
          <li v-for="(item, i) in chapterList" :key="i"  @click="selectChapter(item.label, item.value)" :class="chapter == item.label ? 'bule' : ''">{{item.label}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getStudentGrade, getWrongSubject, mistakeBook } from '@/api/analy'

export default {
  data () {
    return {
      downStatus: true,
      upStatus: true,
      chapterStatus: true,
      gradeList: {},
      subjectList: {},
      chapterList: {},
      gradeListNo: false,
      subjectListNo: false,
      grade: '',
      subject:'',
      chapterValue: '',
      page: 1,
      subjectValue: 0,
      gradeValue: 0,
      chapter: '请选择章节'
    }
  },
  onLoad () {
    this.getStudentGrade()
    this.getWrongSubject()
  },
  watch: {
    subjectValue (val) {
      console.log(val)
      if (val && this.gradeValue) { this.getChapter() }
      // this.$emit('subject', val)
    },
    gradeValue (val) {
      if (val && this.subjectValue) { this.getChapter() }
      // this.$emit('subject', val)
    }
    // chapterValue (val) {
    //   this.$emit('chapter', val)
    // }
  },
  methods: {
    // 获取年级
    async getStudentGrade () {
      const data = await getStudentGrade({})
      if (data.length > 0) {
        this.gradeListNo = true
        this.gradeList = data
        this.gradeList.map((item, index) => {
          if(item.status == 1) {
            this.grade = item.label
            this.gradeValue = item.value
            this.$emit('grade', item.value)
          }
        })
      } else {
        this.grade = '暂无年级'
        this.gradeValue = 0
        this.$emit('grade', 0)
      }
      
    },
    // 获取科目
    async getWrongSubject () {
      const data = await getWrongSubject({})
      if (data.length > 0) {
        this.subjectListNo = true
        this.subjectList = data
        this.subject = data[0].label
        this.subjectValue = data[0].value
        this.$emit('subject', data[0].value)
      } else {
        this.subject = '暂无科目'
        this.subjectValue = 0
        this.$emit('subject', 0)
      }
      
    },
    // 获取
    async getChapter() {
      const data = await mistakeBook({
        grade: this.gradeValue,
        subject: this.subjectValue,
        chapter:''
      })
      this.loading = false
      this.chapterList = data.list.chapter_name_array
    },
    subjectTab () {
      this.downStatus = !this.downStatus;
      this.upStatus = true;
      this.chapterStatus = true;
    },
    gradeTab () {
      this.upStatus = !this.upStatus;
      this.downStatus = true;
      this.chapterStatus = true;
    },
    chapterTab () {
      this.chapterStatus = !this.chapterStatus;
      this.downStatus = true;
      this.upStatus = true;
    },
    // 点击切换时重新赋值
    selectGrade (e, f) {
      this.grade = e
      this.gradeValue = f
      this.upStatus = !this.upStatus 
      this.chapter = '请选择章节'
      this.$emit('grade', f) 
    },
    selectSubject (e, f) {
      console.log(f)
      this.subject = e
      this.subjectValue = f
      this.$emit('subject', f)
      this.downStatus = !this.downStatus
      this.$emit('subject', f)
      this.chapter = '请选择章节'
    },
    selectChapter (e, f) {
      this.chapter = e
      this.chapterValue = f
      this.chapterStatus = !this.chapterStatus;
      this.$emit('chapter', f)
      if (this.subjectValue && this.gradeValue) { this.getChapter() }
    }
  }
}
</script>

<style lang="less" scoped>
.bule {
  color: #25A7F7;
}
.main_box {
  .navTab {
    color: #25A7F7;
    height:0.6rem;
    background:#fff;
    padding:0.1rem 0;
    box-shadow: 0 2px 5px #a6dcfd;
    border-bottom:0.02rem #a6dcfd solid;
    z-index:999;
    overflow: hidden;
    ul {
      display:flex;
      li {
        flex:3;
        text-align:right;
        line-height:0.6rem;
        border-right:0.02rem #25A7F7 solid;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        img {
          width:0.48rem;
          height:0.48rem;
          float:right;
          margin-right:0.6rem;
          margin-top:0.06rem;
        }
      }
      li:last-child {
        flex:5;
        border-right:none;
      }
    }
  }
  .con {
    background:#fff;
    width:100%;
    z-index:999;
    position: fixed;
    top:0.8rem;
    left:0;
    .slide_con {
      ul {
        li {
          padding:0.2rem 0;
          text-align:center;
          border-bottom:0.02rem #a6dcfd solid;
        }
      }
    }

  }
}
</style>
