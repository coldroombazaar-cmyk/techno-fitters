'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import type { ScrollStoryPoint } from '@/types/scroll';
import QuoteModal from './ui/QuoteModal';

const TOTAL_FRAMES = 40;
const FRAME_PATH = '/multipleframe/ezgif-frame-';

const STORY_POINTS: ScrollStoryPoint[] = [
    {
        progress: 0,
        headline: 'Engineering Reliable Cold.',
        subtext: 'End-to-end cold chain infrastructure built, repaired and optimized by experts.',
        align: 'center',
        cta: true,
    },
    {
        progress: 0.3,
        headline: 'Modular Architecture',
        subtext: 'Built for controlled environments with varied temperature zones.',
        align: 'left',
    },
    {
        progress: 0.6,
        headline: 'Thermal Integrity',
        subtext: 'High-density PUF panels designed for zero thermal leakage.',
        align: 'right',
    },
    {
        progress: 0.9,
        headline: 'Precision Engineered',
        subtext: 'Every component tested for industrial durability.',
        align: 'center',
    },
];

export default function ModularColdRoomScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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

        const unsubscribe = scrollYProgress.on('change', (latest: number) => {
            const frameIndex = Math.min(
                Math.floor(latest * TOTAL_FRAMES),
                TOTAL_FRAMES - 1
            );
            setCurrentFrame(frameIndex);
        });

        return () => unsubscribe();
    }, [scrollYProgress, imagesLoaded]);

    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#1E1E1E]">
            {/* ... (existing loading state) */}

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                    style={{ imageRendering: 'auto' }}
                />

                {/* Gradient Overlay for Professional Look */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] opacity-90 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-[#1E1E1E]/50 pointer-events-none" />

                {/* Story Overlays */}
                {imagesLoaded && (
                    <div className="pointer-events-none absolute inset-0">
                        {STORY_POINTS.map((point, index) => (
                            <StoryOverlay
                                key={index}
                                point={point}
                                scrollProgress={scrollYProgress}
                                isHero={index === 0}
                                onRequestConsultation={() => setIsQuoteModalOpen(true)}
                                onViewSolutions={scrollToServices}
                            />
                        ))}
                    </div>
                )}
            </div>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                type="quote"
            />
        </div>
    );
}

// Story Overlay Component
function StoryOverlay({
    point,
    scrollProgress,
    isHero = false,
    onRequestConsultation,
    onViewSolutions,
}: {
    point: ScrollStoryPoint;
    scrollProgress: any;
    isHero?: boolean;
    onRequestConsultation?: () => void;
    onViewSolutions?: () => void;
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
        left: 'items-start text-left pl-8 md:pl-16 lg:pl-32',
        center: 'items-center text-center px-4',
        right: 'items-end text-right pr-8 md:pr-16 lg:pr-32',
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[point.align]} pointer-events-auto`}
        >
            <div className={`max-w-4xl ${isHero ? 'mt-0' : 'mt-20'}`}>
                <h2 className={`${isHero ? 'text-5xl md:text-7xl font-medium' : 'text-4xl md:text-5xl font-light'} tracking-tight text-white mb-6 leading-tight`}>
                    {point.headline}
                </h2>
                {point.subtext && (
                    <p className={`${isHero ? 'text-xl md:text-2xl text-white/80' : 'text-lg md:text-xl text-white/60'} font-light tracking-wide max-w-2xl mx-auto mb-10`}>
                        {point.subtext}
                    </p>
                )}
                {point.cta && isHero && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onRequestConsultation}
                            className="rounded-none bg-brand-green px-8 py-3 text-sm font-medium tracking-widest text-white transition-all duration-300 hover:bg-brand-green/90 shadow-lg shadow-brand-green/20"
                        >
                            REQUEST CONSULTATION
                        </button>
                        <button
                            onClick={onViewSolutions}
                            className="rounded-none border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                        >
                            VIEW SOLUTIONS
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
