import request from '@/utils/request';
 // *获取验证码api
export function getCaptcha(data){
  console.log(data);
  return request({
    url:'/system/captcha',
    method:"get"
  })
}
// *登录api
export function login(data){
  console.log(data);
  return request({
    url:'/login',
    method:"POST",
    params: data
  })
}
// *获取用户信息api
export function getInfo(token){
  console.log(token);
  return request({
    url:'/user/getInfo',
    method:"get",
    params: token
  })
}