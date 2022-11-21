<template>
  <div class="login-box">
    <div class="login-form">
      <div class="banner">
        <img src="../../assets/images/OIP-C.jfif" alt="">
      </div>
      <div class="login-content">
        <h2>在线教育系统</h2>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="ruleForm.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" v-model="ruleForm.password" placeholder="密码" type="password" show-password />
          </el-form-item>
          <div class="login-capthca">
            <el-form-item prop="captcha" style="width:45%;float:left">
              <el-input :prefix-icon="EditPen" class="w-100 m-2" v-model="ruleForm.captcha" placeholder="验证码" />
            </el-form-item>
            <img :src="imageUrl" width="130" height="30" alt="" style="margin-left:25px;">
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" id="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { reactive, ref, toRefs, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock, EditPen } from '@element-plus/icons-vue'
import { getCaptcha } from '@/api/user'

const router = useRouter()
const route = useRoute()
const store = useUserStore()

let imageUrl = ref('')
const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  username: 'admin',
  password: '123456',
  captcha: 'esmc'
})
let { username, password, captcha } = toRefs(ruleForm)

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '用户名长度3-8位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 8, message: '密码长度3-12位', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
})

// *获取验证码
onMounted(() => {
  getCaptcha().then(res => {
    console.log('-------获取验证码-----');
    // console.log(res.data.imageUrl);
    imageUrl.value = res.data.imagUrl
  })
})
// *登录请求处理
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // *登录功能的实现
      store.login({ username: username.value, password: password.value, captcha: captcha.value })
        .then((res) => {
          console.log("🚀 ~ file: Login.vue ~ line 68 ~ login ~ res")
          ElMessage({
            showClose: true,
            message: '登录成功',
            type: 'success',
            center: true,
          })
          setTimeout(() => {
            // *登录成功以后去首页
            router.push('/')
          }, 1000)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style  scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.login-box {
  height: 100vh;
  width: 100vw;
  background-color: #7C3AED;
  opacity: .75;
  display: flex;
  justify-content: center;
  align-items: center;

}

.login-form {
  width: 700px;
  height: 350px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  box-shadow:
    0px 0px 2.4px rgba(0, 0, 0, 0.125),
    0px 0px 8px rgba(0, 0, 0, 0.185),
    0px 0px 36px rgba(0, 0, 0, 0.31);

}

.banner {
  width: 350px;
  height: 350px;
}

.banner img {
  border-radius: 15px 0 0 15px;
  width: 350px;
  height: 350px;
}

.login-content {
  padding: 20px 20px;
  width: 350px;
  height: 350px;
  background-color: #FAFAFA;
  border-radius: 0 10px 10px 0;
  box-sizing: border-box;
}

.login-content h2 {
  text-align: center;
  color: #7C3AED;
}

#login-btn {
  width: 100%;
  background-color: #7C3AED;
  border-color: #7C3AED;
}

#login-btn:hover {
  box-shadow:
    0px 0px 2.4px rgba(0, 0, 0, 0.044),
    0px 0px 8px rgba(0, 0, 0, 0.066),
    0px 0px 36px rgba(0, 0, 0, 0.11);

}

#captcha.el-input__inner {
  width: 50%;
}

.login-capthca {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
}
</style>