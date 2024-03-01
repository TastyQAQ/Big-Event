<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
// 註冊及登入頁面切換(默認註冊頁面)
const isRegister = ref(true)
// 綁定需要校驗的部分
const formModel = ref({ username: '', password: '', repassword: '' })
// 校驗規則, 需和綁定的部分重名
const rules = ref({
  // 用戶名校驗規則, 1.必填 2.提示消息 3.失去焦點時觸發校驗
  username: [
    { required: true, message: '請輸入用戶名', trigger: 'blur' },
    // 用戶名校驗規則, 1.最短長度5 2.最長長度10 3.提示消息 4.失去焦點時觸發校驗
    { min: 5, max: 10, message: '長度必須為5-10個字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '長度必須為6-15個字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '請再次輸入密碼', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '長度必須為6-15個字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('兩次輸入的密碼不一致')) // callback(new Error(錯誤提示))
        } else {
          callback() //校驗成功與否都要 callback 回調
        }
      },
      trigger: 'blur'
    }
  ]
})
// 綁定獲取表單的值(DOM元素, form的value)
const form = ref()
const register = async () => {
  // 表單預校驗, 成功後才會繼續執行下面代碼
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('註冊成功')
  isRegister.value = false
}
// 監聽isRegister變化, 重置表單數據
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登入成功')
  router.push('/')
}
</script>

<template>
  <el-row class="login-page">
    <el-col class="logo" :span="12"></el-col>
    <el-col class="form" :span="6" :offset="3">
      <!-- 註冊相關表單 -->
      <!-- :model綁綁定整個form數據對象{xxx,xxx,xxx}, :rules綁定整個rules校驗規則{xxx,xxx,xxx} -->
      <el-form
        size="large"
        v-if="isRegister"
        :model="formModel"
        :rules="rules"
        ref="form"
      >
        <el-form-item>
          <h1>註冊</h1>
        </el-form-item>
        <!-- el-form-item中的prop綁定規則, 需和rules內名稱一致 -->
        <el-form-item prop="username">
          <!-- 表單元素v-model綁定form子屬性 -->
          <el-input
            placeholder="請輸入用戶名5-10碼"
            :prefix-icon="User"
            size="large"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="請輸入密碼6-15碼"
            :prefix-icon="Lock"
            size="large"
            v-model="formModel.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="請再次輸入密碼"
            :prefix-icon="Lock"
            size="large"
            v-model="formModel.repassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            auto-insert-space
            class="login-btn"
            size="large"
            @click="register"
            >註冊</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = false"
            >← 返回</el-link
          >
        </el-form-item>
      </el-form>

      <!-- 登入相關表單 -->
      <el-form size="large" :model="formModel" :rules="rules" ref="form" v-else>
        <el-form-item>
          <h1>登入</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            placeholder="請輸入用戶名"
            :prefix-icon="User"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            placeholder="請輸入密碼"
            :prefix-icon="Lock"
            size="large"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="remember">
            <el-checkbox label="記住我" size="large" />
            <el-link type="primary" :underline="false">忘記密碼?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            auto-insert-space
            class="login-btn"
            size="large"
            @click="login"
            >登入</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = true"
            >註冊 →</el-link
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
}
.logo {
  width: 50%;
  height: 100%;
  background:
    url('@/assets/logo2-614f2fe8.png') no-repeat 60% center / 240px auto,
    url('@/assets/login_bg-963efa51.jpg') no-repeat center / cover;
  border-radius: 0 20px 20px 0;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.remember {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
}
</style>
