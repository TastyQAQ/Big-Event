import request from '@/utils/request.js'
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}
export const artAddChannelsService = (obj) => {
  return request.post('/my/cate/add', obj)
}
export const artUpadteChannelsService = (obj) => {
  return request.put('/my/cate/info', obj)
}
export const artDelChannelsService = (id) => {
  return request.delete('/my/cate/del', { params: { id } })
}
export const artGetArtListService = (params) => {
  return request.get('/my/article/list', { params })
}
export const artAddArticleService = (data) => {
  return request.post('/my/article/add', data)
}
export const artGetArtDetailService = (id) => {
  return request.get('/my/article/info', { params: { id } })
}
export const artUpdateArtService = (data) => {
  return request.put('/my/article/info', data)
}
