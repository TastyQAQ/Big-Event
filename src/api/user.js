import request from '@/utils/request.js'
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
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
