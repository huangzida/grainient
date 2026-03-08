/**
 * GrainientEngine - Grainient渲染引擎
 * 基于OGL的WebGL2渲染引擎，负责纯粹的渲染逻辑
 */

import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { vertexShader, fragmentShader } from './shaders'
import { hexToRgbNormalized } from '@bg-effects/shared'

export interface GrainientEngineConfig {
  timeSpeed: number
  colorBalance: number
  warpStrength: number
  warpFrequency: number
  warpSpeed: number
  warpAmplitude: number
  blendAngle: number
  blendSoftness: number
  rotationAmount: number
  noiseScale: number
  grainAmount: number
  grainScale: number
  grainAnimated: boolean
  contrast: number
  gamma: number
  saturation: number
  rotation: number
  blur: number
  centerX: number
  centerY: number
  zoom: number
  color1: string
  color2: string
  color3: string
  quality?: number
  maxFps?: number
}

export class GrainientEngine {
  private renderer: Renderer
  private gl: any // OGL的gl对象有特殊类型，使用any避免类型冲突
  private canvas: HTMLCanvasElement
  private container: HTMLElement
  private geometry: any
  private program: Program
  private mesh: Mesh
  private ro: ResizeObserver
  private raf: number = 0
  private t0: number
  private isPaused: boolean = false
  private pausedTime: number = 0
  private pauseStartTime: number = 0
  private lastFrameTime: number
  private frameInterval: number
  private config: GrainientEngineConfig

