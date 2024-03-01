import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import { useUserStore } from './modules/user'
// export { useUserStore }
export * from './modules/user' // 等同於上面2行相加(使組件要調用倉庫數據或方法時, 路徑統一, 直接from 'store')
