'use client';

import { motion } from 'framer-motion';
import { FaShieldAlt, FaLeaf, FaStopwatch, FaCogs } from 'react-icons/fa';

const REASONS = [
    {
        icon: <FaCogs />,
        title: 'Precision Installation',
        description: 'Zero-tolerance alignment for maximum thermal integrity and structural longevity.'
    },
    {
        icon: <FaLeaf />,
        title: 'Energy Efficiency',
        description: 'Optimized insulation and door systems reduce operational power consumption by up to 30%.'
    },
    {
        icon: <FaShieldAlt />,
        title: 'Compliance & Safety',
        description: 'Built to meet international HACCP, GMP, and ISO safety standards for critical storage.'
    },
    {
        icon: <FaStopwatch />,
        title: 'Rapid Deployment',
        description: 'Modular pre-fabrication allows for faster on-site assembly without compromising quality.'
    }
];

export default function WhyChooseUsSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-background to-black border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight"
                        >
                            Why Leading Brands <br />
                            <span className="text-brand-green">Trust TechnoFitters</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 text-lg mb-8 max-w-xl"
                        >
                            We don`t just build cold rooms; we engineer reliability. Our focus on technical excellence ensures your assets are protected around the clock.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {REASONS.map((reason, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="text-brand-leaf text-2xl mt-1">{reason.icon}</div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">{reason.title}</h4>
                                        <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                            {/* Placeholder for engineered diagram or high-quality image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-ripple/10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/20 font-mono text-sm tracking-widest text-center">
                                    [ENGINEERING DIAGRAM OR IMAGE]
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
