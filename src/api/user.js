import request from '@/utils/request.js'
export const userRegisterService = (data) => {
  return request.post('/api/reg', data)
}
export const userLoginService = (data) => {
  return request.post('/api/login', data)
}
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}
export const userUpdateInfoService = (obj) => {
  return request.put('/my/userinfo', obj)
}
export const userUpdateAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}
export const userChangePwdService = (obj) => {
  return request.patch('/my/updatepwd', obj)
}
