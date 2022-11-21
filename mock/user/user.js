/**
 * *用户登录接口的实现
 */
 console.log('-------mockjs---------');
export default [
  {
    url: "/api/system/captcha",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "获取验证码成功",
        data: {imagUrl:'https://s2.ax1x.com/2019/08/23/mskcdK.png'}
      };
    }
  },
  {
    url: "/api/login",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "登录成功",
        data: {token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'}
      };
    }
  },
  {
    url: "/api/user/getInfo",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "获取用户信息成功过",
        data: {
          username:'admin',
          avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          roles: ['管理员','超级管理员']
        }
      };
    }
  }
];