import request from '@/tools/request'
import { sign } from '@/tools'

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

// 试卷分析列表
export function PaperList (data) {
  return request({
    url: sign('paper/PaperList'),
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

// 试卷详情接口
export function PaperTopicInfo (data) {
  return request({
    url: sign('paper/PaperTopicInfo'),
    data
  })
}

// 试卷分析接口
export function paperAnalysis (data) {
  return request({
    url: sign('paper/paperAnalysis'),
    data
  })
}
