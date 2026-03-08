# @bg-effects/grainient

✨ 基于噪声的优美颗粒渐变背景效果，适用于 Vue 3。

[English](./README.md) | [简体中文](./README_CN.md)

![Grainient Effect](https://img.shields.io/badge/type-effect-blue) ![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen) ![WebGL](https://img.shields.io/badge/WebGL-2.0-orange)

## ✨ 特性

- 🚀 **高性能** - 基于 WebGL 2.0 渲染，GPU 加速
- 🎨 **丰富的视觉效果** - 基于噪声的渐变与颗粒纹理
- 🌈 **调色板** - 支持 3 色渐变，包含 10+ 预设
- 🎛️ **高度可定制** - 10+ 可调参数
- 🔧 **调试面板** - 内置实时配置面板
- 🌍 **多语言支持** - 中英文双语界面
- 📦 **4 种内置预设** - 即插即用的配色方案
- 🎬 **动画控制** - 可调速度 (0.1x-5x)

## 📦 安装

```bash
# pnpm
pnpm add @bg-effects/grainient ogl

# npm
npm install @bg-effects/grainient ogl

# yarn
yarn add @bg-effects/grainient ogl
```

> **注意**: `ogl` 是一个同伴依赖（peer dependency），需要手动安装。

## 🚀 快速开始

### 基础用法

```vue
<script setup>
import { Grainient } from '@bg-effects/grainient'
</script>

<template>
  <div class="container">
    <Grainient />
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
```

### 使用调试面板

```vue
<template>
  <Grainient debug lang="zh-CN" />
</template>
```

### 自定义配置

```vue
<script setup>
import { Grainient } from '@bg-effects/grainient'

const config = {
  color1: '#FF9FFC',
  color2: '#5227FF',
  color3: '#B19EEF',
  timeSpeed: 0.8,
  grainAmount: 0.06,
  contrast: 1.2,
  zoom: 0.9
}
</script>

<template>
  <Grainient v-bind="config" />
</template>
```

## 📖 API 参考

### Props

#### 基础设置

| 参数 | 类型 | 默认值 | 范围 | 说明 |
|------|------|---------|-------|-------------|
| `timeSpeed` | `number` | `0.6` | 0.1-5.0 | 动画速度倍率 |
| `grainAmount` | `number` | `0.05` | 0-0.15 | 颗粒纹理强度 |
| `zoom` | `number` | `0.9` | 0.5-1.5 | 渐变缩放级别 |
| `contrast` | `number` | `1.0` | 0.5-2.0 | 渐变对比度 |
| `debug` | `boolean` | `false` | - | 启用调试面板 |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | - | UI 语言 |

#### 颜色设置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| `color1` | `string` | `'#ff0000'` | 第一种渐变颜色 |
| `color2` | `string` | `'#00ff00'` | 第二种渐变颜色 |
| `color3` | `string` | `'#0000ff'` | 第三种渐变颜色 |

## 🛠️ 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 📄 开源协议

MIT
