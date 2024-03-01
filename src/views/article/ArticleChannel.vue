<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelsService } from '@/api/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('您確認要刪除此分類嗎?', '溫馨提示', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await artDelChannelsService(row.id)
      ElMessage({
        message: '刪除成功',
        type: 'success'
      })
      getChannelList()
    })
    .catch(() => {})
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <PageContainer title="文章分類">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加文章</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column prop="date" label="序號" width="100" type="index" />
      <el-table-column prop="cate_name" label="分類名稱" />
      <el-table-column prop="cate_alias" label="分類別名" />
      <el-table-column prop="address" label="操作" width="100">
        <!-- 使用默認作用域插槽, row表示該列的數據資料, $index表示該數據的索引號 -->
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            type="primary"
            :icon="Edit"
            circle
            plain
          />
          <el-button
            @click="onDeleteChannel(row, $index)"
            type="danger"
            :icon="Delete"
            circle
            plain
          />
        </template>
      </el-table-column>
      <!-- 無資料時顯示 -->
      <template #empty>
        <el-empty description="無資料" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </PageContainer>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
