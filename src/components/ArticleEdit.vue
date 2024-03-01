<script setup>
import { Plus } from '@element-plus/icons-vue'
import { nextTick, ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artAddArticleService,
  artGetArtDetailService,
  artUpdateArtService
} from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'

// 抽屜彈窗顯示隱藏
const drawer = ref(false)
// 抽屜名稱
const drawerTitle = ref('')
// 發布&編輯文章傳遞參數
const drawerForm = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
const formModel = ref({ ...drawerForm })
const imgUrl = ref('')
const editor = ref()
const formRef = ref()
// 封面上傳相關
const onSelectChange = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
  // console.log(uploadFile)
}
// 發布文章相關
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    await artUpdateArtService(fd)
    ElMessage.success('編輯成功')
    drawer.value = false
    emit('success', 'edit')
  } else {
    await artAddArticleService(fd)
    ElMessage.success('添加成功')
    drawer.value = false
    // 通知父組件, 渲染至最後一頁(顯示最新發布的文章)
    emit('success', 'add')
  }
}
// 控制抽屜顯示隱藏, 並通過接收的參數判斷是添加還是編輯
const open = async (row) => {
  drawer.value = true
  if (row.id) {
    drawerTitle.value = '編輯文章'
    const res = await artGetArtDetailService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
    const file = await imageUrlToFileObject(
      imgUrl.value,
      formModel.value.cover_img
    )
    formModel.value.cover_img = file
  } else {
    drawerTitle.value = '添加文章'
    formModel.value = { ...drawerForm }
    imgUrl.value = ''
    await nextTick()
    editor.value.setHTML('')
  }
}
async function imageUrlToFileObject(imageUrl, filename) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })
    const file = new File([blob], filename, {
      type: response.headers['content-type']
    })
    return file
  } catch (error) {
    console.error('Error converting image URL to File object:', error)
    return null
  }
}
// 向外暴露方法
defineExpose({
  open
})
</script>
<template>
  <el-drawer v-model="drawer" size="50%" :title="drawerTitle">
    <template #default>
      <el-form label-width="70px" :model="formModel" ref="formRef">
        <el-form-item label="文章標題" prop="title">
          <el-input v-model="formModel.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分類" prop="cate_id">
          <ChannelSelect
            width="100%"
            v-model="formModel.cate_id"
          ></ChannelSelect>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <el-upload
            class="cover-uploader"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onSelectChange"
          >
            <img v-if="imgUrl" :src="imgUrl" class="cover" />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章內容" prop="content">
          <div class="content">
            <QuillEditor
              theme="snow"
              ref="editor"
              v-model:content="formModel.content"
              contentType="html"
            ></QuillEditor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="onPublish('已发布')" type="primary"
            >已發布</el-button
          >
          <el-button @click="onPublish('草稿')">草稿</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
.cover-uploader {
  border: 1px dashed;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
  font-size: 28px;
  border-radius: 6px;
  :deep() {
    .cover {
      width: 178px;
      height: 178px;
    }
  }
}
.content {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
