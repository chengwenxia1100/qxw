import request from '@/tools/request'
import { sign } from '@/tools'

export function paperAnaly (data) {
  return request({
    url: sign('paper/PaperList'),
    data
  })
}

// 获取年级信息
export function getStudentGrade (data) {
  return request({
    url: sign('home/getStudentGradeType'),
    data
  })
}

// 获取科目信息
export function getPaperSubject (data) {
  return request({
    url: sign('paper/getPaperSubject'),
    data
  })
}

// 输入成绩
export function sureMark (data) {
  return request({
    url: sign('paper/PaperScoreRegister'),
    data
  })
}

// 试卷登记接口
export function getPaperChapterList (data) {
  return request({
    url: sign('paper/getPaperChapterList'),
    data
  })
}

// 试卷提交接口
export function paperTopicRegister (data) {
  return request({
    url: sign('paper/paperTopicRegister'),
    data
  })
}