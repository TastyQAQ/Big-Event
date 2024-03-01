<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  Crop,
  EditPen,
  User,
  CaretBottom,
  SwitchButton
} from '@element-plus/icons-vue'
import avatar from '@/assets/avatar2.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})
const router = useRouter()
// 頭像下拉菜單函數
const onCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm('您確定要登出大事件嗎?', '溫馨提示', {
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        userStore.removeToken()
        userStore.setUser({})
        router.push('/login')
      })
      .catch(() => {})
  } else {
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside_logo"></div>
      <el-menu
        background-color="#232323"
        text-color="white"
        active-text-color="#ffd04b"
        :default-active="$route.path"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>文章分類
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>文章管理
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>個人中心
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user/profile"
              ><el-icon><User /></el-icon>基本資料</el-menu-item
            >
            <el-menu-item index="/user/avatar"
              ><el-icon><Crop /></el-icon>更換頭像</el-menu-item
            >
            <el-menu-item index="/user/password"
              ><el-icon><EditPen /></el-icon>重置密碼</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          黑馬程序員:
          <strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="onCommand">
          <span class="el-dropdown_box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本資料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更換頭像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密碼</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton">
                退出登入</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2023 Create by 黑馬程序員</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &_logo {
      height: 120px;
      background: url('@/assets/logo2-614f2fe8.png') no-repeat center / 120px
        auto;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    .el-dropdown_box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }
      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
}
</style>
