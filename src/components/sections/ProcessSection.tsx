'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
    {
        number: '01',
        title: 'Consultation',
        description: 'We analyze your requirements, load calculations, and site conditions.'
    },
    {
        number: '02',
        title: 'Design',
        description: 'Engineering optimized layouts and thermal load planning using CAD.'
    },
    {
        number: '03',
        title: 'Fabrication',
        description: 'Precision manufacturing of panels and refrigeration units.'
    },
    {
        number: '04',
        title: 'Installation',
        description: 'Expert on-site assembly, sealing, and system commissioning.'
    },
    {
        number: '05',
        title: 'Support',
        description: 'Ongoing maintenance checks and 24/7 technical support.'
    }
];

export default function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    // Desktop: line starts filling when section is in view (like 2nd image), not as soon as section enters
    const desktopProgress = useTransform(scrollYProgress, [0.42, 0.68, 1], [0, 0.5, 1]);
    const desktopLineWidth = useTransform(desktopProgress, (v) => `${v * 100}%`);
    const mobileProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
    const mobileLineHeight = useTransform(mobileProgress, (v) => `${v * 100}%`);

    return (
        <section id="process" className="pt-12 md:pt-8 pb-4 md:pb-2 bg-gradient-to-b from-gray-50 to-white">
            <div ref={containerRef} className="md:relative md:h-[105vh]">
                <div className="container mx-auto px-6 md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-center">
                    <div className="text-center mb-8 md:mb-6">
                        <p className="text-brand-green font-semibold tracking-[0.2em] uppercase text-sm mb-2">Our Methodology</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">Streamlined Execution</h2>
                        <div className="mx-auto mt-3 w-16 h-0.5 bg-brand-green/60 rounded-full" />
                    </div>

                    <div className="relative">
                        {/* Desktop: horizontal timeline */}
                        <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[3px] bg-gray-200/80 rounded-full" />
                        <motion.div className="hidden md:block absolute top-[4.5rem] left-0 h-[3px] bg-gradient-to-r from-brand-green to-brand-leaf rounded-full origin-left z-[1]" style={{ width: desktopLineWidth }} />

                        {/* Mobile: vertical line */}
                        <div className="md:hidden absolute left-6 top-8 bottom-8 w-[3px] bg-gray-200/80 rounded-full" />
                        <motion.div className="md:hidden absolute left-6 top-8 w-[3px] bg-brand-green rounded-full origin-top z-[1]" style={{ height: mobileLineHeight }} />

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
                            {STEPS.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08, duration: 0.35 }}
                                    className="relative pt-8 md:pt-[4.5rem] group pl-12 md:pl-0"
                                >
                                    {/* Desktop: dot on timeline */}
                                    <div className="hidden md:block absolute top-[4.5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-brand-green shadow-md group-hover:scale-110 group-hover:bg-brand-green group-hover:shadow-brand-green/25 transition-all duration-300 z-10" />

                                    <div className="md:text-center bg-white md:bg-transparent rounded-2xl md:rounded-none p-5 md:p-0 border border-gray-100 md:border-0 shadow-sm md:shadow-none hover:shadow-md md:hover:shadow-none hover:border-brand-green/10 md:hover:border-0 transition-all duration-300">
                                        <span className="text-4xl sm:text-5xl md:text-4xl font-bold text-gray-300 absolute -top-1 md:top-0 left-0 md:left-1/2 md:-translate-x-1/2 select-none group-hover:text-brand-green/40 transition-colors tabular-nums">
                                            {step.number}
                                        </span>
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mt-3 md:mt-4 mb-2 relative z-10">{step.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
