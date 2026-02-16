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
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const lineProgress = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 0.5, 1]);
    const lineWidth = useTransform(lineProgress, (v) => `${v * 100}%`);

    return (
        <section ref={sectionRef} id="process" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-brand-green font-medium tracking-widest uppercase mb-2">Our Methodology</p>
                    <h2 className="text-3xl md:text-5xl font-light text-gray-900">Streamlined Execution</h2>
                </div>

                <div className="relative">
                    {/* Desktop: horizontal line that fills as you scroll */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200" />
                    <motion.div
                        className="hidden md:block absolute top-12 left-0 h-0.5 bg-brand-green origin-left z-[1]"
                        style={{ width: lineWidth }}
                    />

                    {/* Mobile: vertical line that grows as you scroll, connecting steps */}
                    <div className="md:hidden absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />
                    <motion.div
                        className="md:hidden absolute left-6 top-8 w-0.5 bg-brand-green origin-top z-[1]"
                        style={{ height: lineWidth }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pt-8 md:pt-16 group pl-12 md:pl-0"
                            >
                                {/* Dot */}
                                <div className="hidden md:block absolute top-[43px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand-green group-hover:bg-brand-green transition-colors z-10 shadow-sm" />

                                <div className="md:text-center">
                                    <span className="text-5xl sm:text-6xl font-bold text-gray-400 absolute -top-4 md:top-4 left-0 md:left-1/2 md:-translate-x-1/2 select-none group-hover:text-brand-green/30 transition-colors">
                                        {step.number}
                                    </span>
                                    <h3 className="text-xl font-medium text-gray-900 mb-3 relative z-10">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