  constructor(container: HTMLElement, config: GrainientEngineConfig) {
    this.container = container
    this.config = config
    this.t0 = performance.now()
    this.lastFrameTime = this.t0

    // 初始化renderer
    const dpr = Math.min(window.devicePixelRatio || 1, config.quality || 0.75)
    this.renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr,
    })

    this.gl = this.renderer.gl as any
    this.canvas = this.gl.canvas as HTMLCanvasElement
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.display = 'block'
    container.appendChild(this.canvas)

    // 创建geometry和program
    this.geometry = new Triangle(this.gl as any)
    this.program = new Program(this.gl as any, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: this.createUniforms(config),
    })

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })

    // 监听尺寸变化
    this.ro = new ResizeObserver(() => {
      // 延迟一帧执行，确保浏览器已完成布局计算
      requestAnimationFrame(() => this.setSize())
    })
    this.ro.observe(container)
    
    // 同时也监听 window resize 作为后备
    window.addEventListener('resize', this.handleResize)
    
    this.setSize()

    // 帧率限制
    const targetFps = config.maxFps || 60
    this.frameInterval = 1000 / targetFps

    // 开始渲染循环
    this.loop(this.t0)
  }

  private createUniforms(config: GrainientEngineConfig) {
    return {
      iTime: { value: 0 },
      iResolution: { value: new Float32Array([1, 1]) },
      uTimeSpeed: { value: config.timeSpeed },
      uColorBalance: { value: config.colorBalance },
      uWarpStrength: { value: config.warpStrength },
      uWarpFrequency: { value: config.warpFrequency },
      uWarpSpeed: { value: config.warpSpeed },
      uWarpAmplitude: { value: config.warpAmplitude },
      uBlendAngle: { value: config.blendAngle },
      uBlendSoftness: { value: config.blendSoftness },
      uRotationAmount: { value: config.rotationAmount },
      uNoiseScale: { value: config.noiseScale },
      uGrainAmount: { value: config.grainAmount },
      uGrainScale: { value: config.grainScale },
      uGrainAnimated: { value: config.grainAnimated ? 1.0 : 0.0 },
      uContrast: { value: config.contrast },
      uGamma: { value: config.gamma },
      uSaturation: { value: config.saturation },
      uRotation: { value: config.rotation },
      uBlur: { value: config.blur },
      uCenterOffset: { value: new Float32Array([config.centerX, config.centerY]) },
      uZoom: { value: config.zoom },
      uColor1: { value: new Float32Array(hexToRgbNormalized(config.color1)) },
      uColor2: { value: new Float32Array(hexToRgbNormalized(config.color2)) },
      uColor3: { value: new Float32Array(hexToRgbNormalized(config.color3)) },
    }
  }

  private handleResize = () => {
    this.setSize()
  }

  private setSize() {
    // 强制触发重流以获取最新尺寸，特别是在控制台切换时
    const width = Math.max(1, Math.floor(this.container.clientWidth))
    const height = Math.max(1, Math.floor(this.container.clientHeight))
    
    this.renderer.setSize(width, height)
    
    if (this.program && this.program.uniforms.iResolution) {
      const res = this.program.uniforms.iResolution.value as Float32Array
      res[0] = this.gl.drawingBufferWidth
      res[1] = this.gl.drawingBufferHeight
    }
  }

  private loop = (t: number) => {
    this.raf = requestAnimationFrame(this.loop)

    if (this.isPaused) return

    // 帧率限制
    const elapsed = t - this.lastFrameTime
    if (elapsed < this.frameInterval) return

    this.lastFrameTime = t - (elapsed % this.frameInterval)
    this.program.uniforms.iTime.value = (t - this.t0 - this.pausedTime) * 0.001
    this.renderer.render({ scene: this.mesh })
  }

  /**
   * 更新配置
   */
  updateConfig(newConfig: Partial<GrainientEngineConfig>) {
    this.config = { ...this.config, ...newConfig }

    // 更新uniforms
    const { uniforms } = this.program
    
    if (newConfig.timeSpeed !== undefined) uniforms.uTimeSpeed.value = newConfig.timeSpeed
    if (newConfig.colorBalance !== undefined) uniforms.uColorBalance.value = newConfig.colorBalance
    if (newConfig.warpStrength !== undefined) uniforms.uWarpStrength.value = newConfig.warpStrength
    if (newConfig.warpFrequency !== undefined) uniforms.uWarpFrequency.value = newConfig.warpFrequency
    if (newConfig.warpSpeed !== undefined) uniforms.uWarpSpeed.value = newConfig.warpSpeed
    if (newConfig.warpAmplitude !== undefined) uniforms.uWarpAmplitude.value = newConfig.warpAmplitude
    if (newConfig.blendAngle !== undefined) uniforms.uBlendAngle.value = newConfig.blendAngle
    if (newConfig.blendSoftness !== undefined) uniforms.uBlendSoftness.value = newConfig.blendSoftness
    if (newConfig.rotationAmount !== undefined) uniforms.uRotationAmount.value = newConfig.rotationAmount
    if (newConfig.noiseScale !== undefined) uniforms.uNoiseScale.value = newConfig.noiseScale
    if (newConfig.grainAmount !== undefined) uniforms.uGrainAmount.value = newConfig.grainAmount
    if (newConfig.grainScale !== undefined) uniforms.uGrainScale.value = newConfig.grainScale
    if (newConfig.grainAnimated !== undefined) uniforms.uGrainAnimated.value = newConfig.grainAnimated ? 1.0 : 0.0
    if (newConfig.contrast !== undefined) uniforms.uContrast.value = newConfig.contrast
    if (newConfig.gamma !== undefined) uniforms.uGamma.value = newConfig.gamma
    if (newConfig.saturation !== undefined) uniforms.uSaturation.value = newConfig.saturation
    if (newConfig.rotation !== undefined) uniforms.uRotation.value = newConfig.rotation
    if (newConfig.blur !== undefined) uniforms.uBlur.value = newConfig.blur
    if (newConfig.zoom !== undefined) uniforms.uZoom.value = newConfig.zoom
    
    if (newConfig.centerX !== undefined || newConfig.centerY !== undefined) {
      const offset = uniforms.uCenterOffset.value as Float32Array
      if (newConfig.centerX !== undefined) offset[0] = newConfig.centerX
      if (newConfig.centerY !== undefined) offset[1] = newConfig.centerY
    }
    
    if (newConfig.color1) {
      const rgb = hexToRgbNormalized(newConfig.color1)
      ;(uniforms.uColor1.value as Float32Array).set(rgb)
    }
    if (newConfig.color2) {
      const rgb = hexToRgbNormalized(newConfig.color2)
      ;(uniforms.uColor2.value as Float32Array).set(rgb)
    }
    if (newConfig.color3) {
      const rgb = hexToRgbNormalized(newConfig.color3)
      ;(uniforms.uColor3.value as Float32Array).set(rgb)
    }
  }

  /**
   * 暂停渲染
   */
  pause() {
    if (!this.isPaused) {
      this.isPaused = true
      this.pauseStartTime = performance.now()
    }
  }

  /**
   * 恢复渲染
   */
  resume() {
    if (this.isPaused) {
      this.isPaused = false
      this.pausedTime += performance.now() - this.pauseStartTime
    }
  }

  /**
   * 重启动画
   */
  restart() {
    this.pausedTime = 0
    this.pauseStartTime = 0
    this.t0 = performance.now()
    this.lastFrameTime = this.t0
  }

  /**
   * 销毁引擎
   */
  destroy() {
    if (this.raf) {
      cancelAnimationFrame(this.raf)
    }
    if (this.ro) {
      this.ro.disconnect()
    }
    window.removeEventListener('resize', this.handleResize)
    if (this.canvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas)
    }
  }
}
