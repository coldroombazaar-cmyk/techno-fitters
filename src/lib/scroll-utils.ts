// Utility functions for the Modular Cold Room scroll experience

/**
 * Preload a single image
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Preload multiple images with progress tracking
 */
export const preloadImages = (
    sources: string[],
    onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> => {
    const total = sources.length;
    let loaded = 0;

    const promises = sources.map((src) =>
        preloadImage(src).then((img) => {
            loaded++;
            onProgress?.(loaded, total);
            return img;
        })
    );

    return Promise.all(promises);
};

/**
 * Map scroll progress (0-1) to frame index
 */
export const progressToFrame = (
    progress: number,
    totalFrames: number
): number => {
    return Math.min(Math.floor(progress * totalFrames), totalFrames - 1);
};

/**
 * Generate frame file path
 */
export const getFramePath = (
    frameNumber: number,
    basePath: string = '/multipleframe/ezgif-frame-',
    extension: string = '.webp'
): string => {
    const paddedNumber = frameNumber.toString().padStart(3, '0');
    return `${basePath}${paddedNumber}${extension}`;
};

/**
 * Calculate contain scaling for canvas rendering
 */
export const calculateContainScale = (
    containerWidth: number,
    containerHeight: number,
    imageWidth: number,
    imageHeight: number
): {
    drawWidth: number;
    drawHeight: number;
    offsetX: number;
    offsetY: number;
} => {
    const containerAspect = containerWidth / containerHeight;
    const imageAspect = imageWidth / imageHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (containerAspect > imageAspect) {
        // Container is wider - fit to height
        drawHeight = containerHeight;
        drawWidth = drawHeight * imageAspect;
        offsetX = (containerWidth - drawWidth) / 2;
        offsetY = 0;
    } else {
        // Container is taller - fit to width
        drawWidth = containerWidth;
        drawHeight = drawWidth / imageAspect;
        offsetX = 0;
        offsetY = (containerHeight - drawHeight) / 2;
    }

    return { drawWidth, drawHeight, offsetX, offsetY };
};

/**
 * Smooth easing function for animations
 */
export const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation
 */
export const lerp = (start: number, end: number, t: number): number => {
    return start + (end - start) * t;
};
