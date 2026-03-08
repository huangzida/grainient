<script setup lang="ts">
/**
 * Grainient - 渐变背景效果组件（重构版）
 * 职责：组件生命周期管理、props传递
 */
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import type { GrainientProps } from './types'
import { GrainientEngine } from './engine'
import type { GrainientEngineConfig } from './engine'
import { DebugShell } from '@bg-effects/debug-ui'
import { meta } from './meta'
import ConfigPanel from './ui/ConfigPanel.vue'
import { defu } from 'defu'

const props = defineProps<GrainientProps>()

// 内部配置代理（用于debug面板双向绑定）
const config = ref<GrainientProps>(defu(props, meta.defaultConfig) as GrainientProps)
// Internal lang state for debug panel
const internalLang = ref<'zh-CN' | 'en'>(config.value.lang)

watch(() => props, (newProps) => {
  if (!props.debug) {
    config.value = defu(newProps, meta.defaultConfig) as GrainientProps
  }
}, { deep: true })

const configPanelRef = ref<any>(null)
const containerRef = ref<HTMLElement | null>(null)
let engine: GrainientEngine | null = null

// 引擎接口
const engineInterface = computed(() => ({
  pause: () => engine?.pause(),
  resume: () => engine?.resume(),
  restart: () => engine?.restart(),
}))

// 随机化处理
const handleRandomize = () => {
  if (meta.randomize) {
    const currentTab = configPanelRef.value?.activeTab
    const tabValue = typeof currentTab === 'object' && currentTab?.value
      ? currentTab.value
      : currentTab
    const newConfig = meta.randomize(config.value, tabValue)
    config.value = {
      ...newConfig,
      debug: config.value.debug,
      lang: config.value.lang,
    }
  }
}

// 初始化引擎
onMounted(() => {
  if (!containerRef.value) return

  const engineConfig: GrainientEngineConfig = {
    timeSpeed: config.value.timeSpeed!,
    colorBalance: config.value.colorBalance!,
    warpStrength: config.value.warpStrength!,
    warpFrequency: config.value.warpFrequency!,
    warpSpeed: config.value.warpSpeed!,
    warpAmplitude: config.value.warpAmplitude!,
    blendAngle: config.value.blendAngle!,
    blendSoftness: config.value.blendSoftness!,
    rotationAmount: config.value.rotationAmount!,
    noiseScale: config.value.noiseScale!,
    grainAmount: config.value.grainAmount!,
    grainScale: config.value.grainScale!,
    grainAnimated: config.value.grainAnimated!,
    contrast: config.value.contrast!,
    gamma: config.value.gamma!,
    saturation: config.value.saturation!,
    rotation: config.value.rotation!,
    blur: config.value.blur!,
    centerX: config.value.centerX!,
    centerY: config.value.centerY!,
    zoom: config.value.zoom!,
    color1: config.value.color1!,
    color2: config.value.color2!,
    color3: config.value.color3!,
    quality: config.value.quality,
    maxFps: config.value.maxFps,
  }

  engine = new GrainientEngine(containerRef.value, engineConfig)

  // 监听配置变化并更新引擎
  watch(config, (newConfig) => {
    if (!engine) return
    engine.updateConfig(newConfig as GrainientEngineConfig)
  }, { deep: true })
})

// 清理引擎
onUnmounted(() => {
  if (engine) {
    engine.destroy()
    engine = null
  }
})
</script>

<template>
  <div :class="['grainient-root relative w-full h-full overflow-hidden', className]">
    <div ref="containerRef" class="grainient-container absolute inset-0 w-full h-full overflow-hidden" />
    <DebugShell
      v-if="debug"
      v-model:config="config"
      v-model:lang="internalLang"
      :meta="meta"
      :engine="engineInterface"
      @randomize="handleRandomize"
    >
      <template #settings>
        <ConfigPanel
          ref="configPanelRef"
          v-model:config="config"
          :lang="internalLang"
        />
      </template>
    </DebugShell>
  </div>
</template>

<style scoped>
.grainient-root {
  display: block;
  width: 100%;
  height: 100%;
}

.grainient-container {
  width: 100% !important;
  height: 100% !important;
}

:deep(canvas) {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
}
</style>
