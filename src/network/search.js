import {request} from './request'

export function getHomedata() {
  return request({
    url: '/'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}