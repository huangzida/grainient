# @bg-effects/grainient

✨ Beautiful noise-based gradient particle background effect for Vue 3.

[English](./README.md) | [简体中文](./README_CN.md)

[Live Demo](https://huangzida.github.io/grainient/)

![Grainient Effect](https://img.shields.io/badge/type-effect-blue) ![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen) ![WebGL](https://img.shields.io/badge/WebGL-2.0-orange)

## ✨ Features

- 🚀 **High Performance** - WebGL 2.0 based rendering, GPU accelerated
- 🎨 **Rich Visuals** - Noise-based gradient with grain texture
- 🌈 **Color Palette** - Support for 3-color gradients with 10+ presets
- 🎛️ **Highly Customizable** - 10+ adjustable parameters
- 🔧 **Debug Panel** - Built-in real-time configuration panel
- 🌍 **i18n Support** - Dual-language (Chinese/English) interface
- 📦 **4 Built-in Presets** - Ready-to-use color schemes
- 🎬 **Animation Control** - Adjustable speed (0.1x-5x)

## 📦 Installation

```bash
# pnpm
pnpm add @bg-effects/grainient ogl

# npm
npm install @bg-effects/grainient ogl

# yarn
yarn add @bg-effects/grainient ogl
```

> **Note**: `ogl` is a peer dependency and needs to be installed manually.

## 🚀 Quick Start

### Basic Usage

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

### With Debug Panel

```vue
<template>
  <Grainient debug lang="en" />
</template>
```

### Custom Configuration

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

## 📖 API Reference

### Props

#### Basic Settings

| Prop | Type | Default | Range | Description |
|------|------|---------|-------|-------------|
| `timeSpeed` | `number` | `0.6` | 0.1-5.0 | Animation speed multiplier |
| `grainAmount` | `number` | `0.05` | 0-0.15 | Grain texture intensity |
| `zoom` | `number` | `0.9` | 0.5-1.5 | Zoom level of the gradient |
| `contrast` | `number` | `1.0` | 0.5-2.0 | Contrast of the gradient |
| `debug` | `boolean` | `false` | - | Enable debug panel |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | - | UI language |

#### Color Settings

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color1` | `string` | `'#ff0000'` | First gradient color |
| `color2` | `string` | `'#00ff00'` | Second gradient color |
| `color3` | `string` | `'#0000ff'` | Third gradient color |

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 📄 License

MIT
