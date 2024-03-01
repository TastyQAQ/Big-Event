<script setup>
import { userUpdateInfoService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const loading = ref(false)
// const userInfo = ref({
//   email: '',
//   id: null,
//   nickname: '',
//   user_pic: null,
//   username: ''
// })
const rules = ref({
  username: [
    { required: true, message: '用戶名不可為空', trigger: 'blur' },
    { min: 5, max: 10, message: '長度必須為5-10個字符', trigger: 'blur' }
  ],
  nickname: [{ required: true, message: '暱稱不可為空', trigger: 'blur' }],
  email: [
    { required: true, message: '電子信箱不可為空', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的email', trigger: 'blur' }
  ]
})
const form = ref()
// const getInfo = async () => {
//   loading.value = true
//   const res = await userGetInfoService()
//   userInfo.value = res.data.data
//   loading.value = false
// }
// getInfo()
const updateInfo = async () => {
  await form.value.validate()
  await userUpdateInfoService(userStore.user)
  ElMessage.success('修改成功')
}
</script>

<template>
  <pageContainer title="基本資料">
    <el-form
      label-width="80px"
      :model="userStore.user"
      :rules="rules"
      ref="form"
      v-loading="loading"
    >
      <el-form-item label="登入名稱" prop="username">
        <el-input v-model="userStore.user.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用戶暱稱" prop="nickname">
        <el-input v-model="userStore.user.nickname"></el-input>
      </el-form-item>
      <el-form-item label="電子信箱" prop="email">
        <el-input v-model="userStore.user.email" type="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">提交修改</el-button>
      </el-form-item>
    </el-form>
  </pageContainer>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
}
</style>
