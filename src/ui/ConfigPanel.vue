<script setup lang="ts">
import { ref, computed } from 'vue'
import zhCN from '../locales/zh-CN.json'
import en from '../locales/en.json'
import { SubTabs, Slider, ColorPicker } from '@bg-effects/shared'

const props = defineProps<{
  config: any
  lang?: 'zh-CN' | 'en'
}>()

const configModel = defineModel<any>('config', { required: true })

const activeTab = ref('basic')

// 暴露activeTab供父组件使用（注意是ref本身，不是.value）
defineExpose({
  activeTab
})

const i18n = {
  'zh-CN': zhCN,
  'en': en
}

const t = (path: string) => {
  const dict = i18n[props.lang || 'zh-CN']
  return path.split('.').reduce((obj: any, key) => obj?.[key], dict) || path
}

interface SubTabItem {
  id: string
  label: string
}

const subTabs = computed((): SubTabItem[] => [
  { id: 'basic', label: t('subtabs.basic') },
  { id: 'colors', label: t('subtabs.colors') },
  { id: 'visual', label: t('subtabs.visual') },
])
</script>

<template>
  <div class="config-panel flex flex-col text-white/90">
    <!-- Sub Tabs -->
    <SubTabs v-model="activeTab" :tabs="subTabs" />

    <!-- Controls Container -->
    <div class="controls-container flex flex-col p-1 pointer-events-auto overflow-y-auto max-h-[400px] custom-scrollbar pr-2">
      <!-- Basic Tab -->
      <div v-if="activeTab === 'basic'" class="tab-content flex flex-col gap-4">
        <Slider
          v-for="prop in [
            {id: 'timeSpeed', min:0.1, max:5, step:0.1}, 
            {id: 'noiseScale', min:0.5, max:5, step:0.1},
            {id: 'grainAmount', min:0, max:0.15, step:0.01},
            {id: 'zoom', min:0.5, max:1.5, step:0.05}
          ]"
          :key="prop.id"
          v-model="configModel[prop.id]"
          :label="t(`labels.${prop.id}`)"
          :min="prop.min"
          :max="prop.max"
          :step="prop.step"
          class="form-item"
        />
      </div>
      
      <!-- Colors Tab -->
      <div v-if="activeTab === 'colors'" class="tab-content flex flex-col gap-4">
        <ColorPicker
          v-for="colorProp in ['color1', 'color2', 'color3']"
          :key="colorProp"
          v-model="configModel[colorProp]"
          :label="t(`labels.${colorProp}`)"
          class="form-item"
        />
      </div>
      
      <!-- Visual Tab -->
      <div v-if="activeTab === 'visual'" class="tab-content flex flex-col gap-4">
        <Slider
          v-for="prop in [
            {id: 'contrast', min:0.8, max:2, step:0.1},
            {id: 'gamma', min:0.5, max:2, step:0.1},
            {id: 'saturation', min:0.5, max:1.5, step:0.1},
            {id: 'rotationAmount', min:0, max:1000, step:10},
            {id: 'rotation', min:0, max:360, step:1},
            {id: 'blur', min:0, max:3, step:0.1}
          ]"
          :key="prop.id"
          v-model="configModel[prop.id]"
          :label="t(`labels.${prop.id}`)"
          :min="prop.min"
          :max="prop.max"
          :step="prop.step"
          class="form-item"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls-container {
  margin-top: 24px;
}

/* 确保 UnoCSS 的 flex 布局生效 */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}
</style>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
