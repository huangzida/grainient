import 'virtual:uno.css'
import Grainient from './Grainient.vue'
import { meta } from './meta'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'

export { Grainient, meta }
export * from './types'

export const locales = {
  en,
  'zh-CN': zhCN
}
