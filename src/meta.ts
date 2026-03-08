import { generateRandomPalette, rand } from '@bg-effects/shared'
import type { EffectMeta } from '@bg-effects/core'

export const meta: EffectMeta = {
  id: 'grainient',
  name: {
    en: 'Grainient',
    'zh-CN': '颗粒渐变'
  },
  category: 'art',
  version: '1.0.0',
  defaultConfig: {
    debug: false,
    lang: 'zh-CN',
    color1: '#7aa2f7',
    color2: '#020617',
    color3: '#bb9af7',
    timeSpeed: 0.6,
    noiseScale: 2.0,
    grainAmount: 0.05,
    grainScale: 2.0,
    grainAnimated: true,
    contrast: 1.3,
    zoom: 0.9,
    centerX: 0,
    centerY: 0,
    colorBalance: 0,
    warpStrength: 0.5,
    warpFrequency: 3,
    warpSpeed: 1,
    warpAmplitude: 50,
    rotationAmount: 500,
    blendAngle: 45,
    blendSoftness: 0.1,
    gamma: 1.0,
    saturation: 1.0,
    rotation: 0,
    blur: 0,
  },
  randomize: (current: any, tab?: string) => {
    const result = { ...current }
    
    // If no tab specified, randomize all
    if (!tab) {
      // 使用 shared 的随机配色生成（30% 预设 / 70% 和谐色）
      const colors = generateRandomPalette(3)
      result.color1 = colors[0]
      result.color2 = colors[1]
      result.color3 = colors[2]
      result.timeSpeed = rand(0.3, 1.5)
      result.noiseScale = rand(1.2, 3.2)
      result.grainAmount = rand(0.03, 0.08)
      result.zoom = rand(0.7, 1.2)
      result.contrast = rand(1.0, 1.6)
      result.gamma = rand(0.8, 1.3)
      result.saturation = rand(0.8, 1.2)
      result.rotation = rand(0, 360, 0)
      result.blur = rand(0, 1.5)
      return result
    }

    // Tab-specific randomization - 只修改当前tab的属性
    if (tab === 'basic') {
      result.timeSpeed = rand(0.3, 1.5)
      result.noiseScale = rand(1.2, 3.2)
      result.grainAmount = rand(0.03, 0.08)
      result.zoom = rand(0.7, 1.2)
      return result
    }

    if (tab === 'colors') {
      // 使用 shared 的随机配色生成（30% 预设 / 70% 和谐色）
      const colors = generateRandomPalette(3)
      result.color1 = colors[0]
      result.color2 = colors[1]
      result.color3 = colors[2]
      return result
    }

    if (tab === 'visual') {
      result.contrast = rand(1.0, 1.6)
      result.gamma = rand(0.8, 1.3)
      result.saturation = rand(0.8, 1.2)
      result.rotationAmount = rand(0, 500, 0)
      result.rotation = rand(0, 360, 0)
      result.blur = rand(0, 1.5)
      return result
    }

    return result
  },
  presets: [
    {
      id: 'grainient_vibrant',
      name: {
        en: 'Vibrant',
        'zh-CN': '活力四射'
      },
      config: {
        color1: '#9a4c78',
        color2: '#f5cc36',
        color3: '#d2d283',
        timeSpeed: 0.8,
        noiseScale: 1.09,
        grainAmount: 0.06,
        contrast: 1.2,
        zoom: 0.9,
        gamma: 1.0,
        saturation: 1.0,
        rotation: 0,
        blur: 0,
      },
    },
    {
      id: 'grainient_purple_gold',
      name: {
        en: 'Purple Gold',
        'zh-CN': '紫金交辉'
      },
      config: {
        color1: '#f4cb37',
        color2: '#5a3f5f',
        color3: '#f5cc36',
        timeSpeed: 0.7,
        noiseScale: 1.09,
        grainAmount: 0.05,
        contrast: 1.25,
        zoom: 0.85,
        gamma: 0.95,
        saturation: 1.1,
        rotation: 0,
        blur: 0,
      },
    },
    {
      id: 'grainient_blue',
      name: {
        en: 'Blue',
        'zh-CN': '深海蓝韵'
      },
      config: {
        color1: '#020617',
        color2: '#1e293b',
        color3: '#3b82f6',
        timeSpeed: 0.6,
        noiseScale: 1.86,
        grainAmount: 0.04,
        contrast: 1.3,
        zoom: 1.0,
        gamma: 1.05,
        saturation: 0.95,
        rotation: 0,
        blur: 0,
      },
    },
    {
      id: 'grainient_pink',
      name: {
        en: 'Pink',
        'zh-CN': '粉色梦境'
      },
      config: {
        color1: '#ff5f6d',
        color2: '#ffc371',
        color3: '#2193b0',
        timeSpeed: 0.5,
        noiseScale: 1.79,
        grainAmount: 0.05,
        contrast: 1.15,
        zoom: 1.05,
        gamma: 1.0,
        saturation: 1.05,
        rotation: 0,
        blur: 0,
      },
    },
  ]
}
