<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user.js'
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const onChange = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
const uploadAvatar = async () => {
  await userUpdateAvatarService(imgUrl.value)
  await userStore.getUser()
}
</script>

<template>
  <pageContainer title="更換頭像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onChange"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div class="handle">
      <el-button
        type="primary"
        plain
        :icon="Plus"
        @click="uploadRef.$el.querySelector('input').click()"
        >選擇圖片</el-button
      >
      <el-button type="success" plain :icon="Upload" @click="uploadAvatar"
        >上傳頭像</el-button
      >
    </div>
  </pageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed;
  width: 250px;
  height: 250px;
  text-align: center;
  line-height: 250px;
  font-size: 28px;
  border-radius: 6px;
  :deep() {
    .avatar {
      width: 250px;
      height: 250px;
    }
  }
}
.handle {
  margin-top: 20px;
}
</style>
