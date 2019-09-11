<template>
  <div class="main_box">
    <div class="navTab">
      <ul>
        <li @click="subjectTab"> 
          {{subject}}
          <img src="../../assets/svg/icon_down.png" v-if="downStatus && subjectType">
          <img src="../../assets/svg/icon_up.png" v-if="!downStatus && subjectType">
        </li>
        <li @click="gradeTab">
          {{grade}}
          <img src="../../assets/svg/icon_down.png" v-if="upStatus && subjectType">
          <img src="../../assets/svg/icon_up.png" v-if="!upStatus && subjectType">
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
  props: {
    subjectType: {
      default: true
    },
    subject: {
      default: ''
    },
    subjectValue: {
      default: 0
    }
  },
  data () {
    return {
      downStatus: true,
      upStatus: true,
      gradeList: {},
      subjectList: {},
      gradeListNo: false,
      subjectListNo: false,
      grade: '',
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
    subject (val) {
      this.$emit('subjectTit', val)
    },
    gradeValue (val) {
      this.$emit('grade', val)
    },
    grade (val) {
      this.$emit('gradeTit', val)
    }
  },
  methods: {
    // 获取年级
    async getStudentGrade () {
      const data = await getStudentGrade({})
      if (data.length > 0) {
        this.gradeListNo = true
        this.gradeList = data
        if(this.subjectType) {
          this.gradeList.map((item, index) => {
            if(item.status === 1) {
              this.grade = item.label
              this.gradeValue = item.value
            }
          })
        }
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
        if(this.subjectType) {
          this.subject = data[0].label
          this.subjectValue = data[0].value
        }
      } else {
        this.subject = '暂无科目'
        this.subjectValue = 0
      }
      
    },
    subjectTab () {
      if (this.subjectType === false) { return }
      this.downStatus = !this.downStatus;
      this.upStatus = true;
    },
    gradeTab () {
      if (this.subjectType === false) { return }
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
  },
  onUnload () {
    this.subjectValue = 0
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
    ul {
      display:flex;
      li {
        flex:1;
        text-align:center;
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
    background:#fff;
    width:100%;
    z-index:99;
    position: fixed;
    top:1rem;
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
