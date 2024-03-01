<script setup>
import { ref } from 'vue'
import { userChangePwdService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const form = ref()
// formModel.value.old_pwd = userStore.user.password
const rules = ref({
  old_pwd: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '長度必須為6-15個字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '長度必須為6-15個字符', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '請再次輸入密碼', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '長度必須為6-15個字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.re_pwd) {
          callback(new Error('兩次輸入的密碼不一致')) // callback(new Error(錯誤提示))
        } else {
          callback() //校驗成功與否都要 callback 回調
        }
      },
      trigger: 'blur'
    }
  ]
})
const router = useRouter()
const changePwd = async () => {
  await form.value.validate()
  const res = await userChangePwdService(formModel.value)
  if (res.data.code === 1) {
    ElMessage.danger('原密碼錯誤')
  } else {
    ElMessage.success('修改成功')
    userStore.setToken('')
    userStore.setUser({})
    router.push('/login')
  }
}
const onReset = () => {
  formModel.value.old_pwd = ''
  formModel.value.new_pwd = ''
  formModel.value.re_pwd = ''
}
</script>

<template>
  <pageContainer title="重置密碼">
    <el-form
      style="max-width: 50%"
      label-width="100px"
      :model="formModel"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="原密碼" prop="old_pwd">
        <el-input v-model="formModel.old_pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密碼" prop="new_pwd">
        <el-input v-model="formModel.new_pwd"></el-input>
      </el-form-item>
      <el-form-item label="確認新密碼" prop="re_pwd">
        <el-input v-model="formModel.re_pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePwd">修改密碼</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </pageContainer>
</template>

<style></style>
