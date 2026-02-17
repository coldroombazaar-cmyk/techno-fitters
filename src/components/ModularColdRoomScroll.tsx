'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import type { ScrollStoryPoint } from '@/types/scroll';
import LeadFormModal from './ui/LeadFormModal';
import type { LeadType } from './ui/LeadFormModal';

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
];

export default function ModularColdRoomScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null); // Sticky viewport - use for canvas size
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [modalType, setModalType] = useState<LeadType | null>(null);

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
                img.src = `${FRAME_PATH}${frameNumber}.png`;

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

    // Render frame to canvas — use VIEWPORT ref (sticky div), NOT container (400vh)
    useEffect(() => {
        const viewport = viewportRef.current;
        const canvas = canvasRef.current;
        if (!imagesLoaded || !canvas || !viewport || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            const img = images[currentFrame];
            if (!img || !img.complete) return;

            // Use viewport (sticky) dimensions = visible screen, not 400vh container
            const width = viewport.clientWidth;
            const height = viewport.clientHeight;
            if (width <= 0 || height <= 0) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, width, height);

            const targetAspect = width / height;
            const imgAspect = img.width / img.height;
            let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

            // Responsive scaling logic
            // Responsive scaling logic
            const isMobile = width < 768; // Mobile breakpoint

            // Mobile: Scale up (1.35x) from "fit width" to make the cold room bigger and more prominent,
            // accepting slight side cropping to avoid it looking too small/letterboxed.
            // Desktop: Cover for full immersion.
            const scale = isMobile
                ? (width / img.width) * 1.90
                : Math.max(width / img.width, height / img.height);

            drawWidth = img.width * scale;
            drawHeight = img.height * scale;
            offsetX = (width - drawWidth) / 2;
            offsetY = (height - drawHeight) / 2;

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        render();

        const ro = new ResizeObserver(render);
        ro.observe(viewport);
        window.addEventListener('resize', render);

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', render);
        };
    }, [currentFrame, images, imagesLoaded]);

    // Update frame based on scroll
    useEffect(() => {
        if (!imagesLoaded) return;

        const unsubscribe = scrollYProgress.on('change', (latest: number) => {
            const frameIndex = Math.min(
                Math.round(latest * (TOTAL_FRAMES - 1)),
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
        <div ref={containerRef} className="relative h-[300vh] sm:h-[500vh] bg-gradient-to-b from-[#637278] to-[#c8d1d2]">
            {/* Sticky Canvas Container — viewport-sized for correct canvas dimensions on all devices */}
            <div
                ref={viewportRef}
                className="sticky top-0 left-0 right-0 w-full h-screen h-[100dvh] overflow-hidden"
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                    style={{ imageRendering: 'auto' }}
                />

                {/* Gradient Overlay for Professional Look */}
                {/* Reduced radial opacity for better visibility on mobile */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#637278_100%)] opacity-80 pointer-events-none mix-blend-multiply" />

                {/* Top and Bottom Gradients matched to new background */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#637278]/90 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0D0B1A] via-[#0D0B1A]/80 to-transparent pointer-events-none z-10" />

                {/* Story Overlays */}
                {imagesLoaded && (
                    <div className="pointer-events-none absolute inset-0">
                        {STORY_POINTS.map((point, index) => (
                            <StoryOverlay
                                key={index}
                                point={point}
                                scrollProgress={scrollYProgress}
                                currentFrame={currentFrame}
                                isHero={index === 0}
                                onRequestConsultation={() => setModalType('consultation')}
                                onViewSolutions={scrollToServices}
                            />
                        ))}
                    </div>
                )}
            </div>

            {modalType && (
                <LeadFormModal
                    type={modalType as LeadType}
                    isOpen={true}
                    onClose={() => setModalType(null)}
                />
            )}
        </div>
    );
}

// Story Overlay Component
function StoryOverlay({
    point,
    scrollProgress,
    currentFrame,
    isHero = false,
    onRequestConsultation,
    onViewSolutions,
}: {
    point: ScrollStoryPoint;
    scrollProgress: any;
    currentFrame: number;
    isHero?: boolean;
    onRequestConsultation?: () => void;
    onViewSolutions?: () => void;
}) {
    // Each story point: fade in as we approach, stay visible at peak, fade out as we scroll past
    const fadeInStart = Math.max(0, point.progress - 0.12);
    const pointPeak = point.progress;
    const fadeOutStart = point.progress + 0.06;
    const fadeOutEnd = Math.min(1, point.progress + 0.14);

    const opacity = useTransform(
        scrollProgress,
        [fadeInStart, pointPeak, fadeOutStart, fadeOutEnd],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [fadeInStart, pointPeak],
        [16, 0]
    );

    // Track interactability based on opacity to prevent underlying overlays from blocking clicks
    const [isInteractable, setIsInteractable] = useState(false);

    useEffect(() => {
        const unsubscribe = opacity.on('change', (v: number) => {
            const visible = v > 0.5;
            if (visible !== isInteractable) {
                setIsInteractable(visible);
            }
        });
        return () => unsubscribe();
    }, [opacity, isInteractable]);

    const alignmentClasses = {
        left: 'items-start text-left pl-4 sm:pl-8 md:pl-16 lg:pl-32 pr-4',
        center: 'items-center text-center px-4 sm:px-6',
        right: 'items-end text-right pr-4 sm:pr-8 md:pr-16 lg:pr-32 pl-4',
    };

    return (
        <motion.div
            style={{
                opacity,
                y,
                pointerEvents: isInteractable ? 'auto' : 'none',
            }}
            className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[point.align]} ${isInteractable ? 'z-40' : 'z-0'} pointer-events-none p-6 sm:p-12`}
        >
            <div className={`max-w-4xl w-full ${isHero ? 'mt-0' : 'mt-8 sm:mt-12'}`}>
                <h2 className={`${isHero ? 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light'} tracking-tight text-white mb-6 sm:mb-8 leading-[1.1]`}>
                    {point.headline}
                </h2>
                {point.subtext && (
                    <p className={`${isHero ? 'text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90' : 'text-xs sm:text-base md:text-lg lg:text-xl text-white/60'} font-light tracking-wide max-w-xl md:max-w-2xl mb-8 sm:mb-12 ${point.align === 'center' ? 'mx-auto' : point.align === 'right' ? 'ml-auto mr-0' : 'mr-auto ml-0'} leading-relaxed`}>
                        {point.subtext}
                    </p>
                )}
                {point.cta && isHero && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-4 max-w-sm sm:max-w-none mx-auto">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRequestConsultation?.();
                            }}
                            className="z-50 rounded bg-brand-green hover:bg-brand-leaf px-8 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] text-white transition-all duration-300 shadow-xl shadow-brand-green/20 pointer-events-auto uppercase"
                        >
                            REQUEST CONSULTATION
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewSolutions?.();
                            }}
                            className="z-50 rounded border border-white/30 bg-white/5 hover:bg-white/10 px-8 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 pointer-events-auto uppercase"
                        >
                            VIEW SOLUTIONS
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
