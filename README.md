此項目使用VScode編輯器撰寫, 以Vue3版本並基於vite架設

請求接口為中國「黑馬程序員」機構所創建

主要使用工具包含element-plus組件庫及axios請求工具等等

# 大事件文章管理系統

###### 此項目為文章管理系統, 可以設置發布個人的文章供他人觀看, 類似個人部落格的概念
<img src="https://img.onl/Tgu49v">

## 登入頁

##### 用戶註冊及登入相關校驗, 點擊箭頭切換註冊或登入表單
<img src="https://img.onl/NAGOxJ" height="220px"><img src="https://img.onl/Pdd0gn" height="220px">

## 頁面布局(紅色框部分)

##### 左側為分頁導航, 頂部左側渲染用戶名、頂部右側渲染用戶頭像及用戶相關操作(下拉選單, 內容同個人中心&登出)
<img src="https://img.onl/n4U1pE">

## 首頁(文章管理頁)

##### 所有發布的文章展示及相關操作, 發布新文章、編輯&刪除文章、依照文章分類搜尋文章
<img src="https://img.onl/05r4Av">

## 文章分類頁

##### 所有分類展示及相關操作, 添加新分類、編輯&刪除分類
<img src="https://img.onl/1as9yi">

## 個人中心

* 基本資料 - 修改個人資料
<img src="https://img.onl/nb6Fg">

* 更換頭像 - 上傳新頭像
<img src="https://img.onl/A9iJg2">

* 修改密碼 - 變換密碼
<img src="https://img.onl/EcmC3E">

## 安裝

```bash
# 取得專案
git clone https://github.com/TastyQAQ/Big-Event
```

```bash
# 安裝套件
pnpm install
```

```bash
# 運行專案
pnpm dev
```

## 主要工具

* Vue v3.3.4
* Vue Router v4.2.4
* Pinia v2.1.6
* element-plus v2.3.14
* axios v1.5.1
