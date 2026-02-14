'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import type { ScrollStoryPoint } from '@/types/scroll';

const TOTAL_FRAMES = 40;
const FRAME_PATH = '/multipleframe/ezgif-frame-';

const STORY_POINTS: ScrollStoryPoint[] = [
    {
        progress: 0,
        headline: 'Precision. Engineered Cold.',
        align: 'center',
    },
    {
        progress: 0.3,
        headline: 'Modular Architecture',
        subtext: 'Built for controlled environments.',
        align: 'left',
    },
    {
        progress: 0.6,
        headline: 'Thermal Integrity',
        subtext: 'Every layer designed for performance.',
        align: 'right',
    },
    {
        progress: 0.9,
        headline: 'Build Your Cold Room',
        align: 'center',
        cta: true,
    },
];

export default function ModularColdRoomScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Preload all frames
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const preloadImages = () => {
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, '0');
                img.src = `${FRAME_PATH}${frameNumber}.jpg`;

                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === TOTAL_FRAMES) {
                        setImages(loadedImages);
                        setImagesLoaded(true);
                    }
                };

                img.onerror = () => {
                    console.error(`Failed to load frame: ${frameNumber}`);
                };

                loadedImages[i - 1] = img;
            }
        };

        preloadImages();
    }, []);

    // Render frame to canvas
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            const img = images[currentFrame];
            if (!img || !img.complete) return;

            // Set canvas size to match window
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.scale(dpr, dpr);

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate scaling to contain image
            const canvasAspect = window.innerWidth / window.innerHeight;
            const imgAspect = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasAspect > imgAspect) {
                // Canvas is wider - fit to height
                drawHeight = window.innerHeight;
                drawWidth = drawHeight * imgAspect;
                offsetX = (window.innerWidth - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Canvas is taller - fit to width
                drawWidth = window.innerWidth;
                drawHeight = drawWidth / imgAspect;
                offsetX = 0;
                offsetY = (window.innerHeight - drawHeight) / 2;
            }

            // Draw image centered
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        render();

        const handleResize = () => render();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [currentFrame, images, imagesLoaded]);

    // Update frame based on scroll
    useEffect(() => {
        if (!imagesLoaded) return;

        const unsubscribe = scrollYProgress.on('change', (latest) => {
            const frameIndex = Math.min(
                Math.floor(latest * TOTAL_FRAMES),
                TOTAL_FRAMES - 1
            );
            setCurrentFrame(frameIndex);
        });

        return () => unsubscribe();
    }, [scrollYProgress, imagesLoaded]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            {/* Loading State */}
            {!imagesLoaded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="h-full bg-white/40"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2, ease: 'easeInOut' }}
                            />
                        </div>
                        <p className="text-sm tracking-wide text-white/40">Loading experience</p>
                    </div>
                </div>
            )}

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                    style={{ imageRendering: 'auto' }}
                />

                {/* Story Overlays */}
                {imagesLoaded && (
                    <div className="pointer-events-none absolute inset-0">
                        {STORY_POINTS.map((point, index) => (
                            <StoryOverlay
                                key={index}
                                point={point}
                                scrollProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Story Overlay Component
function StoryOverlay({
    point,
    scrollProgress,
}: {
    point: ScrollStoryPoint;
    scrollProgress: any;
}) {
    const fadeInStart = Math.max(0, point.progress - 0.1);
    const fadeOutEnd = Math.min(1, point.progress + 0.15);

    const opacity = useTransform(
        scrollProgress,
        [fadeInStart, point.progress, point.progress + 0.05, fadeOutEnd],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [fadeInStart, point.progress],
        [20, 0]
    );

    const alignmentClasses = {
        left: 'items-start text-left pl-8 md:pl-16 lg:pl-24',
        center: 'items-center text-center',
        right: 'items-end text-right pr-8 md:pr-16 lg:pr-24',
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[point.align]} pointer-events-auto px-6`}
        >
            <div className="max-w-2xl">
                <h2 className="text-4xl font-light tracking-tight text-white/90 md:text-5xl lg:text-6xl">
                    {point.headline}
                </h2>
                {point.subtext && (
                    <p className="mt-4 text-base font-light tracking-wide text-white/60 md:text-lg lg:text-xl">
                        {point.subtext}
                    </p>
                )}
                {point.cta && (
                    <button className="mt-8 rounded-none border border-white/20 bg-white/5 px-8 py-3 text-sm font-light tracking-widest text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                        CONFIGURE NOW
                    </button>
                )}
            </div>
        </motion.div>
    );
}
