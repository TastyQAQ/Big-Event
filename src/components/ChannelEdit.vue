<script setup>
import { ref } from 'vue'
import {
  artUpadteChannelsService,
  artAddChannelsService
} from '@/api/article.js'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const channelForm = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = ref({
  cate_name: [
    { required: true, message: '分類名稱不可為空', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '請輸入1到10位非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '分類別名不可為空', trigger: 'blur' },
    {
      pattern: /^\w{1,15}$/,
      message: '請輸入1到15位英文或數字',
      trigger: 'blur'
    }
  ]
})
const formRef = ref()

const emit = defineEmits(['success'])
const handleChange = async (channelForm) => {
  await formRef.value.validate()
  if (channelForm.id) {
    await artUpadteChannelsService(channelForm)
    ElMessage({
      message: '編輯成功',
      type: 'success'
    })
  } else {
    await artAddChannelsService(channelForm)
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
  }
  emit('success')
  dialogVisible.value = false
}

// 定義一個open方法, 區分是要添加channel或是編輯channel
// open({})表示表單無須渲染 = 添加
// open({id, cate_name, ...})表示表單需要渲染 = 編輯
const open = (row) => {
  channelForm.value = { ...row }
  dialogVisible.value = true
}
// 向外曝露方法
defineExpose({ open })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="channelForm.id ? '編輯分類' : '添加分類'"
    width="30%"
  >
    <el-form
      :model="channelForm"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
      ref="formRef"
    >
      <el-form-item label="分類名稱" prop="cate_name">
        <el-input
          v-model="channelForm.cate_name"
          placeholder="請輸入分類名稱"
        />
      </el-form-item>
      <el-form-item label="分類別名" prop="cate_alias">
        <el-input
          v-model="channelForm.cate_alias"
          placeholder="請輸入分類別名"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleChange(channelForm)">
          確認
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
