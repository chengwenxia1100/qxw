import request from '@/tools/request'
import { sign } from '@/tools'

// 主页信息接口
export function errorBookList (data) {
  return request({
    url: sign('book/myBookList'),
    data
  })
}

// 添加作业本列表
export function addBookList (data) {
  return request({
    url: sign('book/bookList'),
    data
  })
}

// 添加作业本
export function addBook (data) {
  return request({
    url: sign('book/addBook'),
    data
  })
}

// 章节列表
export function getChapterList (data) {
  return request({
    url: sign('book/getChapterList'),
    data
  })
}

// 章节列表
export function bookTopicList (data) {
  return request({
    url: sign('book/bookTopicList'),
    data
  })
}

//
export function bookTopicRegister (data) {
  return request({
    url: sign('book/bookTopicRegister'),
    data
  })
}
