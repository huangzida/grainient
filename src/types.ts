export interface GrainientProps {
  className?: string
  debug?: boolean
  lang?: 'zh-CN' | 'en'
  timeSpeed?: number
  colorBalance?: number
  warpStrength?: number
  warpFrequency?: number
  warpSpeed?: number
  warpAmplitude?: number
  blendAngle?: number
  blendSoftness?: number
  rotationAmount?: number
  noiseScale?: number
  grainAmount?: number
  grainScale?: number
  grainAnimated?: boolean
  contrast?: number
  gamma?: number
  saturation?: number
  rotation?: number
  blur?: number
  centerX?: number
  centerY?: number
  zoom?: number
  color1?: string
  color2?: string
  color3?: string
  
  // Performance options
  /** 渲染质量 (0.5-2.0), 默认0.75低质量高性能, 2.0高质量低性能 */
  quality?: number
  /** 帧率限制, 默认60, 设置为30可提升性能 */
  maxFps?: number
}
