/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 若有安裝prettier插件, 需禁用
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 單引號
        semi: false, // 無分號
        printWidth: 80, // 每行寬度至多80字符
        trailingComma: 'none', // 不加對象&數組最後的逗號
        endOfLine: 'auto' // 換行符號不限制(win mac 不一致)
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] //vue組件名稱多單詞組成(忽略index.vue)
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 關閉props解構的校驗(props解構丟失響應式)
    // 添加未定義變量錯誤提示
    'no-undef': 'error'
  },
  // 配置全局變量, 告訴vscode&eslint下列變量無須校驗
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly'
  }
}
