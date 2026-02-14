// Type definitions for the Modular Cold Room scroll experience

export interface ScrollStoryPoint {
    progress: number; // 0-1 scroll position where this story point appears
    headline: string;
    subtext?: string;
    align: 'left' | 'center' | 'right';
    cta?: boolean; // Show call-to-action button
}

export interface CanvasRenderConfig {
    width: number;
    height: number;
    dpr: number; // Device pixel ratio
}

export interface ImageDimensions {
    width: number;
    height: number;
}

export interface ScaleCalculation {
    drawWidth: number;
    drawHeight: number;
    offsetX: number;
    offsetY: number;
}

export interface PreloadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

export type AnimationEasing = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';

export interface FrameSequenceConfig {
    totalFrames: number;
    basePath: string;
    fileExtension: 'webp' | 'png' | 'jpg';
    startFrame?: number;
}
