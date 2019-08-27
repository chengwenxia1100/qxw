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
  </div>
</template>

<script>
import { getStudentGrade, getAllSubject } from '@/api/analy'

export default {
  data () {
    return {
      downStatus: true,
      upStatus: true,
      gradeList: {},
      subjectList: {},
      gradeListNo: false,
      subjectListNo: false,
      grade: '',
      subject:'',
      subjectValue: 0,
      gradeValue: 0
    }
  },
  onLoad () {
    this.getStudentGrade()
    this.getAllSubject()
  },
  watch: {
    subjectValue (val) {
        this.$emit('subject', val)
    },
    gradeValue (val) {
        this.$emit('grade', val)
    }
  },
  methods: {
    // 获取年级
    async getStudentGrade () {
      const data = await getStudentGrade({})
      if (data.length > 0) {
        this.gradeListNo = true
        this.gradeList = data
        this.grade = data[0].label
        this.gradeValue = data[0].value
      } else {
        this.grade = '暂无年级'
        this.gradeValue = 0
      }
      
    },
    // 获取科目
    async getAllSubject () {
      const data = await getAllSubject({})
      if (data.length > 0) {
        this.subjectListNo = true
        this.subjectList = data
        this.subject = data[0].label
        this.subjectValue = data[0].value
      } else {
        this.subject = '暂无科目'
        this.subjectValue = 0
      }
      
    },
    subjectTab () {
      this.downStatus = !this.downStatus;
      this.upStatus = true;
    },
    gradeTab () {
      this.upStatus = !this.upStatus;
      this.downStatus = true;
    },
    // 点击切换时重新赋值
    selectGrade (e, f) {
      this.grade = e
      this.gradeValue = f
      this.upStatus = !this.upStatus     
    },
    selectSubject (e, f) {
      this.subject = e
      this.subjectValue = f
      this.downStatus = !this.downStatus
    }
  }
}
</script>

<style lang="less">
.bule {
  color: #1296db
}
.main_box {
  .navTab {
    height:0.6rem;
    background:#c9c7c7;
    padding:0.1rem 0;
    ul {
      display:flex;
      li {
        flex:1;
        text-align:right;
        line-height:0.6rem;
        clear:both;
        img {
          width:0.48rem;
          height:0.48rem;
          float:right;
          margin-right:0.6rem;
          margin-top:0.06rem;
        }
      }
      li:first-child{
        border-right:0.02rem rgb(126, 125, 125) solid;
      }
    }
  }
  .con {
    background:#c9c7c7;
    width:100%;
    z-index:99;
    position: fixed;
    top:0.8rem;
    left:0;
    .slide_con {
      ul {
        li {
          padding:0.2rem 0;
          text-align:center;
          border-bottom:0.02rem #fff solid;
        }
      }
    }

  }
}
</style>
