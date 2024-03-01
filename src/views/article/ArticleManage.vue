<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetArtListService } from '@/api/article.js'
import { formatTime } from '@/utils/formatDay.js'
// 文章列表
const articleList = ref([])
// 文章總數
const total = ref(0)
// 加載效果顯示隱藏
const loading = ref(false)
const Dloading = ref(false)
// 編輯文章
const onEditArticle = (row) => {
  Dloading.value = true
  drawer.value.open(row)
  Dloading.value = false
}
// 刪除文章
const onDeleteArticle = (row) => {
  console.log(row)
}
// 獲取文章相關參數
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 獲取文章列表
const GetArtList = async () => {
  loading.value = true
  const res = await artGetArtListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
GetArtList()
// 頁面文章顯示數量
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  GetArtList()
}
// 換頁邏輯
const onPageChange = (page) => {
  params.value.pagenum = page
  GetArtList()
}
// 搜索按鈕篩選文章
const onSearch = () => {
  params.value.pagenum = 1
  GetArtList()
}
// 清除按鈕重置文章渲染
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  GetArtList()
}

const drawer = ref()
// 發布文章按鈕
const onAddArticle = () => {
  drawer.value.open({})
}
const onChangeArticle = (state) => {
  if (state === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  GetArtList()
}
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">發布文章</el-button>
    </template>
    <!-- 表單區域 -->
    <el-form :inline="true" class="form">
      <el-form-item label="文章分類:">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="發布狀態:">
        <el-select
          v-model="params.state"
          class="m-2"
          placeholder="請選擇"
          size="large"
        >
          <!-- 後臺接收發布狀態用中文, 已發布 / 草稿 -->
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜尋</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">清除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格區域 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章標題" width="380">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">
            {{ row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分類" />
      <el-table-column prop="pub_date" label="發表時間">
        <template #default="row">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="狀態" />
      <el-table-column label="操作" width="100">
        <!-- 使用默認作用域插槽, row表示該列的數據資料, $index表示該數據的索引號 -->
        <template #default="{ row }">
          <el-button
            @click="onEditArticle(row)"
            type="primary"
            :icon="Edit"
            circle
            plain
          />
          <el-button
            @click="onDeleteArticle(row)"
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
    <!-- 分頁標籤 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :default-page-size="params.pagesize"
        :page-sizes="[2, 3, 5, 10]"
        :small="small"
        :disabled="disabled"
        background
        layout="jumper, total, sizes, prev, pager, next"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onPageChange"
      />
    </div>
    <!-- 抽屜區域 -->
    <ArticleEdit
      ref="drawer"
      @success="onChangeArticle"
      v-loading="Dloading"
    ></ArticleEdit>
  </PageContainer>
</template>

<style lang="scss" scoped>
.el-form-item {
  align-items: center;
}
.demo-pagination-block {
  margin-top: 20px;
}
.el-pagination {
  justify-content: end;
}
</style>
